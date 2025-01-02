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
};

export type BoardQuestion = {
  __typename?: 'BoardQuestion';
  boardId: Scalars['Int']['output'];
  category: Scalars['String']['output'];
  dailyDouble: Scalars['Boolean']['output'];
  gridCol: Scalars['Int']['output'];
  gridRow: Scalars['Int']['output'];
  points: Scalars['Int']['output'];
  questionId: Scalars['Int']['output'];
};

export type CreateBoardQuestionInput = {
  boardId: Scalars['Int']['input'];
  category: Scalars['String']['input'];
  dailyDouble: Scalars['Boolean']['input'];
  gridCol: Scalars['Int']['input'];
  gridRow: Scalars['Int']['input'];
  points: Scalars['Int']['input'];
  questionId: Scalars['Int']['input'];
};

export type CreateGameBoardInput = {
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateGameInput = {
  gameBoardId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type CreatePlayerInput = {
  gameId: Scalars['Int']['input'];
  playerName: Scalars['String']['input'];
};

export type CreateQuestionInput = {
  answer: Scalars['String']['input'];
  question: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateUserInput = {
  username: Scalars['String']['input'];
};

export type DetailedBoardQuestion = {
  __typename?: 'DetailedBoardQuestion';
  boardQuestion: BoardQuestion;
  question: Question;
};

/** Diesel Game model with async-graphql support */
export type Game = {
  __typename?: 'Game';
  createdAt: Scalars['DateTime']['output'];
  gameBoardId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

/** Diesel Game Board model with async-graphql support */
export type GameBoard = {
  __typename?: 'GameBoard';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type GameBoardData = {
  __typename?: 'GameBoardData';
  categories: Array<Scalars['String']['output']>;
  questions: Array<DetailedBoardQuestion>;
};

export type Player = {
  __typename?: 'Player';
  createdAt: Scalars['DateTime']['output'];
  gameId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  playerName: Scalars['String']['output'];
  score: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Disel Question Model with async-graphql suppport */
export type Question = {
  __typename?: 'Question';
  answer: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  question: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  /** Associate a question with a gameboard */
  createBoardQuestion: BoardQuestion;
  createGame: Game;
  /** Create a new gameboard with example question */
  createGameBoard: GameBoard;
  /** Create a new player */
  createPlayer: Player;
  /** Create a new quesiton */
  createQuestion: Question;
  createUser: User;
  deletePlayer: Player;
  /** Delete a question by ID */
  deleteQuestion: Scalars['Boolean']['output'];
  /** Update category for a specific column in a game board */
  updateBoardColumnCategory: Scalars['Boolean']['output'];
  updateBoardQuestion: BoardQuestion;
  updatePlayerName: Player;
  updatePlayerScore: Player;
  /** Update a question */
  updateQuestion: Question;
  /** Update gameboard title */
  updateTitle: GameBoard;
};


export type RootMutationCreateBoardQuestionArgs = {
  input: CreateBoardQuestionInput;
};


export type RootMutationCreateGameArgs = {
  input: CreateGameInput;
};


export type RootMutationCreateGameBoardArgs = {
  input: CreateGameBoardInput;
};


export type RootMutationCreatePlayerArgs = {
  input: CreatePlayerInput;
};


export type RootMutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type RootMutationCreateUserArgs = {
  input: CreateUserInput;
};


export type RootMutationDeletePlayerArgs = {
  playerId: Scalars['Int']['input'];
};


export type RootMutationDeleteQuestionArgs = {
  questionId: Scalars['Int']['input'];
};


export type RootMutationUpdateBoardColumnCategoryArgs = {
  gameBoardId: Scalars['Int']['input'];
  gridCol: Scalars['Int']['input'];
  newCategory: Scalars['String']['input'];
};


export type RootMutationUpdateBoardQuestionArgs = {
  input: UpdateBoardQuestionInput;
};


export type RootMutationUpdatePlayerNameArgs = {
  playerId: Scalars['Int']['input'];
  playerName: Scalars['String']['input'];
};


export type RootMutationUpdatePlayerScoreArgs = {
  playerId: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
};


export type RootMutationUpdateQuestionArgs = {
  input: UpdateQuestionInput;
};


export type RootMutationUpdateTitleArgs = {
  id: Scalars['Int']['input'];
  newTitle: Scalars['String']['input'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  /** Fetch all gameboards in the system */
  allGameBoards: Array<GameBoard>;
  /** Fetch all questions */
  allQuestions: Array<Question>;
  /** Fetch all users */
  allUsers: Array<User>;
  /** Fetch a BoardQuestion by board id and question id */
  boardQuestion: BoardQuestion;
  /** Fetch all BoardQuestions for a specific GameBoard */
  boardQuestionsByBoard: Array<BoardQuestion>;
  /** Fetch DetailedBoardQuestion from game_board_id and question_id */
  detailedBoardQuestion: DetailedBoardQuestion;
  /** Fetch game board data */
  fetchGameBoardData: GameBoardData;
  /** Fetch all players by game id */
  fetchPlayersFromGame: Array<Player>;
  /** Fetch a single game by id */
  getGame: Game;
  /** Fetch a single gameboard by id */
  getGameBoard: GameBoard;
  /** Fetch all gameboards associated with a specific user */
  getGameBoardsFromUser: Array<GameBoard>;
  /** Fetch all games from user */
  getGamesFromUser: Array<Game>;
  /** Fetch all questions from a user */
  getQuestionFromUser: Array<Question>;
  /** Fetch questions from list of ids */
  getQuestionsFromIds: Array<Question>;
  /** Fetch user by id */
  getUser: User;
  /** Fetch a single player by id */
  player: Player;
  /** Fetch a single question by id */
  question: Question;
};


export type RootQueryBoardQuestionArgs = {
  gameBoardId: Scalars['Int']['input'];
  questionId: Scalars['Int']['input'];
};


export type RootQueryBoardQuestionsByBoardArgs = {
  gameBoardId: Scalars['Int']['input'];
};


export type RootQueryDetailedBoardQuestionArgs = {
  gameBoardId: Scalars['Int']['input'];
  questionId: Scalars['Int']['input'];
};


export type RootQueryFetchGameBoardDataArgs = {
  gameBoardId: Scalars['Int']['input'];
};


export type RootQueryFetchPlayersFromGameArgs = {
  gameId: Scalars['Int']['input'];
};


export type RootQueryGetGameArgs = {
  gameId: Scalars['Int']['input'];
};


export type RootQueryGetGameBoardArgs = {
  gameBoardId: Scalars['Int']['input'];
};


export type RootQueryGetGameBoardsFromUserArgs = {
  userId: Scalars['Int']['input'];
};


export type RootQueryGetGamesFromUserArgs = {
  userId: Scalars['Int']['input'];
};


export type RootQueryGetQuestionFromUserArgs = {
  userId: Scalars['Int']['input'];
};


export type RootQueryGetQuestionsFromIdsArgs = {
  questionIds: Array<Scalars['Int']['input']>;
};


export type RootQueryGetUserArgs = {
  userId: Scalars['Int']['input'];
};


export type RootQueryPlayerArgs = {
  playerId: Scalars['Int']['input'];
};


export type RootQueryQuestionArgs = {
  questionId: Scalars['Int']['input'];
};

export type UpdateBoardQuestionInput = {
  boardId: Scalars['Int']['input'];
  category?: InputMaybe<Scalars['String']['input']>;
  dailyDouble?: InputMaybe<Scalars['Boolean']['input']>;
  gridCol?: InputMaybe<Scalars['Int']['input']>;
  gridRow?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Int']['input']>;
  questionId: Scalars['Int']['input'];
};

export type UpdateQuestionInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  question?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type CreateBoardQuestionMutationVariables = Exact<{
  input: CreateBoardQuestionInput;
}>;


export type CreateBoardQuestionMutation = { __typename?: 'RootMutation', createBoardQuestion: { __typename?: 'BoardQuestion', boardId: number, questionId: number, category: string, dailyDouble: boolean, points: number, gridRow: number, gridCol: number } };

export type UpdateBoardQuestionMutationVariables = Exact<{
  input: UpdateBoardQuestionInput;
}>;


export type UpdateBoardQuestionMutation = { __typename?: 'RootMutation', updateBoardQuestion: { __typename?: 'BoardQuestion', boardId: number, questionId: number, category: string, dailyDouble: boolean, points: number, gridRow: number, gridCol: number } };

export type UpdateColumnCategoryMutationVariables = Exact<{
  gameBoardId: Scalars['Int']['input'];
  gridCol: Scalars['Int']['input'];
  newCategory: Scalars['String']['input'];
}>;


export type UpdateColumnCategoryMutation = { __typename?: 'RootMutation', updateBoardColumnCategory: boolean };

export type CreateGameBoardMutationVariables = Exact<{
  input: CreateGameBoardInput;
}>;


export type CreateGameBoardMutation = { __typename?: 'RootMutation', createGameBoard: { __typename?: 'GameBoard', id: number, createdAt: any, updatedAt: any, userId: number, title: string } };

export type UpdateTitleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  newTitle: Scalars['String']['input'];
}>;


export type UpdateTitleMutation = { __typename?: 'RootMutation', updateTitle: { __typename?: 'GameBoard', id: number, createdAt: any, updatedAt: any, userId: number, title: string } };

export type CreateGameMutationVariables = Exact<{
  input: CreateGameInput;
}>;


export type CreateGameMutation = { __typename?: 'RootMutation', createGame: { __typename?: 'Game', id: number, createdAt: any, updatedAt: any, gameBoardId: number, userId: number } };

export type CreatePlayerMutationVariables = Exact<{
  input: CreatePlayerInput;
}>;


export type CreatePlayerMutation = { __typename?: 'RootMutation', createPlayer: { __typename?: 'Player', id: number, createdAt: any, updatedAt: any, gameId: number, playerName: string } };

export type UpdatePlayerScoreMutationVariables = Exact<{
  playerId: Scalars['Int']['input'];
  newScore: Scalars['Int']['input'];
}>;


export type UpdatePlayerScoreMutation = { __typename?: 'RootMutation', updatePlayerScore: { __typename?: 'Player', id: number, createdAt: any, updatedAt: any, gameId: number, playerName: string, score: number } };

export type UpdatePlayerNameMutationVariables = Exact<{
  playerId: Scalars['Int']['input'];
  newName: Scalars['String']['input'];
}>;


export type UpdatePlayerNameMutation = { __typename?: 'RootMutation', updatePlayerName: { __typename?: 'Player', id: number, createdAt: any, updatedAt: any, gameId: number, playerName: string, score: number } };

export type DeletePlayerMutationVariables = Exact<{
  playerId: Scalars['Int']['input'];
}>;


export type DeletePlayerMutation = { __typename?: 'RootMutation', deletePlayer: { __typename?: 'Player', id: number, createdAt: any, updatedAt: any, gameId: number, playerName: string, score: number } };

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'RootMutation', createQuestion: { __typename?: 'Question', id: number, createdAt: any, updatedAt: any, userId: number, question: string, answer: string } };

export type UpdateQuestionMutationVariables = Exact<{
  input: UpdateQuestionInput;
}>;


export type UpdateQuestionMutation = { __typename?: 'RootMutation', updateQuestion: { __typename?: 'Question', id: number, question: string, answer: string, createdAt: any, updatedAt: any, userId: number } };

export type DeleteQuestionMutationVariables = Exact<{
  questionId: Scalars['Int']['input'];
}>;


export type DeleteQuestionMutation = { __typename?: 'RootMutation', deleteQuestion: boolean };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'RootMutation', createUser: { __typename?: 'User', id: number, username: string, createdAt: any, updatedAt: any } };

export type BoardQuestionsFromBoardQueryVariables = Exact<{
  gameBoardId: Scalars['Int']['input'];
}>;


export type BoardQuestionsFromBoardQuery = { __typename?: 'RootQuery', boardQuestionsByBoard: Array<{ __typename?: 'BoardQuestion', boardId: number, questionId: number, category: string, dailyDouble: boolean, points: number, gridRow: number, gridCol: number }> };

export type GameBoardDataQueryVariables = Exact<{
  gameBoardId: Scalars['Int']['input'];
}>;


export type GameBoardDataQuery = { __typename?: 'RootQuery', fetchGameBoardData: { __typename?: 'GameBoardData', categories: Array<string>, questions: Array<{ __typename?: 'DetailedBoardQuestion', boardQuestion: { __typename?: 'BoardQuestion', boardId: number, questionId: number, category: string, points: number, gridRow: number, gridCol: number }, question: { __typename?: 'Question', id: number, question: string, answer: string } }> } };

export type GetAllGameBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGameBoardsQuery = { __typename?: 'RootQuery', allGameBoards: Array<{ __typename?: 'GameBoard', id: number, createdAt: any, updatedAt: any, userId: number, title: string }> };

export type GetGameBoardsFromUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetGameBoardsFromUserQuery = { __typename?: 'RootQuery', getGameBoardsFromUser: Array<{ __typename?: 'GameBoard', id: number, createdAt: any, updatedAt: any, userId: number, title: string }> };

export type GetGameBoardQueryVariables = Exact<{
  gameBoardId: Scalars['Int']['input'];
}>;


export type GetGameBoardQuery = { __typename?: 'RootQuery', getGameBoard: { __typename?: 'GameBoard', id: number, createdAt: any, updatedAt: any, userId: number, title: string } };

export type GetGameQueryVariables = Exact<{
  gameId: Scalars['Int']['input'];
}>;


export type GetGameQuery = { __typename?: 'RootQuery', getGame: { __typename?: 'Game', id: number, createdAt: any, updatedAt: any, gameBoardId: number, userId: number } };

export type GetPlayerQueryVariables = Exact<{
  playerId: Scalars['Int']['input'];
}>;


export type GetPlayerQuery = { __typename?: 'RootQuery', player: { __typename?: 'Player', id: number, createdAt: any, updatedAt: any, playerName: string, gameId: number, score: number } };

export type FetchPlayersFromGameQueryVariables = Exact<{
  gameId: Scalars['Int']['input'];
}>;


export type FetchPlayersFromGameQuery = { __typename?: 'RootQuery', fetchPlayersFromGame: Array<{ __typename?: 'Player', id: number, createdAt: any, updatedAt: any, playerName: string, gameId: number, score: number }> };

export type GetAllQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllQuestionsQuery = { __typename?: 'RootQuery', allQuestions: Array<{ __typename?: 'Question', id: number, createdAt: any, updatedAt: any, userId: number, question: string, answer: string }> };

export type GetQuestionsFromIdsQueryVariables = Exact<{
  questionIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type GetQuestionsFromIdsQuery = { __typename?: 'RootQuery', getQuestionsFromIds: Array<{ __typename?: 'Question', id: number, createdAt: any, updatedAt: any, userId: number, question: string, answer: string }> };

export type QuestionQueryVariables = Exact<{
  questionId: Scalars['Int']['input'];
}>;


export type QuestionQuery = { __typename?: 'RootQuery', question: { __typename?: 'Question', id: number, createdAt: any, updatedAt: any, userId: number, question: string, answer: string } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'RootQuery', allUsers: Array<{ __typename?: 'User', id: number, username: string, createdAt: any, updatedAt: any }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetUserQuery = { __typename?: 'RootQuery', getUser: { __typename?: 'User', id: number, username: string, createdAt: any, updatedAt: any } };


export const CreateBoardQuestionDocument = gql`
    mutation CreateBoardQuestion($input: CreateBoardQuestionInput!) {
  createBoardQuestion(input: $input) {
    boardId
    questionId
    category
    dailyDouble
    points
    gridRow
    gridCol
  }
}
    `;
export type CreateBoardQuestionMutationFn = Apollo.MutationFunction<CreateBoardQuestionMutation, CreateBoardQuestionMutationVariables>;

/**
 * __useCreateBoardQuestionMutation__
 *
 * To run a mutation, you first call `useCreateBoardQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardQuestionMutation, { data, loading, error }] = useCreateBoardQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBoardQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardQuestionMutation, CreateBoardQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardQuestionMutation, CreateBoardQuestionMutationVariables>(CreateBoardQuestionDocument, options);
      }
export type CreateBoardQuestionMutationHookResult = ReturnType<typeof useCreateBoardQuestionMutation>;
export type CreateBoardQuestionMutationResult = Apollo.MutationResult<CreateBoardQuestionMutation>;
export type CreateBoardQuestionMutationOptions = Apollo.BaseMutationOptions<CreateBoardQuestionMutation, CreateBoardQuestionMutationVariables>;
export const UpdateBoardQuestionDocument = gql`
    mutation UpdateBoardQuestion($input: UpdateBoardQuestionInput!) {
  updateBoardQuestion(input: $input) {
    boardId
    questionId
    category
    dailyDouble
    points
    gridRow
    gridCol
  }
}
    `;
export type UpdateBoardQuestionMutationFn = Apollo.MutationFunction<UpdateBoardQuestionMutation, UpdateBoardQuestionMutationVariables>;

/**
 * __useUpdateBoardQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateBoardQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardQuestionMutation, { data, loading, error }] = useUpdateBoardQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBoardQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardQuestionMutation, UpdateBoardQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardQuestionMutation, UpdateBoardQuestionMutationVariables>(UpdateBoardQuestionDocument, options);
      }
export type UpdateBoardQuestionMutationHookResult = ReturnType<typeof useUpdateBoardQuestionMutation>;
export type UpdateBoardQuestionMutationResult = Apollo.MutationResult<UpdateBoardQuestionMutation>;
export type UpdateBoardQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateBoardQuestionMutation, UpdateBoardQuestionMutationVariables>;
export const UpdateColumnCategoryDocument = gql`
    mutation UpdateColumnCategory($gameBoardId: Int!, $gridCol: Int!, $newCategory: String!) {
  updateBoardColumnCategory(
    gameBoardId: $gameBoardId
    gridCol: $gridCol
    newCategory: $newCategory
  )
}
    `;
export type UpdateColumnCategoryMutationFn = Apollo.MutationFunction<UpdateColumnCategoryMutation, UpdateColumnCategoryMutationVariables>;

/**
 * __useUpdateColumnCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateColumnCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnCategoryMutation, { data, loading, error }] = useUpdateColumnCategoryMutation({
 *   variables: {
 *      gameBoardId: // value for 'gameBoardId'
 *      gridCol: // value for 'gridCol'
 *      newCategory: // value for 'newCategory'
 *   },
 * });
 */
export function useUpdateColumnCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColumnCategoryMutation, UpdateColumnCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateColumnCategoryMutation, UpdateColumnCategoryMutationVariables>(UpdateColumnCategoryDocument, options);
      }
export type UpdateColumnCategoryMutationHookResult = ReturnType<typeof useUpdateColumnCategoryMutation>;
export type UpdateColumnCategoryMutationResult = Apollo.MutationResult<UpdateColumnCategoryMutation>;
export type UpdateColumnCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateColumnCategoryMutation, UpdateColumnCategoryMutationVariables>;
export const CreateGameBoardDocument = gql`
    mutation CreateGameBoard($input: CreateGameBoardInput!) {
  createGameBoard(input: $input) {
    id
    createdAt
    updatedAt
    userId
    title
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
export const UpdateTitleDocument = gql`
    mutation UpdateTitle($id: Int!, $newTitle: String!) {
  updateTitle(id: $id, newTitle: $newTitle) {
    id
    createdAt
    updatedAt
    userId
    title
  }
}
    `;
export type UpdateTitleMutationFn = Apollo.MutationFunction<UpdateTitleMutation, UpdateTitleMutationVariables>;

/**
 * __useUpdateTitleMutation__
 *
 * To run a mutation, you first call `useUpdateTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTitleMutation, { data, loading, error }] = useUpdateTitleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      newTitle: // value for 'newTitle'
 *   },
 * });
 */
export function useUpdateTitleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTitleMutation, UpdateTitleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTitleMutation, UpdateTitleMutationVariables>(UpdateTitleDocument, options);
      }
