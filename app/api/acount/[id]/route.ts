import Account from "@/database/acount.model";
import handelError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AcountSchema } from "@/lib/validations";
import { ApiErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";



//Get api/users/[id]
export async function GET(_: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;

    if(!id) throw new NotFoundError("Acount");

    try {
        await dbConnect();
        const acount= await Account.findById(id);
        if(!acount) throw new NotFoundError("Acount");

        return NextResponse.json({success: true, data: acount}, {status: 200})
    } catch (error) {
        return handelError(error, "api") as ApiErrorResponse;
    }
};

// Delate api/users/[id]

export async function DELETE (_: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    if(!id) throw new NotFoundError("Acount");

    try {
        await dbConnect();
        const acount = await Account.findByIdAndDelete(id);
        if(!acount) throw new NotFoundError("Acount");

        return NextResponse.json({success: true, data: acount} , {status: 204})
    } catch (error) {
        return handelError(error, "api") as ApiErrorResponse;
    }
}

// PUT api/users/[id]

export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    if(!id) throw new NotFoundError("Acount");

    try {
       await dbConnect();
       const body = await request.json(); 
       const validatedData = AcountSchema.partial().safeParse(body);

       if(!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors)
       
       const updateAcount = await Account.findByIdAndUpdate(id, validatedData, {new : true})
       if(!updateAcount) throw new NotFoundError("Acount");
    } catch (error) {
        return handelError(error, "api") as ApiErrorResponse;
    }
}