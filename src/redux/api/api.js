import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../../Assests/config.js';

const api = createApi({
    reducerPath: 'api', 
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${server}/api/v1/`,
        credentials: 'include',
    }),
    tagTypes: ['Question', 'User', 'Lab', 'Batch', 'Submission'], 

    endpoints: (builder) => ({
        getQuestions:builder.query({
            query: () => ({
                url: `question/getQuestions`,
            }),
            providesTags: ['Question'],
        }),

        getQuestionsFromTeacher:builder.query({
            query: (id) => ({
                url: `question/getQuestions/${id}`,
            }),
            providesTags: ['Question'],
        }),

        getParticularQuestion: builder.query({
            query: (id) => ({
                url: `question/${id}`,
            }),
            providesTags: ['Question'],
        }),

        getLabs: builder.query({
            query: (batch) => ({
                url: `lab/${batch}`,
            }),
            providesTags: ['User', 'Lab'],
        }),

        getBatches: builder.query({
            query: () => ({
                url: `batch`,
            }),
            providesTags: ['User', 'Batch'],
        }),

        getBatch: builder.query({
            query: (batch) => ({
                url: `batch/${batch}`,
            }),
            providesTags: ['User', 'Batch'],
        }),

        getMyBatch: builder.query({
            query: ({ userId}) => ({
                url: `user/my/${userId}`
            }),
            providesTags: ['User', 'Batch'],
        }),

        getProfile: builder.query({
            query: ({userName, role}) => ({
                url: `user/other?userName=${userName}&role=${role}`,
            }),
            providesTags: ['User'],
        }),
        
        updateScore: builder.mutation({
            query: ({ labId, scores }) => ({
                url: 'lab/updateScore',
                method: 'PUT',
                body: { labId, scores },
            }),
            invalidatesTags: ['User', 'Lab'],
        }),

        updateBatches: builder.mutation({
            query: ({ userId, batches }) => ({
                url: 'user/updateBatch',
                method: 'PUT',
                body: { userId, batches },
            }),
            invalidatesTags: ['User', 'Batch']
        }),

        updateLab: builder.mutation({             // used in QuestionForm.js to update an existing lab
            query: (reqData) => ({
                url: 'lab/updateLab',
                method: 'PUT',
                body: reqData,
            }),
            invalidatesTags: ['Lab', 'Batch'],
        }),

        submitInQuestionForm: builder.mutation({     // used in QuestionForm.js to create or update a question
            query: ({ urlParam, newData }) => ({
                url: `question/${urlParam}`,
                method: 'POST',
                body: newData,
            }),
            invalidatesTags: ['Lab', 'Question'],
        }),

        createLab: builder.mutation({              // used in CreateLab.js
            query: (data) => ({
                url: 'lab/createLab',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User', 'Lab'],
        }),

        startLab: builder.mutation({               // used in DropDownSubmission.jsx
            query: (labId) => ({
                url: `lab/startLab/${labId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Lab'],
        }),

        extendLab: builder.mutation({              // used in DropDownSubmission.jsx
            query: ({ labId, current_time }) => ({
                url: `lab/extendLab/${labId}`,
                method: 'POST',
                body: { extendTime: current_time },
            }),
            invalidatesTags: ['Lab'],
        }),

        getSubmission: builder.query({              // used in Question.jsx
            query: ({ questionId, userId }) => {
                const questionName = `${questionId}${userId}`;
                return {
                    url: `submission/getThisSubmission/${questionName}`,
                    method: 'GET',
                };
            },
            providesTags: ['Question', 'User', 'Submission'],
        }),

        runQuestion: builder.mutation({
            query: ({ questionId, request }) => ({
                url: `question/runCode/${questionId}`,
                method: 'POST',
                body: request,
            }),
            invalidatesTags: ['User', 'Question']
        }),

        submitQuestion: builder.mutation({
            query: ({ destination, questionId, request }) => ({
                url: `${destination}/submitCode/${questionId}`,
                method: 'POST',
                body: request,
            }),
            invalidatesTags: ['User', 'Question', 'Submission'],
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
    useGetMyBatchQuery,
    useUpdateScoreMutation,
    useUpdateBatchesMutation,
    useGetProfileQuery,
    useUpdateLabMutation,
    useSubmitInQuestionFormMutation,
    useCreateLabMutation,
    useStartLabMutation,
    useExtendLabMutation,
    useGetSubmissionQuery,
    useRunQuestionMutation,
    useSubmitQuestionMutation
} = api;