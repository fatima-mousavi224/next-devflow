"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormDescription } from "../ui/form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef, useTransition } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";
import TagCard from "../cards/TagCard";
import { createQuestion } from "@/lib/actions/question.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { RefreshCw } from "lucide-react";

// ⚠️ keep same file name if you didn't rename it
const Editor = dynamic(() => import("@/components/edietor"), {
  ssr: false,
});

const QuestionsForms = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  // ✅ TAG INPUT
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] },
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (
        tagInput &&
        tagInput.length <= 15 &&
        !field.value.includes(tagInput)
      ) {
        if (field.value.length >= 3) {
          form.setError("tags", {
            type: "manual",
            message: "You can add up to 3 tags only",
          });
          return;
        }

        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  // ✅ REMOVE TAG
  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  // ✅ SUBMIT
  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>,
  ) => {
    startTransition(async () => {
      const result = await createQuestion(data);

      if (result.status) {
        toast.success("questions create successfuly");

        if (result.data) {
          router.push(ROUTES.QUESTION(result.data?._id));
        } else {
          toast.error("Something went wrong");
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        {/* 🔹 TITLE */}
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

              <Input
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                {...field}
              />

              {fieldState.error && (
                <FieldError className="text-red-500 text-sm">
                  {fieldState.error.message}
                </FieldError>
              )}

              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you're asking a question to another
                person.
              </FormDescription>
            </Field>
          )}
        />

        {/* 🔹 CONTENT */}
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex w-full flex-col"
            >
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation <span className="text-primary-500">*</span>
              </FieldLabel>

              <FormControl>
                <div className="min-h-[200px]">
                  <Editor
                    editorRef={editorRef}
                    value={field.value}
                    fieldChange={field.onChange}
                  />
                </div>
              </FormControl>

              {fieldState.error && (
                <FieldError className="text-red-500 text-sm">
                  {fieldState.error.message}
                </FieldError>
              )}

              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
            </Field>
          )}
        />

        {/* 🔹 TAGS */}
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

              <div>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  placeholder="Add tags ..."
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                />

                {field.value.length > 0 && (
                  <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                    {field.value.map((tag: string) => (
                      <TagCard
                        key={tag}
                        _id={tag}
                        name={tag}
                        compact
                        remove
                        isButton
                        handleRemove={() => handleTagRemove(tag, field)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {fieldState.error && (
                <FieldError className="text-red-500 text-sm">
                  {fieldState.error.message}
                </FieldError>
              )}

              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe your question. Press Enter after
                each tag.
              </FormDescription>
            </Field>
          )}
        />

        {/* 🔹 SUBMIT */}
        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="primary-gradient text-light-900 w-fit"
          >
            {isPending ? (
              <>
                <RefreshCw className="mr-2 size-2 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <> Ask a Question</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionsForms;
