const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    QUESTION: (id: string) => `/questions/${id}`,
    TAG: (id: string) => `/tags/${id}`,
    ASK_QUESTION: "/ask-question",
    SIGN_IN_WITH_AUTH : `sign-in-withNextAuth`,
    COLLECTION: "/colletion",
    COMMUNITY: "/community",
    TAGS: "/tags",
    FIND_JOPS: "/find-jops"
}

export default ROUTES;