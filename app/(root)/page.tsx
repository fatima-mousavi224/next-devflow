/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionCard from "@/components/cards/QuestionCard";
import DataRender from "@/components/DataRender";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTIONS } from "@/constants/states";
import { getQuestions } from "@/lib/actions/question.action";
import { Divide } from "lucide-react";
import Link from "next/link";

interface SearchParams {
  searchParams?: {
    page?: string;
    pageSize?: string;
    query?: string;
    filter?: string;
  };
}

export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;
  const { page, pageSize, query, filter } = params || {};

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const questions = data?.questions || [];
  return (
    <>
      {/* Header */}
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-11.5 px-4 py-3 text-light-900!"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>

      {/* Search */}
      <section className="mt-11">
        <LocalSearch
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
          route="/"
          iconPosition="left"
        />
      </section>

      {/* Filter */}
      <HomeFilter />
      <DataRender
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTIONS}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
    </>
  );
}
