import { useEffect, useState } from "react";
import Input from "../base/input";
import PageContainer from "../base/page-container";
import { QuestionType } from "../types/type.d";
import { useLocalStorage } from "../hook/useLocalStorage";
import FillInput from "../build/add/fill-input";
import OptionInput from "../build/add/option-input";



const Add = () => {
  const { setItem, getItem } = useLocalStorage("extra-question");
  const [question, setQuestion] = useState<QuestionType>({
    id: crypto.randomUUID(),
    question: "",
    type: "selection",
    answer: [],
    options: [],
  });

  const handleOptionChange = <K extends keyof QuestionType>(
    key: K,
    value: QuestionType[K]
  ) => {
    let data = { ...question };
    data[key] = value as QuestionType[typeof key];
    setQuestion(data);
  };

  const submitNewQuestion = () => {
    const prevData: QuestionType[] = getItem();
    if (prevData) {
      setItem([...prevData, question]);
    } else {
      setItem([question]);
    }
    setQuestion({
      id: crypto.randomUUID(),
      question: "",
      type: "selection",
      answer: [],
      options: [],
    });
  };

  useEffect(() => {
    setQuestion({ ...question, answer: [], options: [] });
  }, [question.type]);

  return (
    <PageContainer
      navbar={
        <>
          <button
            disabled={question.answer.length < 1}
            onClick={() => submitNewQuestion()}
            className="bg-blue-600 text-white"
          >
            Add to the quiz
          </button>
        </>
      }
    >
      <form className="flex flex-col gap-3 ">
        <div className="grid">
          <label>Add new question</label>
          <Input
            onChange={({ target }) =>
              handleOptionChange("question", target.value)
            }
            value={question.question}
          />
        </div>
        <div className="pb-4">
          <label>Type of question</label>
          <div className="flex gap-5">
            <label className="flex gap-2" htmlFor="addOptions">
              <input
                type="radio"
                checked={question.type === "selection"}
                onChange={() => handleOptionChange("type", `selection`)}
              />
              Add options
            </label>
            <label className="flex gap-2" htmlFor="addFill">
              <input
                type="radio"
                checked={question.type === "fill"}
                onChange={() => handleOptionChange("type", `fill`)}
              />
              Add fill
            </label>
          </div>
        </div>
      </form>
      <div className="relative h-full">
        {question.type === "fill" ? (
          <FillInput func={handleOptionChange} data={question} />
        ) : (
          <OptionInput func={handleOptionChange} data={question} />
        )}
      </div>
    </PageContainer>
  );
};

export default Add;
