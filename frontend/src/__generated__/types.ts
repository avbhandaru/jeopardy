export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
