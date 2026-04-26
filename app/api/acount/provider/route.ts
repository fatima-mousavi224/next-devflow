

import User from "@/database/user.model";
import handelError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AcountSchema} from "@/lib/validations";
import { ApiErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function POST (request: Request) {
    const {providerAcountId} = await request.json();

    try {
        await dbConnect();
      const validatedData = AcountSchema.partial().safeParse({providerAcountId});
      
      if(!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors);

      const acount = await User.findOne({providerAcountId});
      if(!acount) throw new NotFoundError("Acount");

      return NextResponse.json({success: true, data: acount}, {status: 200})
    } catch (error) {
        return handelError(error, "api") as ApiErrorResponse;
    }
}