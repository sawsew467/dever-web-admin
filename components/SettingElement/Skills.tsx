import React, { useEffect, useState } from "react";
import TagField from "./TagField";

import Image from "next/image";
import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { getAllSkills } from "@/apis/dataOrganizer";
import { PiPencilSimpleFill, PiPencilSimpleLineFill } from "react-icons/pi";
// import { getMemberSkill} from "@/apis/setting";

type TSkill = {
  id: string;
  name: string;
};
type TProps = {
  userSkills: string[];
};

function Skills({ userSkills }: TProps): JSX.Element {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [skills, setSkills] = useState<string[]>(userSkills);
  // console.log(suggestions);

  const handleGetAllSkillSuggestions = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllSkills(access_token);
        const data = response.data.body;
        // console.log(data);
        const filtedData = data
          .map((item: TSkill) => {
            return item.name;
          })
          .filter((item: TSkill) => item.name !== "default");
        setSuggestions(filtedData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetAllSkillSuggestions();
  }, []);

  return (
    <div className="flex flex-col gap-[20px] p-[24px] rounded-[10px] shadow-primary dark:shadow-darkPrimary dark:text-white">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px] dark:text-white">Skills</h3>
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
        <p className="font-[300] text-[14px] dark:text-white dark:font-semibold">Add tag</p>
        {suggestions.length === 0 ? null : (
          <TagField
            suggestions={suggestions!}
            isEdit={isEdit}
            useTagFor="skills"
            state={skills}
            setState={setSkills}
          />
        )}
      </div>
    </div>
  );
}

export default Skills;
