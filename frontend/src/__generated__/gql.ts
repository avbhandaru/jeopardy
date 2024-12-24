/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation CreateBoardQuestion($input: CreateBoardQuestionInput!) {\n    createBoardQuestion(input: $input) {\n      boardId\n      questionId\n      category\n      dailyDouble\n      points\n      gridRow\n      gridCol\n    }\n  }\n": types.CreateBoardQuestionDocument,
    "\n  mutation UpdateBoardQuestion($input: UpdateBoardQuestionInput!) {\n    updateBoardQuestion(input: $input) {\n      boardId\n      questionId\n      category\n      dailyDouble\n      points\n      gridRow\n      gridCol\n    }\n  }\n": types.UpdateBoardQuestionDocument,
    "\n  mutation UpdateColumnCategory(\n    $gameBoardId: Int!\n    $gridCol: Int!\n    $newCategory: String!\n  ) {\n    updateBoardColumnCategory(\n      gameBoardId: $gameBoardId\n      gridCol: $gridCol\n      newCategory: $newCategory\n    )\n  }\n": types.UpdateColumnCategoryDocument,
    "\n  mutation CreateGameBoard($input: CreateGameBoardInput!) {\n    createGameBoard(input: $input) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n": types.CreateGameBoardDocument,
    "\n  mutation UpdateTitle($id: Int!, $newTitle: String!) {\n    updateTitle(id: $id, newTitle: $newTitle) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n": types.UpdateTitleDocument,
    "\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n": types.CreateQuestionDocument,
    "\n  mutation UpdateQuestion($input: UpdateQuestionInput!) {\n    updateQuestion(input: $input) {\n      id\n      question\n      answer\n      createdAt\n      updatedAt\n      userId\n    }\n  }\n": types.UpdateQuestionDocument,
    "\n  mutation DeleteQuestion($questionId: Int!) {\n    deleteQuestion(questionId: $questionId)\n  }\n": types.DeleteQuestionDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateUserDocument,
    "\n  query boardQuestionsFromBoard($gameBoardId: Int!) {\n    boardQuestionsByBoard(gameBoardId: $gameBoardId) {\n      boardId\n      questionId\n      category\n      dailyDouble\n      points\n      gridRow\n      gridCol\n    }\n  }\n": types.BoardQuestionsFromBoardDocument,
    "\n  query gameBoardData($gameBoardId: Int!) {\n    fetchGameBoardData(gameBoardId: $gameBoardId) {\n      categories\n      questions {\n        boardQuestion {\n          boardId\n          questionId\n          category\n          points\n          gridRow\n          gridCol\n        }\n        question {\n          id\n          question\n          answer\n        }\n      }\n    }\n  }\n": types.GameBoardDataDocument,
    "\n  query getAllGameBoards {\n    allGameBoards {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n": types.GetAllGameBoardsDocument,
    "\n  query GetGameBoardsFromUser($userId: Int!) {\n    getGameBoardsFromUser(userId: $userId) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n": types.GetGameBoardsFromUserDocument,
    "\n  query GetGameBoard($gameBoardId: Int!) {\n    getGameBoard(gameBoardId: $gameBoardId) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n": types.GetGameBoardDocument,
    "\n  query getAllQuestions {\n    allQuestions {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n": types.GetAllQuestionsDocument,
    "\n  query getQuestionsFromIds($questionIds: [Int!]!) {\n    getQuestionsFromIds(questionIds: $questionIds) {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n": types.GetQuestionsFromIdsDocument,
    "\n  query question($questionId: Int!) {\n    question(questionId: $questionId) {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n": types.QuestionDocument,
    "\n  query getAllUsers{\n    allUsers {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetAllUsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateBoardQuestion($input: CreateBoardQuestionInput!) {\n    createBoardQuestion(input: $input) {\n      boardId\n      questionId\n      category\n      dailyDouble\n      points\n      gridRow\n      gridCol\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBoardQuestion($input: CreateBoardQuestionInput!) {\n    createBoardQuestion(input: $input) {\n      boardId\n      questionId\n      category\n      dailyDouble\n      points\n      gridRow\n      gridCol\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateBoardQuestion($input: UpdateBoardQuestionInput!) {\n    updateBoardQuestion(input: $input) {\n      boardId\n      questionId\n      category\n      dailyDouble\n      points\n      gridRow\n      gridCol\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBoardQuestion($input: UpdateBoardQuestionInput!) {\n    updateBoardQuestion(input: $input) {\n      boardId\n      questionId\n      category\n      dailyDouble\n      points\n      gridRow\n      gridCol\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateColumnCategory(\n    $gameBoardId: Int!\n    $gridCol: Int!\n    $newCategory: String!\n  ) {\n    updateBoardColumnCategory(\n      gameBoardId: $gameBoardId\n      gridCol: $gridCol\n      newCategory: $newCategory\n    )\n  }\n"): (typeof documents)["\n  mutation UpdateColumnCategory(\n    $gameBoardId: Int!\n    $gridCol: Int!\n    $newCategory: String!\n  ) {\n    updateBoardColumnCategory(\n      gameBoardId: $gameBoardId\n      gridCol: $gridCol\n      newCategory: $newCategory\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateGameBoard($input: CreateGameBoardInput!) {\n    createGameBoard(input: $input) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGameBoard($input: CreateGameBoardInput!) {\n    createGameBoard(input: $input) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTitle($id: Int!, $newTitle: String!) {\n    updateTitle(id: $id, newTitle: $newTitle) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTitle($id: Int!, $newTitle: String!) {\n    updateTitle(id: $id, newTitle: $newTitle) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n"): (typeof documents)["\n  mutation CreateQuestion($input: CreateQuestionInput!) {\n    createQuestion(input: $input) {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateQuestion($input: UpdateQuestionInput!) {\n    updateQuestion(input: $input) {\n      id\n      question\n      answer\n      createdAt\n      updatedAt\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateQuestion($input: UpdateQuestionInput!) {\n    updateQuestion(input: $input) {\n      id\n      question\n      answer\n      createdAt\n      updatedAt\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteQuestion($questionId: Int!) {\n    deleteQuestion(questionId: $questionId)\n  }\n"): (typeof documents)["\n  mutation DeleteQuestion($questionId: Int!) {\n    deleteQuestion(questionId: $questionId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query boardQuestionsFromBoard($gameBoardId: Int!) {\n    boardQuestionsByBoard(gameBoardId: $gameBoardId) {\n      boardId\n      questionId\n      category\n      dailyDouble\n      points\n      gridRow\n      gridCol\n    }\n  }\n"): (typeof documents)["\n  query boardQuestionsFromBoard($gameBoardId: Int!) {\n    boardQuestionsByBoard(gameBoardId: $gameBoardId) {\n      boardId\n      questionId\n      category\n      dailyDouble\n      points\n      gridRow\n      gridCol\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query gameBoardData($gameBoardId: Int!) {\n    fetchGameBoardData(gameBoardId: $gameBoardId) {\n      categories\n      questions {\n        boardQuestion {\n          boardId\n          questionId\n          category\n          points\n          gridRow\n          gridCol\n        }\n        question {\n          id\n          question\n          answer\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query gameBoardData($gameBoardId: Int!) {\n    fetchGameBoardData(gameBoardId: $gameBoardId) {\n      categories\n      questions {\n        boardQuestion {\n          boardId\n          questionId\n          category\n          points\n          gridRow\n          gridCol\n        }\n        question {\n          id\n          question\n          answer\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAllGameBoards {\n    allGameBoards {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"): (typeof documents)["\n  query getAllGameBoards {\n    allGameBoards {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGameBoardsFromUser($userId: Int!) {\n    getGameBoardsFromUser(userId: $userId) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetGameBoardsFromUser($userId: Int!) {\n    getGameBoardsFromUser(userId: $userId) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGameBoard($gameBoardId: Int!) {\n    getGameBoard(gameBoardId: $gameBoardId) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetGameBoard($gameBoardId: Int!) {\n    getGameBoard(gameBoardId: $gameBoardId) {\n      id\n      createdAt\n      updatedAt\n      userId\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAllQuestions {\n    allQuestions {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n"): (typeof documents)["\n  query getAllQuestions {\n    allQuestions {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getQuestionsFromIds($questionIds: [Int!]!) {\n    getQuestionsFromIds(questionIds: $questionIds) {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n"): (typeof documents)["\n  query getQuestionsFromIds($questionIds: [Int!]!) {\n    getQuestionsFromIds(questionIds: $questionIds) {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query question($questionId: Int!) {\n    question(questionId: $questionId) {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n"): (typeof documents)["\n  query question($questionId: Int!) {\n    question(questionId: $questionId) {\n      id\n      createdAt\n      updatedAt\n      userId\n      question\n      answer\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAllUsers{\n    allUsers {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query getAllUsers{\n    allUsers {\n      id\n      username\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;