import Account from "@/database/acount.model";
import handelError from "@/lib/handlers/error";
import { ForbiddenError} from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AcountSchema} from "@/lib/validations";
import { ApiErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";


export async function Get() {
    try {
      await dbConnect();
      const acounts = await Account.find() ;
      return NextResponse.json({success: true, data: acounts}, {status: 200}) 
    } catch (error) {
        return handelError(error, "api") as ApiErrorResponse
    }
}

// Create Acount
export async function POST (request: Request) {
try {
    await dbConnect();
    const body = await request.json();
    const validatedData = AcountSchema.parse(body);

    const existingAcount = await Account.findOne({
        provider : validatedData.provider,
        providerAcountId: validatedData.providerAcountId
    });
    if(existingAcount) throw new ForbiddenError("An acount with same provider already exists");


    const newAcount = await Account.create(validatedData);

    return NextResponse.json({success: true, data: newAcount}, {status: 201})
} catch (error) {
    return handelError(error, "api") as ApiErrorResponse;
}
}