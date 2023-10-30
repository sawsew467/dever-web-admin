import React, { useEffect, useState } from "react";

import Image from "next/image";
import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";
import TagField from "./TagField";
import { getCookie } from "cookies-next";
import { getAllHobbies } from "@/apis/dataOrganizer";
import axios from "axios";
import { PiPencilSimpleFill, PiPencilSimpleLineFill } from "react-icons/pi";
// import { getMemberHobby } from "@/apis/setting";

type THobby = {
  id: string;
  name: string;
};
type TProps = {
  userHobbies: string[];
};

function Hobbies({ userHobbies }: TProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [hobbies, setHobbies] = useState<string[]>(userHobbies);

  const handleGetAllHobbiesSuggestions = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllHobbies(access_token);
        const data = response.data.body;
        const filtedData = data
          .map((item: THobby) => {
            return item.name;
          })
          .filter((item: THobby) => item.name !== "default");
        setSuggestions(filtedData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetAllHobbiesSuggestions();
  }, []);
  return (
    <div className="flex flex-col gap-[20px] p-[24px] rounded-[10px] shadow-primary dark:shadow-darkPrimary dark:text-white">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px] dark:text-white">Hobbies</h3>
        <button
          className={`w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition ${isEdit ? "bg-blue-700 text-white" :  ""} `}
          onClick={() => {
           setIsEdit(!isEdit)
          }}
        >
          {isEdit ? <PiPencilSimpleLineFill/> : <PiPencilSimpleFill/>}
        </button>
      </div>
      <div className="flex flex-col gap-[5px]" aria-disabled="true">
        <p className="font-[300] text-[14px] dark:text-white dark:font-bold">Add tag</p>
        {suggestions.length === 0 ? null : (
          <TagField
            suggestions={suggestions}
            isEdit={isEdit}
            state={hobbies}
            setState={setHobbies}
            useTagFor={"hobbies"}
          />
        )}
      </div>
    </div>
  );
}

export default Hobbies;
