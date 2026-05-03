import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
} from "@/types/global";
import action from "../handlers/action";
import { PaginatedSearchParamsSchema } from "../validations";
import handelError from "../handlers/error";
import { Error, FilterQuery } from "mongoose";
import { Tag } from "@/database";

export const getTags = async (
  params: PaginatedSearchParams,
): Promise<ActionResponse<{ tags: Tag[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handelError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }];
  }

  let sortCriteria = {};

  switch (filter) {
    case "popular":
      sortCriteria = { question: -1 };
      break;
    case "resent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;

    default:
      sortCriteria = { question: -1 };
      break;
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);

    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);
    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: { tags: JSON.parse(JSON.stringify(tags)), isNext },
    };
  } catch (error) {
    return handelError(error) as ErrorResponse;
  }
};
