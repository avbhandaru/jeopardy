// src/app/types/SaveAction.ts
import {
  CreateQuestionInput,
  CreateBoardQuestionInput,
  UpdateQuestionInput,
  UpdateBoardQuestionInput,
} from "@/generated/graphql";

export enum SaveActionType {
  CREATE = "CREATE",
  UPDATE_QUESTION = "UPDATE_QUESTION",
  UPDATE_BOARDQUESTION = "UPDATE_BOARDQUESTION",
  UPDATE_BOTH = "UPDATE_BOTH",
}

export type SaveAction =
  | {
      type: SaveActionType.CREATE;
      questionInput: CreateQuestionInput;
      boardQuestionInput: CreateBoardQuestionInput;
    }
  | {
      type: SaveActionType.UPDATE_QUESTION;
      updateQuestionInput: UpdateQuestionInput;
    }
  | {
      type: SaveActionType.UPDATE_BOARDQUESTION;
      updateBoardQuestionInput: UpdateBoardQuestionInput;
    }
  | {
      type: SaveActionType.UPDATE_BOTH;
      updateQuestionInput: UpdateQuestionInput;
      updateBoardQuestionInput: UpdateBoardQuestionInput;
    };
