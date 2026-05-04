"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { AnswerSchema } from "@/lib/validations";
import z, { ZodType } from "zod";
import ROUTES from "@/constants/routes";
import { ActionResponse } from "@/types/global";
import { useRef, useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import Edietor from "../edietor";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Loader } from "lucide-react";
import Image from "next/image";

const Editor = dynamic(() => import("@/components/edietor"), { ssr: false });

const AnswerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAISubmitting, setIsAISubmitting] = useState(false);
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 ">
        <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>
        <Button className="btn light-border-2 gap-1.5 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500" disabled={isAISubmitting}>
          {isAISubmitting ? (
            <>
              <Loader className="mr-2 size-4 animate-spin" /> Generating...
            </>
          ) : (
           <>
           <Image src="/icons/stars.svg" alt="Genrate Ai answer" width={12} height={12} className="object-contain"/>
           Generate AI Answer
           </>
          )}
        </Button>
      </div>
      <form
        id="auth-form"
        className="mt-6 flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormControl className="mt-3.5 ">
                <Edietor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="primary-gradient w-fit">
            {isSubmitting ? (
              <>
                <Loader className="mr-2 size-4 animate-spin" /> Posting...
              </>
            ) : (
              "Post Answer"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AnswerForm;
