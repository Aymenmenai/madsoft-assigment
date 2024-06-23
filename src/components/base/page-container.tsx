import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowIcon from "../interface/icon/arrow-icon";

type Props = {
  children: React.ReactNode;
  navbar: React.ReactNode;
};



function PageContainer({ children, navbar }: Props) {
  const navigate = useNavigate();
  return (
    <div className="page flex flex-col">
      <div className="flex justify-between items-center gap-5">
        <button
          onClick={() => navigate("/")}
          className="hover:bg-gray-500/20 cursor-pointer p-3 rounded-full flex justify-center items-center"
        >
          <Link to={"/"}>
            <ArrowIcon />
          </Link>
        </button>
        <>{navbar}</>
      </div>
      <div className="flex-1 p-3 flex flex-col">{children}</div>
    </div>
  );
}

export default PageContainer;
