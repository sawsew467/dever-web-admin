import React, { SetStateAction, useEffect } from "react";
import Link from "next/link";

interface Ipros {
  paramID: string;
  countNumberOfPage: number;
  pages: { param: string; startIndex: number; endIndex: number }[];
  increaseIndex: number;
  sliceSetData: React.Dispatch<SetStateAction<any>>;
  data: any;
  route: string;
}

function Pagination({
  paramID,
  route,
  countNumberOfPage,
  pages,
  increaseIndex,
  sliceSetData,
  data,
}: Ipros) {
  const renderPagination = () => {
    const buttons = [];
    let startIndex = 0;
    let endIndex = 0;
    for (let i = 1; i <= countNumberOfPage; i++) {
      buttons.push(
        <Link href={`${route}/${i}`} key={i}>
          <button
            className={`px-[12px] py-[4px] border-r-[1px] ${
              paramID === i.toString() ? "bg-blue-200 text-blue-600" : ""
            }`}
          >
            {i}
          </button>
        </Link>
      );
      pages.push({
        param: i.toString(),
        startIndex: startIndex,
        endIndex: startIndex + increaseIndex,
      });
      endIndex = startIndex + increaseIndex;
      startIndex = endIndex + 1;
      endIndex = startIndex + increaseIndex;
    }
    return buttons;
  };

  useEffect(() => {
    const handleNextPage = () => {
      const page = pages[parseInt(paramID) - 1];
      if (page) {
        sliceSetData(data.slice(page.startIndex, page.endIndex + 1));
      }
    };
    handleNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`w-[100%] flex justify-center items-center pb-[40px]`}
      style={{
        display: countNumberOfPage <= 1 ? "none" : "",
      }}
    >
      <div className="border-[1px] rounded-md font-[14px]">
        <button
          className={`px-[12px] py-[4px] border-r-[1px] ${
            paramID === "1" ? "text-slate-300 pointer-events-none" : ""
          }`}
        >
          <Link
            href={`${route}/${paramID === "1" ? "1" : parseInt(paramID) - 1}`}
          >
            Previous
          </Link>
        </button>

        {renderPagination()}

        <button
          className={`px-[12px] py-[4px] ${
            paramID === countNumberOfPage.toString()
              ? "pointer-events-none text-slate-300"
              : ""
          }`}
        >
          <Link href={`${route}/${parseInt(paramID) + 1}`}>Next</Link>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
