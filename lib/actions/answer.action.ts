// "use server";

// import { IAccountDoc } from "@/database/acount.model";
// import { CreateAnswerParams } from "@/types/action";
// import { ActionResponse, ErrorResponse } from "@/types/global";
// import action from "../handlers/action";
// import { AnswerServerSchema } from "../validations";
// import handelError from "../handlers/error";
// import mongoose from "mongoose";
// import { Answer, Question } from "@/database";
// import { revalidatePath } from "next/cache";
// import ROUTES from "@/constants/routes";

// export async function createAnswer(
//   params: CreateAnswerParams,
// ): Promise<ActionResponse<IAccountDoc>> {
//   const validationResult = await action({
//     params,
//     schema: AnswerServerSchema,
//     authorize: true,
//   });

//   if (validationResult instanceof Error) {
//     return handelError(validationResult) as ErrorResponse;
//   }

//   const { content, questionId } = validationResult.params!;
//   const userId = validationResult?.session?.user?.id;

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const question = Question.findById(questionId);
//     if (!question) {
//       throw new Error("Question Not found");
//     }

//     const [newAnswer] = await Answer.create(
//       [{ author: userId, question: questionId, content }],
//       { session },
//     );

//     if(!newAnswer) throw new Error("Faild to create answer");
//         question.answer += 1;
//     await question.save({session});
//     await session.commitTransaction();

//     revalidatePath(ROUTES.QUESTION(questionId));
//     return {success: true, data: JSON.parse(JSON.stringify(newAnswer))};
//   } catch (error) {
//     await session.abortTransaction();
//     return handelError(error) as ErrorResponse;
//   } finally {
//     await session.endSession();
//   }
// }

"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { after } from "next/server";

import ROUTES from "@/constants/routes";
import { Question, Vote } from "@/database";
import Answer, { IAnswerDoc } from "@/database/answer.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { AnswerServerSchema, GetAnswersSchema } from "../validations";
import { ActionResponse, Answer, ErrorResponse } from "@/types/global";
import { CreateAnswerParams, GetAnswerParams } from "@/types/action";
import { filter } from "@mdxeditor/editor";
import handelError from "../handlers/error";

export async function createAnswer(
  params: CreateAnswerParams,
): Promise<ActionResponse<IAnswerDoc>> {
  const validationResult = await action({
    params,
    schema: AnswerServerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { content, questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // check if the question exists
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const [newAnswer] = await Answer.create(
      [
        {
          author: userId,
          question: questionId,
          content,
        },
      ],
      { session },
    );

    if (!newAnswer) throw new Error("Failed to create the answer");

    // update the question answers count
    question.answers += 1;
    await question.save({ session });

    // log the interaction
    after(async () => {
      await createInteraction({
        action: "post",
        actionId: newAnswer._id.toString(),
        actionTarget: "answer",
        authorId: userId as string,
      });
    });

    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTION(questionId));

    return { success: true, data: JSON.parse(JSON.stringify(newAnswer)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function getAnswers(params: GetAnswerParams): Promise<
  ActionResponse<{
    answer: Answer[];
    isNext: boolean;
    totalAnswer: number;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetAnswersSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId, page = 1, pageSize = 10, filter } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  let sortCriteria = {};

  switch (filter) {
    case "latest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;

    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalAnswer = await Answer.countDocuments({ question: questionId });

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id name image")
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

      const isNext = totalAnswer > skip + answers.length;

      return {
        success: true,
        data: {
          answer: JSON.parse(JSON.stringify(answers)),
          isNext,
          totalAnswer
        }
      }
  } catch (error) {
    return handelError(error) as ErrorResponse;
  }
}
