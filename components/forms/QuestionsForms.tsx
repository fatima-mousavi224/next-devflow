"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormDescription } from "../ui/form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuestionsForms = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      Content: "",
      tags: [],
    },
  });

  const handelCreateQuestion = () => {};
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handelCreateQuestion)}
      >
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col"
            >
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FieldLabel>

              {/* استایل اینپوت مطابق کد دوم */}
              <Input
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                {...field}
              />

              {/* نمایش خطا */}
              {fieldState.error && (
                <FieldError className="text-red-500 text-sm">
                  {fieldState.error.message}
                </FieldError>
              )}
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
            </Field>
          )}
        />
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col"
            >
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                Detailes explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FieldLabel>

              {/* استایل اینپوت مطابق کد دوم */}
              <FormControl>Editor</FormControl>
              {fieldState.error && (
                <FieldError className="text-red-500 text-sm">
                  {fieldState.error.message}
                </FieldError>
              )}
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
            </Field>
          )}
        />

        <Controller
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col gap-3"
            >
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FieldLabel>

              <div className="">
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  {...field}
                  placeholder="Add tags ..."
                />
                tags
              </div>

              {/* نمایش خطا */}
              {fieldState.error && (
                <FieldError className="text-red-500 text-sm">
                  {fieldState.error.message}
                </FieldError>
              )}
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Add up to 3 tags to describe what your question is about. You nedd to press enter after each tag.
              </FormDescription>
            </Field>
          )}
        />

        <div className="mt-16 flex justify-end">
         <Button type="submit" className="primary-gradient text-light-900! w-fit">Ask a Question</Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionsForms;
