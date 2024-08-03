import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../Assests/config.js";

const api = createApi({
    reducerPath: "api", 
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Question", "User", "Lab"], 

    endpoints: (builder) => ({
        getQuestions:builder.query({
            query: () => ({
                url: `question/getQuestions`,
                credentials: "include",
            }),
            invalidatesTags: ["Question"],
        }),

        getQuestionsFromTeacher:builder.query({
            query: (id) => ({
                url: `question/getQuestions/${id}`,
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

        getLabs: builder.query({
            query: (batch) => ({
                url: `lab/${batch}`,
                credentials: "include",
            }),
            invalidatesTags: ["Lab"],
        })
    })
})

export default api;
export const { 
    useGetQuestionsQuery,
    useGetQuestionsFromTeacherQuery,
    useGetParticularQuestionQuery,
    useGetLabsQuery,  
} = api;