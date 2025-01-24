import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../Assests/config.js";

const api = createApi({
    reducerPath: "api", 
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Question", "User", "Lab", "Batch"], 

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
        }),

        getBatches:builder.query({
            query: () => ({
                url: `batch`,
                credentials: "include",
            }),
            invalidatesTags: ["Batch"],
        }),

        getBatch: builder.query({
            query: (batch) => ({
                url: `batch/${batch}`,
                credentials: "include",
            }),
            invalidatesTags: ["Batch"],
        }),

        getProfile: builder.query({
            query: ({userName, role}) => ({
                url: `user/other?userName=${userName}&role=${role}`, // Query-string-based
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        

        updateScore: builder.mutation({
            query: ({ labId, scores }) => ({
                url: "lab/updateScore",
                method: "PUT",
                credentials: "include",
                body: { labId, scores },
            }),
            invalidatesTags: ["Lab"],
        }),

        updateBatches: builder.mutation({
            query: ({ userId, batches }) => ({
                url: "user/updateBatch",
                method: "PUT",
                credentials: "include",
                body: { userId, batches },
            }),
            invalidatesTags: ["User"]
        })
    })
})

export default api;
export const { 
    useGetQuestionsQuery,
    useGetQuestionsFromTeacherQuery,
    useGetParticularQuestionQuery,
    useGetLabsQuery,  
    useGetBatchesQuery,
    useGetBatchQuery,
    useUpdateScoreMutation,
    useUpdateBatchesMutation,
    useGetProfileQuery,
} = api;