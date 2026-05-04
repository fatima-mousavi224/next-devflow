import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
  title: "No Data Found ",
  message:
    "Looks like the database is taking the nap. Wake it up with some new entries.",
  button: {
    text: "Add Data",
    href: ROUTES.HOME,
  },
};

export const DEFAULT_ERROR = {
  title: "Opes!. Something went wrong",
  message: "Even our code can have a bad day. Give it another shot.",
  button: {
    text: "Try again",
    href: ROUTES.HOME,
  },
};

export const EMPTY_QUESTIONS = {
  title: "Ahh, No questions Yet!",
  message:
    "The question board is empty. Maybe it's wating for you to ask something.",
};

export const EMPTY_TAGS = {
  title: "No Tags Found",
  message: "The tag could is empty. Add some keywords to make it rain.",

  button: {
    text: "Create Tag",
    href: ROUTES.TAGS,
  },
};
export const EMPTY_ANSWERS = {
  title: "No answers Found",
  message: "The answer board is empty. Make it rain with your brilliant answers",
};

export const EMPTY_COLLECTION = {
    titel: "Collection are empty",
    message: "Look like you have'nt create any collection yet. Start curating something extraordinary today",
    button: {
        text: "Save to Collection",
        href: ROUTES.COLLECTION
    }
}