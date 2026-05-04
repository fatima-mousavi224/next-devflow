"use client"

import { incrementViews } from "@/lib/actions/question.action";
import { useEffect } from "react";
import { toast } from "sonner";

const View = ({questionId}: {questionId: string}) => {
    const handelIncrement  = async () => {
        const result = await incrementViews({questionId}) ;

        if(result.success) {
            toast.success("Views incremented")
        } else {
            toast.error("faild to increment views")
        }
    };
    useEffect(() => {
        handelIncrement()
    }, [])
  return (
   null
  )
}

export default View
