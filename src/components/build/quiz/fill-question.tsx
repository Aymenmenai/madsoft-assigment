import Textarea from "../../base/textarea";

type InputAnswerType = {
  func: (val: string) => void;
  val: string;
  limit?: number;
};

const FillQuestion = ({ func, val, limit }: InputAnswerType) => {
  return <Textarea func={func} value={val} limit={limit} />;
};


export default FillQuestion