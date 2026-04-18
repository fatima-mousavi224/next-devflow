const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    Tags: (id: string) => `/tags/${id}`,
    ASK_QUESTION: "/ask-question",
}

export default ROUTES;