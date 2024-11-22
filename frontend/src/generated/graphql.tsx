import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type CreateGameBoardInput = {
  boardName: Scalars['String']['input'];
  createdAt: Scalars['DateTime']['input'];
  grid: Scalars['JSON']['input'];
  updatedAt: Scalars['DateTime']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateQuestionInput = {
  answer: Scalars['String']['input'];
  createdAt: Scalars['DateTime']['input'];
  questionText: Scalars['String']['input'];
  updatedAt: Scalars['DateTime']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateUserInput = {
  createdAt: Scalars['DateTime']['input'];
  updatedAt: Scalars['DateTime']['input'];
  username: Scalars['String']['input'];
};

export type GameBoard = {
  __typename?: 'GameBoard';
  boardName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  grid: Scalars['JSON']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  createGameBoard: GameBoard;
  createQuestion: Question;
  createUser: User;
};


export type MutationRootCreateGameBoardArgs = {
  input: CreateGameBoardInput;
};


export type MutationRootCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationRootCreateUserArgs = {
  input: CreateUserInput;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  allGameBoards: Array<GameBoard>;
  allQuestions: Array<Question>;
  allUsers: Array<User>;
  getGameBoard: GameBoard;
  getGameBoardFromUser: Array<GameBoard>;
  getQuestion: Question;
  getQuestionFromUser: Array<Question>;
  getQuestionsFromIds: Array<Question>;
  getUser: User;
};


export type QueryRootGetGameBoardArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootGetGameBoardFromUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryRootGetQuestionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootGetQuestionFromUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryRootGetQuestionsFromIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type QueryRootGetUserArgs = {
  id: Scalars['Int']['input'];
};

export type Question = {
  __typename?: 'Question';
  answer: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  questionText: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type CreateGameBoardMutationVariables = Exact<{
  input: CreateGameBoardInput;
}>;


export type CreateGameBoardMutation = { __typename?: 'MutationRoot', createGameBoard: { __typename?: 'GameBoard', id: number, createdAt: any, updatedAt: any, userId: number, boardName: string, grid: any } };

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'MutationRoot', createQuestion: { __typename?: 'Question', id: number, createdAt: any, updatedAt: any, userId: number, questionText: string, answer: string } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'MutationRoot', createUser: { __typename?: 'User', id: number, username: string, createdAt: any, updatedAt: any } };

export type GetAllGameBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGameBoardsQuery = { __typename?: 'QueryRoot', allGameBoards: Array<{ __typename?: 'GameBoard', id: number, createdAt: any, updatedAt: any, userId: number, boardName: string, grid: any }> };

export type GetGameBoardFromUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetGameBoardFromUserQuery = { __typename?: 'QueryRoot', getGameBoardFromUser: Array<{ __typename?: 'GameBoard', id: number, createdAt: any, updatedAt: any, userId: number, boardName: string, grid: any }> };

export type GetGameBoardQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetGameBoardQuery = { __typename?: 'QueryRoot', getGameBoard: { __typename?: 'GameBoard', id: number, createdAt: any, updatedAt: any, userId: number, boardName: string, grid: any } };

export type GetAllQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllQuestionsQuery = { __typename?: 'QueryRoot', allQuestions: Array<{ __typename?: 'Question', id: number, createdAt: any, updatedAt: any, userId: number, questionText: string, answer: string }> };

export type GetQuestionsFromIdsQueryVariables = Exact<{
  ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type GetQuestionsFromIdsQuery = { __typename?: 'QueryRoot', getQuestionsFromIds: Array<{ __typename?: 'Question', id: number, createdAt: any, updatedAt: any, userId: number, questionText: string, answer: string }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'QueryRoot', allUsers: Array<{ __typename?: 'User', id: number, username: string, createdAt: any, updatedAt: any }> };


export const CreateGameBoardDocument = gql`
    mutation CreateGameBoard($input: CreateGameBoardInput!) {
  createGameBoard(input: $input) {
    id
    createdAt
    updatedAt
    userId
    boardName
    grid
  }
}
    `;
export type CreateGameBoardMutationFn = Apollo.MutationFunction<CreateGameBoardMutation, CreateGameBoardMutationVariables>;

/**
 * __useCreateGameBoardMutation__
 *
 * To run a mutation, you first call `useCreateGameBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameBoardMutation, { data, loading, error }] = useCreateGameBoardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGameBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameBoardMutation, CreateGameBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameBoardMutation, CreateGameBoardMutationVariables>(CreateGameBoardDocument, options);
      }
export type CreateGameBoardMutationHookResult = ReturnType<typeof useCreateGameBoardMutation>;
export type CreateGameBoardMutationResult = Apollo.MutationResult<CreateGameBoardMutation>;
export type CreateGameBoardMutationOptions = Apollo.BaseMutationOptions<CreateGameBoardMutation, CreateGameBoardMutationVariables>;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    createdAt
    updatedAt
    userId
    questionText
    answer
  }
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    createdAt
    updatedAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetAllGameBoardsDocument = gql`
    query getAllGameBoards {
  allGameBoards {
    id
    createdAt
    updatedAt
    userId
    boardName
    grid
  }
}
    `;

/**
 * __useGetAllGameBoardsQuery__
 *
 * To run a query within a React component, call `useGetAllGameBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllGameBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllGameBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllGameBoardsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllGameBoardsQuery, GetAllGameBoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllGameBoardsQuery, GetAllGameBoardsQueryVariables>(GetAllGameBoardsDocument, options);
      }
export function useGetAllGameBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllGameBoardsQuery, GetAllGameBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllGameBoardsQuery, GetAllGameBoardsQueryVariables>(GetAllGameBoardsDocument, options);
        }
export function useGetAllGameBoardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllGameBoardsQuery, GetAllGameBoardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllGameBoardsQuery, GetAllGameBoardsQueryVariables>(GetAllGameBoardsDocument, options);
        }
export type GetAllGameBoardsQueryHookResult = ReturnType<typeof useGetAllGameBoardsQuery>;
export type GetAllGameBoardsLazyQueryHookResult = ReturnType<typeof useGetAllGameBoardsLazyQuery>;
export type GetAllGameBoardsSuspenseQueryHookResult = ReturnType<typeof useGetAllGameBoardsSuspenseQuery>;
export type GetAllGameBoardsQueryResult = Apollo.QueryResult<GetAllGameBoardsQuery, GetAllGameBoardsQueryVariables>;
export const GetGameBoardFromUserDocument = gql`
    query GetGameBoardFromUser($userId: Int!) {
  getGameBoardFromUser(userId: $userId) {
    id
    createdAt
    updatedAt
    userId
    boardName
    grid
  }
}
    `;

/**
 * __useGetGameBoardFromUserQuery__
 *
 * To run a query within a React component, call `useGetGameBoardFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameBoardFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameBoardFromUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetGameBoardFromUserQuery(baseOptions: Apollo.QueryHookOptions<GetGameBoardFromUserQuery, GetGameBoardFromUserQueryVariables> & ({ variables: GetGameBoardFromUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameBoardFromUserQuery, GetGameBoardFromUserQueryVariables>(GetGameBoardFromUserDocument, options);
      }
export function useGetGameBoardFromUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameBoardFromUserQuery, GetGameBoardFromUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameBoardFromUserQuery, GetGameBoardFromUserQueryVariables>(GetGameBoardFromUserDocument, options);
        }
export function useGetGameBoardFromUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGameBoardFromUserQuery, GetGameBoardFromUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGameBoardFromUserQuery, GetGameBoardFromUserQueryVariables>(GetGameBoardFromUserDocument, options);
        }
export type GetGameBoardFromUserQueryHookResult = ReturnType<typeof useGetGameBoardFromUserQuery>;
export type GetGameBoardFromUserLazyQueryHookResult = ReturnType<typeof useGetGameBoardFromUserLazyQuery>;
export type GetGameBoardFromUserSuspenseQueryHookResult = ReturnType<typeof useGetGameBoardFromUserSuspenseQuery>;
export type GetGameBoardFromUserQueryResult = Apollo.QueryResult<GetGameBoardFromUserQuery, GetGameBoardFromUserQueryVariables>;
export const GetGameBoardDocument = gql`
    query GetGameBoard($id: Int!) {
  getGameBoard(id: $id) {
    id
    createdAt
    updatedAt
    userId
    boardName
    grid
  }
}
    `;

/**
 * __useGetGameBoardQuery__
 *
 * To run a query within a React component, call `useGetGameBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameBoardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetGameBoardQuery(baseOptions: Apollo.QueryHookOptions<GetGameBoardQuery, GetGameBoardQueryVariables> & ({ variables: GetGameBoardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameBoardQuery, GetGameBoardQueryVariables>(GetGameBoardDocument, options);
      }
export function useGetGameBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameBoardQuery, GetGameBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameBoardQuery, GetGameBoardQueryVariables>(GetGameBoardDocument, options);
        }
export function useGetGameBoardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGameBoardQuery, GetGameBoardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGameBoardQuery, GetGameBoardQueryVariables>(GetGameBoardDocument, options);
        }
export type GetGameBoardQueryHookResult = ReturnType<typeof useGetGameBoardQuery>;
export type GetGameBoardLazyQueryHookResult = ReturnType<typeof useGetGameBoardLazyQuery>;
export type GetGameBoardSuspenseQueryHookResult = ReturnType<typeof useGetGameBoardSuspenseQuery>;
export type GetGameBoardQueryResult = Apollo.QueryResult<GetGameBoardQuery, GetGameBoardQueryVariables>;
export const GetAllQuestionsDocument = gql`
    query getAllQuestions {
  allQuestions {
    id
    createdAt
    updatedAt
    userId
    questionText
    answer
  }
}
    `;

/**
 * __useGetAllQuestionsQuery__
 *
 * To run a query within a React component, call `useGetAllQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllQuestionsQuery, GetAllQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllQuestionsQuery, GetAllQuestionsQueryVariables>(GetAllQuestionsDocument, options);
      }
export function useGetAllQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllQuestionsQuery, GetAllQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllQuestionsQuery, GetAllQuestionsQueryVariables>(GetAllQuestionsDocument, options);
        }
export function useGetAllQuestionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllQuestionsQuery, GetAllQuestionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllQuestionsQuery, GetAllQuestionsQueryVariables>(GetAllQuestionsDocument, options);
        }
export type GetAllQuestionsQueryHookResult = ReturnType<typeof useGetAllQuestionsQuery>;
export type GetAllQuestionsLazyQueryHookResult = ReturnType<typeof useGetAllQuestionsLazyQuery>;
export type GetAllQuestionsSuspenseQueryHookResult = ReturnType<typeof useGetAllQuestionsSuspenseQuery>;
export type GetAllQuestionsQueryResult = Apollo.QueryResult<GetAllQuestionsQuery, GetAllQuestionsQueryVariables>;
export const GetQuestionsFromIdsDocument = gql`
    query getQuestionsFromIds($ids: [Int!]!) {
  getQuestionsFromIds(ids: $ids) {
    id
    createdAt
    updatedAt
    userId
    questionText
    answer
  }
}
    `;

/**
 * __useGetQuestionsFromIdsQuery__
 *
 * To run a query within a React component, call `useGetQuestionsFromIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsFromIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsFromIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetQuestionsFromIdsQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionsFromIdsQuery, GetQuestionsFromIdsQueryVariables> & ({ variables: GetQuestionsFromIdsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionsFromIdsQuery, GetQuestionsFromIdsQueryVariables>(GetQuestionsFromIdsDocument, options);
      }
export function useGetQuestionsFromIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionsFromIdsQuery, GetQuestionsFromIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionsFromIdsQuery, GetQuestionsFromIdsQueryVariables>(GetQuestionsFromIdsDocument, options);
        }
export function useGetQuestionsFromIdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuestionsFromIdsQuery, GetQuestionsFromIdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuestionsFromIdsQuery, GetQuestionsFromIdsQueryVariables>(GetQuestionsFromIdsDocument, options);
        }
export type GetQuestionsFromIdsQueryHookResult = ReturnType<typeof useGetQuestionsFromIdsQuery>;
export type GetQuestionsFromIdsLazyQueryHookResult = ReturnType<typeof useGetQuestionsFromIdsLazyQuery>;
export type GetQuestionsFromIdsSuspenseQueryHookResult = ReturnType<typeof useGetQuestionsFromIdsSuspenseQuery>;
export type GetQuestionsFromIdsQueryResult = Apollo.QueryResult<GetQuestionsFromIdsQuery, GetQuestionsFromIdsQueryVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  allUsers {
    id
    username
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;