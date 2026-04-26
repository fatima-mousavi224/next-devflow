const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    QUESTION: (id: string) => `/questions/${id}`,
    Tags: (id: string) => `/tags/${id}`,
    ASK_QUESTION: "/ask-question",
    SIGN_IN_WITH_AUTH : `sign-in-withNextAuth`
}

export default ROUTES;