export type UpdateTitleMutationHookResult = ReturnType<typeof useUpdateTitleMutation>;
export type UpdateTitleMutationResult = Apollo.MutationResult<UpdateTitleMutation>;
export type UpdateTitleMutationOptions = Apollo.BaseMutationOptions<UpdateTitleMutation, UpdateTitleMutationVariables>;
export const CreateGameDocument = gql`
    mutation CreateGame($input: CreateGameInput!) {
  createGame(input: $input) {
    id
    createdAt
    updatedAt
    gameBoardId
    userId
  }
}
    `;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const CreatePlayerDocument = gql`
    mutation CreatePlayer($input: CreatePlayerInput!) {
  createPlayer(input: $input) {
    id
    createdAt
    updatedAt
    gameId
    playerName
  }
}
    `;
export type CreatePlayerMutationFn = Apollo.MutationFunction<CreatePlayerMutation, CreatePlayerMutationVariables>;

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerMutation, CreatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument, options);
      }
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>;
export type CreatePlayerMutationResult = Apollo.MutationResult<CreatePlayerMutation>;
export type CreatePlayerMutationOptions = Apollo.BaseMutationOptions<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const UpdatePlayerScoreDocument = gql`
    mutation UpdatePlayerScore($playerId: Int!, $newScore: Int!) {
  updatePlayerScore(playerId: $playerId, score: $newScore) {
    id
    createdAt
    updatedAt
    gameId
    playerName
    score
  }
}
    `;
