import { NextResponse } from "next/server";

interface Tag {
    _id: string;
    name: string;
}

interface Author {
    _id: string;
    name: string;
    image?: string;
}
interface Questions {
    _id: string;
    title: string;
    tags: Tag[]; 
    author: Author;
    cretedAt: Date;
    upvotes: number;
    answers: number;
    views: number;
    content: string;

}

type ActionResponse<T = null> = {
    success: boolean;
    data?: T;
    error?: {
        message: string,
        details: Record<string, string[]>;
    },
    status?: number;
}

type SuccessResponse<T = null> = ActionResponse<T> & {success: true};
type ErrorResponse = ActionResponse <undefined> & {success: false}
type ApiErrorResponse = NextResponse<ErrorResponse>;
type ApiResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;


interface RouteParams {
    params: Promise<Record<string, string>>,

    searchParams : Promise<Record<string, string>>;
}


interface PaginatedSearchParams {
    page?: number,
    pageSize?: number,
    query?: string,
    filter?: string,
    sort?: string
}

interface Answer {
    _id: string,
    author: Author,
    content: string,
    createdAt: Date
}