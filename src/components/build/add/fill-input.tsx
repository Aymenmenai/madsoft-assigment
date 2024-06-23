import { useEffect } from "react";
import { InputType } from "../../types/type.d";
import Textarea from "../../base/textarea";

const FillInput = ({ func, data }: InputType) => {
  const id = crypto.randomUUID();
  const fillHandler = (value: string) => {
    func("options", [{ ...data.options[0], answer: value }]);
  };

  useEffect(() => {
    func("options", [{ id, answer: "" }]);
    func("answer", [id]);
  }, []);

  return (
    <div className=" h-full flex flex-col w-full gap-3 ">
      <input
        min={0}
        value={data.limit}
        onChange={({ target }) => func("limit", +target.value)}
        className="ring-2 ring-blue-600"
        type="number"
      />
      <Textarea
        func={fillHandler}
        value={data.options[0]?.answer || ""}
        limit={data.limit}
      />
    </div>
  );
};

export default FillInput;
