import { useState } from "react";

type Props = {
  value: string;
  limit?: number | 0;
  func: (value: string) => void;
};

function Textarea({ value, limit, func }: Props) {
  const [text, setText] = useState(value);

  // FUNCTION TO COUNT THE NUMBER OF WORDS
  const countWords = (text2: string | any): number => {
    if (typeof text2 !== "string") {
      return 0;
    }
    return text2.trim().split(/\s+/).length;
  };
  // HANDLE TEXT CHANGE
  const handleChange = (inputText: string) => {
    const words = inputText.trim().split(/\s+/);
    if (limit) {
      if (limit && words.length <= limit) {
        setText(inputText);
        func(inputText);
      }
    } else {
      setText(inputText);
      func(inputText);
    }
  };

  return (
    <div className="relative w-full  flex-1">
      <textarea
        className="w-full h-full p-4 border resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={({ target }) => handleChange(target.value)}
        placeholder="Type here..."
      />
      {!!limit && (
        <div className="absolute bottom-2 right-2 text-sm text-gray-600">
          {countWords(text)}/{limit} words
        </div>
      )}
    </div>
  );
}

export default Textarea;