export type UpdatePlayerScoreMutationFn = Apollo.MutationFunction<UpdatePlayerScoreMutation, UpdatePlayerScoreMutationVariables>;

/**
 * __useUpdatePlayerScoreMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerScoreMutation, { data, loading, error }] = useUpdatePlayerScoreMutation({
 *   variables: {
 *      playerId: // value for 'playerId'
 *      newScore: // value for 'newScore'
 *   },
 * });
 */
export function useUpdatePlayerScoreMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerScoreMutation, UpdatePlayerScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerScoreMutation, UpdatePlayerScoreMutationVariables>(UpdatePlayerScoreDocument, options);
      }
export type UpdatePlayerScoreMutationHookResult = ReturnType<typeof useUpdatePlayerScoreMutation>;
export type UpdatePlayerScoreMutationResult = Apollo.MutationResult<UpdatePlayerScoreMutation>;
export type UpdatePlayerScoreMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerScoreMutation, UpdatePlayerScoreMutationVariables>;
export const UpdatePlayerNameDocument = gql`
    mutation UpdatePlayerName($playerId: Int!, $newName: String!) {
  updatePlayerName(playerId: $playerId, playerName: $newName) {
    id
    createdAt
    updatedAt
    gameId
    playerName
    score
  }
}
    `;
