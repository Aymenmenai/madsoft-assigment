// TYPES
export type IdType = `${string}-${string}-${string}-${string}-${string}`;
// ANSWER TYPE
export interface AnswerType {
  id: IdType;
  answer: string;
}
export interface QuestionType {
  id: IdType;
  question: string;
  type: "selection" | "fill";
  limit?: number;
  answer: IdType[];
  options: AnswerType[];
}

export type QuestionPreviewType = Pick<QuestionType, "question" | "type">;

export type InputType = {
  func: <K extends keyof QuestionType>(key: K, value: QuestionType[K]) => void;
  data: QuestionType;
};
