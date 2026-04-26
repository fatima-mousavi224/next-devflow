import Account from "@/database/acount.model";
import User from "@/database/user.model";
import handelError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { SignInWithSchema } from "@/lib/validations";
import { ApiErrorResponse } from "@/types/global";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";
export async function POST(request: Request) {
  const { provider, providerAcountId, user } = await request.json();

  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = SignInWithSchema.safeParse({
      provider,
      providerAcountId,
      user,
    });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const { name, username, image, email } = user;

    const slugfiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let exstingUser = await User.findOne({ email }).session(session);

    if (!exstingUser) {
      [exstingUser] = await User.create(
        [{ name, username: slugfiedUsername, email, image }],
        { session },
      );
    } else {
      const updatedData: { name?: string; image?: string } = {};

      if (exstingUser.name !== name) updatedData.name = name;
      if (exstingUser.image !== image) updatedData.image = image;

      if (Object.keys(updatedData).length > 0) {
        await User.updateOne(
          { _id: exstingUser._id },
          { $set: updatedData },
        ).session(session);
      }
    }

    const existingAccount = await Account.findOne({
      userId: exstingUser._id,
      provider,
      providerAcountId,
    }).session(session);

    if(!existingAccount) {
        await Account.create([
            {userId: exstingUser._id, name, image, provider, providerAcountId}
        ], session)
    }

    await session.commitTransaction();
    return NextResponse.json({success : true} )
  } catch (error: unknown) {
    await session.abortTransaction();
    return handelError(error, "api") as ApiErrorResponse;
  } finally {
    session.endSession();
  }
}
