type OptionQuestionType = {
  arr: { id: number; answer: string }[];
  func: (val: number) => void;
  condition: number[];
};

const OptionQuestion = ({ arr, func, condition }: OptionQuestionType) => (
  <>
    {arr.map((el, index) => (
      <div
        onClick={() => func(el.id)}
        className={`${
          condition.includes(el.id)
            ? "ring-blue-600 text-blue-600"
            : "ring-gray-300 text-gray-500"
        } ring-2 flex gap-3 justify-start items-center duration-75 transform-none cursor-pointer rounded py-3 px-5`}
        key={el.id}
      >
        <div
          className={`${
            condition.includes(el.id)
              ? "text-blue-600 bg-blue-500/20"
              : "ring-gray-300 bg-gray-500/20"
          } px-2 rounded font-bold`}
        >
          {index + 1}
        </div>
        <div>{el.answer}</div>
      </div>
    ))}
  </>
);

export default OptionQuestion;
