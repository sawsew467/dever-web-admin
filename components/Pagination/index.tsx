import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  paramID: string;
  countNumberOfPage: number;
  route: string;
  data: any;
  increaseIndex: number;
  sliceSetData: (data: any) => void;
}

function Pagination({
  paramID,
  countNumberOfPage,
  route,
  data,
  increaseIndex,
  sliceSetData,
}: IProps) {
  const router = useRouter();

  const renderPagination = () => {
    const buttons = [];

    for (let i = 1; i <= countNumberOfPage; i++) {
      buttons.push(
        <Link href={`${route}/${i}`} key={i}>
          <button
            className={`px-2 py-1 border-r ${
              paramID === i.toString() ? "bg-blue-200 text-blue-600" : ""
            }`}
          >
            {i}
          </button>
        </Link>
      );
    }

    return buttons;
  };

  useEffect(() => {
    // When the component mounts or the paramID changes, update the sliced data    
    const page = parseInt(paramID);    
    if (!isNaN(page) && page >= 1 && page <= countNumberOfPage) {
      const itemsPerPage = increaseIndex+1; // Set the number of items per page
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const slicedData = data.slice(startIndex, endIndex);
      sliceSetData(slicedData);
    }
  }, [paramID, countNumberOfPage, data, sliceSetData, increaseIndex]);

  return (
    <div className="w-full flex justify-center items-center pb-4">
      <div className="border rounded-md text-sm">
        <button
          className={`px-2 py-1 border-r ${
            paramID === "1" ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            if (paramID !== "1") {
              router.push(`${route}/${parseInt(paramID) - 1}`);
            }
          }}
        >
          Previous
        </button>

        {renderPagination()}

        <button
          className={`px-2 py-1 ${
            paramID === countNumberOfPage.toString()
              ? "text-gray-400 cursor-not-allowed"
              : ""
          }`}
          onClick={() => {
            if (paramID !== countNumberOfPage.toString()) {
              router.push(`${route}/${parseInt(paramID) + 1}`);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
