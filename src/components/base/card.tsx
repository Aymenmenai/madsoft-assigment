type Props = {
  children: React.ReactElement;
  title: string;
  p: string;
};

const Card = ({ children, title, p }: Props) => {
  return (
    <div className="ring-2 w-full h-1/3 rounded-xl p-5 cursor-pointer ">
      <div className="grid gap-3">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-sm">{p}</div>
        <div className="flex justify-end items-center gap-5">{children}</div>
      </div>
    </div>
  );
};

export default Card;
