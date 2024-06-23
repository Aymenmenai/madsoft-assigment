import { ChangeEvent, FormEvent, useState } from "react";
import { IdType, InputType } from "../../types/type.d";
import Input from "../../base/input";
import TrashIcon from "../../interface/icon/trash-icon";

type OptionType = {
  id: IdType;
  answer: string;
};

const OptionInput = ({ func, data }: InputType) => {
  const [answer, setAnswer] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };
  const inputDataHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newOption: OptionType = {
      id: crypto.randomUUID(),
      answer,
    };
    func("options", [...data.options, newOption]);
    setAnswer("");
  };
  // console.log(isCorrect);
  return (
    <>
      <form
        className="relative flex gap-2 items-center  "
        onSubmit={inputDataHandler}
      >
        <Input onChange={handleInputChange} value={answer} />
        <button
          disabled={data.options.length > 3}
          className=" bg-blue-600 z-10 text-white  right-0"
        >
          add
        </button>
      </form>
      <ul className="grid gap-3 py-5">
        {data.options.map((el) => {
          return (
            <li
              className={`${
                data.answer.includes(el.id) && "bg-green-300"
              } ring-2 flex gap-3 justify-between items-center duration-75 transform-none cursor-pointer rounded `}
              key={el.id}
            >
              <div
                onClick={() =>
                  !data.answer.includes(el.id)
                    ? func("answer", [...data.answer, el.id])
                    : func("answer", [
                        ...data.answer.filter((e: IdType) => e !== el.id),
                      ])
                }
                className="flex-1 h-full p-3"
              >
                {el.answer}
              </div>
              <div
                className="text-red-600 p-3"
                onClick={() =>
                  func("options", [
                    ...data.options.filter((e) => e.id !== el.id),
                  ])
                }
              >
                <TrashIcon />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default OptionInput;
