import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { title } from "process";
  const questions = [
    {
      _id: "1",
      title: "How to laern react?",
      description: "I am new to react and I want to learn it. Can you help me?",
      tags: [
        { _id: "1", name: "reactjs" },
        { _id: "2", name: "javascript" },
      ],
      author: { _id: "1", name: "Sajjad" },
      upvotes: 10,
      answers: 5,
      view: 100,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "How to laern next?",
      description: "I am new to next and I want to learn it. Can you help me?",
      tags: [
        { _id: "3", name: "nextjs" },
        { _id: "4", name: "javascript" },
      ],
      author: { _id: "1", name: "Sajjad" },
      upvotes: 10,
      answers: 5,
      view: 100,
      createdAt: new Date(),

    },
    {
      _id: "3",
      title: "How to laern node?",
      description: "I am new to node and I want to learn it. Can you help me?",
      tags: [
        { _id: "5", name: "nodejs" },
        { _id: "6", name: "javascript" },
      ],
      author: { _id: "1", name: "Sajjad" },
      upvotes: 10,
      answers: 5,
      view: 100,
      createdAt: new Date(),
    },
  ];

interface SearchPrams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({searchParams} : SearchPrams) {
  const { query = "" } = await searchParams;

  const normalizedQuery = typeof query === "string"
    ? query
    : Array.isArray(query)
    ? query.join(" ")
    : "";

  const fillteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(normalizedQuery.toLowerCase())
  );
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>
        <Button
          className="primary-gradient min-h-11.5 px-4 py-3 text-light-900!"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
          route="/"
        />
      </section>
      Home Filter
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {fillteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
}