export type UpdatePlayerNameMutationFn = Apollo.MutationFunction<UpdatePlayerNameMutation, UpdatePlayerNameMutationVariables>;

/**
 * __useUpdatePlayerNameMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerNameMutation, { data, loading, error }] = useUpdatePlayerNameMutation({
 *   variables: {
 *      playerId: // value for 'playerId'
 *      newName: // value for 'newName'
 *   },
 * });
 */
export function useUpdatePlayerNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerNameMutation, UpdatePlayerNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerNameMutation, UpdatePlayerNameMutationVariables>(UpdatePlayerNameDocument, options);
      }
export type UpdatePlayerNameMutationHookResult = ReturnType<typeof useUpdatePlayerNameMutation>;
export type UpdatePlayerNameMutationResult = Apollo.MutationResult<UpdatePlayerNameMutation>;
export type UpdatePlayerNameMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerNameMutation, UpdatePlayerNameMutationVariables>;
export const DeletePlayerDocument = gql`
    mutation DeletePlayer($playerId: Int!) {
  deletePlayer(playerId: $playerId) {
    id
    createdAt
    updatedAt
    gameId
    playerName
    score
  }
}
    `;
export type DeletePlayerMutationFn = Apollo.MutationFunction<DeletePlayerMutation, DeletePlayerMutationVariables>;

