import React, { useEffect, useState } from "react";
import TagField from "./TagField";

import Image from "next/image";
import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { getAllSkills } from "@/apis/dataOrganizer";
import { getMemberSkill} from "@/apis/setting";

type TSkill = {
  blogTagEntities: any;
  createdAt: string;
  creator: string;
  deleteFlag: boolean;
  id: string;
  memberSkillEntities: any;
  remover: string;
  updatedAt: string;
  value: string;
};

function Skills() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [skills, setSkills] = useState<string[]>([]);

  const handleGetAllSkillSuggestions = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllSkills(access_token);
        const data = response.data;
        const filtedData = data
          .map((item: TSkill) => {
            return item.value;
          })
          .filter((item: TSkill) => item.value !== "default");
        setSuggestions(filtedData);        
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const handleGetMemberSkill = async () => {
    try {
      const access_token = getCookie("accessToken");
      const userId = getCookie("userId");
      if (access_token && userId) {
        const response = await getMemberSkill(access_token, userId);
        const data = response.data;
        setSkills(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetAllSkillSuggestions();
    handleGetMemberSkill();
  }, []);

  return (
    <div className="flex flex-col gap-[20px] p-[24px] rounded-[10px] shadow-primary">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px] ">Skills</h3>
        <button
          className="w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          <Image
            src={isEdit ? EditIconAnimate : EditIconPause}
            alt="Edit"
            width={18}
            height={18}
          ></Image>
        </button>
      </div>
      <div className="flex flex-col gap-[5px]" aria-disabled="true">
        <p className="font-[300] text-[14px]">Add tag</p>
        {
          suggestions.length === 0 ? null :
          <TagField
          suggestions={suggestions!}
          isEdit={isEdit}
          useTagFor="skills"
          state={skills}
          setState={setSkills}
        />
        }
      </div>
    </div>
  );
}

export default Skills;
