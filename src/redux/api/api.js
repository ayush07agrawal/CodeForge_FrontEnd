import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../Assests/config.js";

const api = createApi({
    reducerPath: "api", 
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Question", "User"], 

    endpoints: (builder) => ({
        getQuestions:builder.query({
            query: () => ({
                url: `question/getQuestions`,
                credentials: "include",
            }),
            invalidatesTags: ["Question"],
        }),

        getParticularQuestion: builder.query({
            query: (id) => ({
                url: `question/${id}`,
                credentials: "include",
            }),
            invalidatesTags: ["Question"],
        }),
    })
})

export default api;
export const { 
    useGetQuestionsQuery,
    useGetParticularQuestionQuery
} = api;