/**
 * __useDeletePlayerMutation__
 *
 * To run a mutation, you first call `useDeletePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlayerMutation, { data, loading, error }] = useDeletePlayerMutation({
 *   variables: {
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useDeletePlayerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlayerMutation, DeletePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlayerMutation, DeletePlayerMutationVariables>(DeletePlayerDocument, options);
      }
export type DeletePlayerMutationHookResult = ReturnType<typeof useDeletePlayerMutation>;
export type DeletePlayerMutationResult = Apollo.MutationResult<DeletePlayerMutation>;
export type DeletePlayerMutationOptions = Apollo.BaseMutationOptions<DeletePlayerMutation, DeletePlayerMutationVariables>;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    createdAt
    updatedAt
    userId
    question
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
export const UpdateQuestionDocument = gql`
    mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
    id
    question
    answer
    createdAt
    updatedAt
    userId
  }
}
    `;
export type UpdateQuestionMutationFn = Apollo.MutationFunction<UpdateQuestionMutation, UpdateQuestionMutationVariables>;

/**
 * __useUpdateQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionMutation, { data, loading, error }] = useUpdateQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionMutation, UpdateQuestionMutationVariables>(UpdateQuestionDocument, options);
      }
export type UpdateQuestionMutationHookResult = ReturnType<typeof useUpdateQuestionMutation>;
export type UpdateQuestionMutationResult = Apollo.MutationResult<UpdateQuestionMutation>;
export type UpdateQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($questionId: Int!) {
  deleteQuestion(questionId: $questionId)
}
    `;
export type DeleteQuestionMutationFn = Apollo.MutationFunction<DeleteQuestionMutation, DeleteQuestionMutationVariables>;

/**
 * __useDeleteQuestionMutation__
 *
 * To run a mutation, you first call `useDeleteQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestionMutation, { data, loading, error }] = useDeleteQuestionMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useDeleteQuestionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument, options);
      }
export type DeleteQuestionMutationHookResult = ReturnType<typeof useDeleteQuestionMutation>;
export type DeleteQuestionMutationResult = Apollo.MutationResult<DeleteQuestionMutation>;
export type DeleteQuestionMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
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
export const BoardQuestionsFromBoardDocument = gql`
    query boardQuestionsFromBoard($gameBoardId: Int!) {
  boardQuestionsByBoard(gameBoardId: $gameBoardId) {
    boardId
    questionId
    category
    dailyDouble
    points
    gridRow
    gridCol
  }
}
    `;

/**
 * __useBoardQuestionsFromBoardQuery__
 *
 * To run a query within a React component, call `useBoardQuestionsFromBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardQuestionsFromBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardQuestionsFromBoardQuery({
 *   variables: {
 *      gameBoardId: // value for 'gameBoardId'
 *   },
 * });
 */
