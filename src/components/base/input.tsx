import React from "react";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function Input({ value, onChange }: Props) {
  return (
    <input
      className="ring-2 ring-blue-600"
      type="text"
      name="answer"
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
