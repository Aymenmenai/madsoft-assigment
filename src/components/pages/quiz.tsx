import { useCallback, useEffect, useState } from "react";
import ProgressBar from "../build/progress-bar/progress-bar";
import data from "../data/quizzes.json";
import { useLocalStorage } from "../hook/useLocalStorage";
import PageContainer from "../base/page-container";
import TrashIcon from "../interface/icon/trash-icon";
import { useNavigate } from "react-router-dom";
import QuizEnd from "../build/quiz/quiz-end";
import OptionQuestion from "../build/quiz/option-question";
import FillQuestion from "../build/quiz/fill-question";

// MAIN QUIZ COMPONENT
const Quiz = () => {
  const { getItem: extra } = useLocalStorage("extra-question");

  const quizName = "История России";
  const quizDuration = 60; // min

  const { setItem, getItem, removeItem } = useLocalStorage(quizName);

  const quiz = extra()
    ? [...data.find((a) => a.name === quizName)!.question, ...extra()]
    : data.find((a) => a.name === quizName)!.question;

  // GET THE ELEMENT NEEDED
  const getElementNeeded = (arr: any) => {
    let currAnswer = arr.quiz.find(
      (el: { question: number; answer: number[] }) =>
        el.question === quiz[currQuestion].id
    ) || { question: quiz[currQuestion].id, answer: [] };
    return currAnswer;
  };

  //
  const navigate = useNavigate();
  // STATE VARIABLES
  const [currQuestion, setCurrQuestion] = useState<number>(
    getItem()?.lastQuestionId || 0
  );
  const [answer, setAnswer] = useState<number[]>([]);
  const [input, setInput] = useState<string>("");

  // SELECT DATA FUNCTION
  const selectData = (num: number) => {
    const arr = getItem();
    let currAnswer = getElementNeeded(arr);

    if (quiz[currQuestion].answer.length > 1) {
      currAnswer.answer.includes(num)
        ? (currAnswer.answer = currAnswer.answer.filter(
            (el: number) => el !== num
          ))
        : currAnswer.answer.push(num);
    } else {
      currAnswer.answer = [num];
    }

    const index = arr.quiz.findIndex(
      (q: { question: number }) => q.question === currAnswer.question
    );
    index !== -1 ? (arr.quiz[index] = currAnswer) : arr.quiz.push(currAnswer);
    setItem(arr);
    setAnswer(currAnswer.answer);
  };
  // INPUT DATA FUNCTION
  const inputData = (val: string) => {
    const arr = getItem();
    let currAnswer = getElementNeeded(arr);
    currAnswer.answer = val;
    const index = arr.quiz.findIndex(
      (q: { question: number }) => q.question === currAnswer.question
    );
    index !== -1 ? (arr.quiz[index] = currAnswer) : arr.quiz.push(currAnswer);
    setItem(arr);
    setInput(currAnswer.answer);
  };

  // ANSWER HANDLER FUNCTION
  const answerHandler = useCallback(() => {
    if (currQuestion < quiz.length) setCurrQuestion(currQuestion + 1);
    setAnswer([]);
    setInput("");
    const arr = getItem();
    arr.lastQuestionId = currQuestion + 1;
    setItem(arr);
  }, [currQuestion, quiz.length]);

  const updateTimer = async (time: number) => {
    let quizData = getItem();
    const now = new Date().toISOString();

    if (!quizData) {
      quizData = {
        quiz: [],
        timeLeft: quizDuration * 60,
        updatedAt: now,
        lastQuestionId: 0,
      };
    } else {
      quizData.timeLeft = time;
    }

    setItem(quizData);
  };

  // EFFECT TO SET ANSWER
  useEffect(() => {
    if (!!quiz[currQuestion]?.id) {
      const arr = getItem();
      const currentAnswer = arr?.quiz.find(
        (el: { question: number }) => el.question === quiz[currQuestion].id
      );
      setAnswer(currentAnswer ? currentAnswer.answer : []);
      setInput(currentAnswer ? currentAnswer.answer : "");
    }
  }, [currQuestion]);

  // console.log(input);
  return (
    <PageContainer
      navbar={
        <ProgressBar
          func={updateTimer}
          timeLeft={getItem()?.timeLeft || quizDuration * 60}
          length={quiz.length}
          curr={currQuestion}
        />
      }
    >
      <div className="row-span-7 w-full h-full grid grid-rows-7 gap-5">
        {currQuestion === quiz.length ? (
          <>
            <QuizEnd />
          </>
        ) : (
          <>
            <div className="row-span-2 p-5 select-none h-full">
              <div className="text-sm font-bold">
                {quiz[currQuestion].type === "selection"
                  ? `Пожалуйста, выберите один  ${
                      quiz[currQuestion].answer.length > 1
                        ? "или несколько вариантов"
                        : "вариант"
                    }`
                  : "Please fill the form"}
              </div>
              <div className="text-gray-700">{quiz[currQuestion].question}</div>
            </div>
            <div className="row-span-4 grid gap-2">
              {quiz[currQuestion].type === "selection" ? (
                <OptionQuestion
                  arr={quiz[currQuestion].options}
                  func={selectData}
                  condition={answer}
                />
              ) : (
                <FillQuestion
                  limit={quiz[currQuestion].limit}
                  func={inputData}
                  val={input}
                />
              )}
            </div>
          </>
        )}
        <div className="flex z-10 justify-between items-center">
          <button
            onClick={() =>
              currQuestion > 0 && setCurrQuestion(currQuestion - 1)
            }
            className="button ring-2 hover:bg-gray-500/20 text-gray-500 ring-gray-300"
          >
            {"Возвращение"}
          </button>
          {currQuestion === quiz.length ? (
            <button
              onClick={() => {
                removeItem();
                return navigate("/");
              }}
              className={` button bg-red-600   text-white`}
            >
              <div>{"Зайти в аккаунт и удалить данные"}</div>
              <TrashIcon />
            </button>
          ) : (
            <button
              onClick={answerHandler}
              disabled={!answer.length && !input.length}
              className={`${
                answer.length || input.length
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-500 cursor-not-allowed"
              } button   text-white`}
            >
              {"Следующий"}
            </button>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Quiz;