export function useBoardQuestionsFromBoardQuery(baseOptions: Apollo.QueryHookOptions<BoardQuestionsFromBoardQuery, BoardQuestionsFromBoardQueryVariables> & ({ variables: BoardQuestionsFromBoardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardQuestionsFromBoardQuery, BoardQuestionsFromBoardQueryVariables>(BoardQuestionsFromBoardDocument, options);
      }
export function useBoardQuestionsFromBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardQuestionsFromBoardQuery, BoardQuestionsFromBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardQuestionsFromBoardQuery, BoardQuestionsFromBoardQueryVariables>(BoardQuestionsFromBoardDocument, options);
        }
export function useBoardQuestionsFromBoardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BoardQuestionsFromBoardQuery, BoardQuestionsFromBoardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BoardQuestionsFromBoardQuery, BoardQuestionsFromBoardQueryVariables>(BoardQuestionsFromBoardDocument, options);
        }
export type BoardQuestionsFromBoardQueryHookResult = ReturnType<typeof useBoardQuestionsFromBoardQuery>;
export type BoardQuestionsFromBoardLazyQueryHookResult = ReturnType<typeof useBoardQuestionsFromBoardLazyQuery>;
export type BoardQuestionsFromBoardSuspenseQueryHookResult = ReturnType<typeof useBoardQuestionsFromBoardSuspenseQuery>;
export type BoardQuestionsFromBoardQueryResult = Apollo.QueryResult<BoardQuestionsFromBoardQuery, BoardQuestionsFromBoardQueryVariables>;
export const GameBoardDataDocument = gql`
    query gameBoardData($gameBoardId: Int!) {
  fetchGameBoardData(gameBoardId: $gameBoardId) {
    categories
    questions {
      boardQuestion {
        boardId
        questionId
        category
        points
        gridRow
        gridCol
      }
      question {
        id
        question
        answer
      }
    }
  }
}
    `;

/**
 * __useGameBoardDataQuery__
 *
 * To run a query within a React component, call `useGameBoardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameBoardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameBoardDataQuery({
 *   variables: {
 *      gameBoardId: // value for 'gameBoardId'
 *   },
 * });
 */
export function useGameBoardDataQuery(baseOptions: Apollo.QueryHookOptions<GameBoardDataQuery, GameBoardDataQueryVariables> & ({ variables: GameBoardDataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameBoardDataQuery, GameBoardDataQueryVariables>(GameBoardDataDocument, options);
      }
export function useGameBoardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameBoardDataQuery, GameBoardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameBoardDataQuery, GameBoardDataQueryVariables>(GameBoardDataDocument, options);
        }
export function useGameBoardDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GameBoardDataQuery, GameBoardDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GameBoardDataQuery, GameBoardDataQueryVariables>(GameBoardDataDocument, options);
        }
export type GameBoardDataQueryHookResult = ReturnType<typeof useGameBoardDataQuery>;
export type GameBoardDataLazyQueryHookResult = ReturnType<typeof useGameBoardDataLazyQuery>;
export type GameBoardDataSuspenseQueryHookResult = ReturnType<typeof useGameBoardDataSuspenseQuery>;
export type GameBoardDataQueryResult = Apollo.QueryResult<GameBoardDataQuery, GameBoardDataQueryVariables>;
export const GetAllGameBoardsDocument = gql`
    query getAllGameBoards {
  allGameBoards {
    id
    createdAt
    updatedAt
    userId
    title
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
export const GetGameBoardsFromUserDocument = gql`
    query GetGameBoardsFromUser($userId: Int!) {
  getGameBoardsFromUser(userId: $userId) {
    id
    createdAt
    updatedAt
    userId
    title
  }
}
    `;

/**
 * __useGetGameBoardsFromUserQuery__
 *
 * To run a query within a React component, call `useGetGameBoardsFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameBoardsFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameBoardsFromUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetGameBoardsFromUserQuery(baseOptions: Apollo.QueryHookOptions<GetGameBoardsFromUserQuery, GetGameBoardsFromUserQueryVariables> & ({ variables: GetGameBoardsFromUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameBoardsFromUserQuery, GetGameBoardsFromUserQueryVariables>(GetGameBoardsFromUserDocument, options);
      }
export function useGetGameBoardsFromUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameBoardsFromUserQuery, GetGameBoardsFromUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameBoardsFromUserQuery, GetGameBoardsFromUserQueryVariables>(GetGameBoardsFromUserDocument, options);
        }
export function useGetGameBoardsFromUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGameBoardsFromUserQuery, GetGameBoardsFromUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGameBoardsFromUserQuery, GetGameBoardsFromUserQueryVariables>(GetGameBoardsFromUserDocument, options);
        }
export type GetGameBoardsFromUserQueryHookResult = ReturnType<typeof useGetGameBoardsFromUserQuery>;
export type GetGameBoardsFromUserLazyQueryHookResult = ReturnType<typeof useGetGameBoardsFromUserLazyQuery>;
export type GetGameBoardsFromUserSuspenseQueryHookResult = ReturnType<typeof useGetGameBoardsFromUserSuspenseQuery>;
export type GetGameBoardsFromUserQueryResult = Apollo.QueryResult<GetGameBoardsFromUserQuery, GetGameBoardsFromUserQueryVariables>;
export const GetGameBoardDocument = gql`
    query GetGameBoard($gameBoardId: Int!) {
  getGameBoard(gameBoardId: $gameBoardId) {
    id
    createdAt
    updatedAt
    userId
    title
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
 *      gameBoardId: // value for 'gameBoardId'
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
export const GetGameDocument = gql`
    query GetGame($gameId: Int!) {
  getGame(gameId: $gameId) {
    id
    createdAt
    updatedAt
    gameBoardId
    userId
  }
}
    `;

/**
 * __useGetGameQuery__
 *
 * To run a query within a React component, call `useGetGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useGetGameQuery(baseOptions: Apollo.QueryHookOptions<GetGameQuery, GetGameQueryVariables> & ({ variables: GetGameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
      }
export function useGetGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
        }
export function useGetGameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
        }
export type GetGameQueryHookResult = ReturnType<typeof useGetGameQuery>;
export type GetGameLazyQueryHookResult = ReturnType<typeof useGetGameLazyQuery>;
export type GetGameSuspenseQueryHookResult = ReturnType<typeof useGetGameSuspenseQuery>;
export type GetGameQueryResult = Apollo.QueryResult<GetGameQuery, GetGameQueryVariables>;
export const GetPlayerDocument = gql`
    query GetPlayer($playerId: Int!) {
  player(playerId: $playerId) {
    id
    createdAt
    updatedAt
    playerName
    gameId
    score
  }
}
    `;

/**
 * __useGetPlayerQuery__
 *
 * To run a query within a React component, call `useGetPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayerQuery({
 *   variables: {
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useGetPlayerQuery(baseOptions: Apollo.QueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables> & ({ variables: GetPlayerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
      }
export function useGetPlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
        }
export function useGetPlayerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
        }
export type GetPlayerQueryHookResult = ReturnType<typeof useGetPlayerQuery>;
export type GetPlayerLazyQueryHookResult = ReturnType<typeof useGetPlayerLazyQuery>;
export type GetPlayerSuspenseQueryHookResult = ReturnType<typeof useGetPlayerSuspenseQuery>;
export type GetPlayerQueryResult = Apollo.QueryResult<GetPlayerQuery, GetPlayerQueryVariables>;
export const FetchPlayersFromGameDocument = gql`
    query FetchPlayersFromGame($gameId: Int!) {
  fetchPlayersFromGame(gameId: $gameId) {
    id
    createdAt
    updatedAt
    playerName
    gameId
    score
  }
}
    `;

/**
 * __useFetchPlayersFromGameQuery__
 *
 * To run a query within a React component, call `useFetchPlayersFromGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPlayersFromGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPlayersFromGameQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useFetchPlayersFromGameQuery(baseOptions: Apollo.QueryHookOptions<FetchPlayersFromGameQuery, FetchPlayersFromGameQueryVariables> & ({ variables: FetchPlayersFromGameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPlayersFromGameQuery, FetchPlayersFromGameQueryVariables>(FetchPlayersFromGameDocument, options);
      }
export function useFetchPlayersFromGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPlayersFromGameQuery, FetchPlayersFromGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPlayersFromGameQuery, FetchPlayersFromGameQueryVariables>(FetchPlayersFromGameDocument, options);
        }
export function useFetchPlayersFromGameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FetchPlayersFromGameQuery, FetchPlayersFromGameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchPlayersFromGameQuery, FetchPlayersFromGameQueryVariables>(FetchPlayersFromGameDocument, options);
        }
export type FetchPlayersFromGameQueryHookResult = ReturnType<typeof useFetchPlayersFromGameQuery>;
export type FetchPlayersFromGameLazyQueryHookResult = ReturnType<typeof useFetchPlayersFromGameLazyQuery>;
export type FetchPlayersFromGameSuspenseQueryHookResult = ReturnType<typeof useFetchPlayersFromGameSuspenseQuery>;
export type FetchPlayersFromGameQueryResult = Apollo.QueryResult<FetchPlayersFromGameQuery, FetchPlayersFromGameQueryVariables>;
export const GetAllQuestionsDocument = gql`
    query getAllQuestions {
  allQuestions {
    id
    createdAt
    updatedAt
    userId
    question
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
    query getQuestionsFromIds($questionIds: [Int!]!) {
  getQuestionsFromIds(questionIds: $questionIds) {
    id
    createdAt
    updatedAt
    userId
    question
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
 *      questionIds: // value for 'questionIds'
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
export const QuestionDocument = gql`
    query question($questionId: Int!) {
  question(questionId: $questionId) {
    id
    createdAt
    updatedAt
    userId
    question
    answer
  }
}
    `;

/**
 * __useQuestionQuery__
 *
 * To run a query within a React component, call `useQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionQuery({
 *   variables: {
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useQuestionQuery(baseOptions: Apollo.QueryHookOptions<QuestionQuery, QuestionQueryVariables> & ({ variables: QuestionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionQuery, QuestionQueryVariables>(QuestionDocument, options);
      }
export function useQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionQuery, QuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionQuery, QuestionQueryVariables>(QuestionDocument, options);
        }
export function useQuestionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QuestionQuery, QuestionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QuestionQuery, QuestionQueryVariables>(QuestionDocument, options);
        }
export type QuestionQueryHookResult = ReturnType<typeof useQuestionQuery>;
export type QuestionLazyQueryHookResult = ReturnType<typeof useQuestionLazyQuery>;
export type QuestionSuspenseQueryHookResult = ReturnType<typeof useQuestionSuspenseQuery>;
export type QuestionQueryResult = Apollo.QueryResult<QuestionQuery, QuestionQueryVariables>;
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
export const GetUserDocument = gql`
    query getUser($userId: Int!) {
  getUser(userId: $userId) {
    id
    username
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;