import React, { useEffect, useState } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import UnlinkButton from "@/components/UnlinkButton";
import { TagifySettings } from "@yaireo/tagify";
import "./styling.scss";
import { getCookie } from "cookies-next";
import { postMemberHobby, postMemberSkill } from "@/apis/setting";
import axios from "axios";
import { toast } from "react-toastify";

interface TagFieldProps {
  suggestions: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  state: string[];
  isEdit: boolean;
  useTagFor: "skills" | "hobbies";
}

const baseTagifySettings = {
  blacklist: [],
  maxTags: 30,
  backspace: "edit",
  placeholder: "Enter tags...",
  editTags: 1,
  dropdown: {
    enabled: 0,
  },
  callbacks: {} as any,
};

function TagField({
  suggestions,
  setState,
  state,
  isEdit,
  useTagFor,
}: TagFieldProps) {
  const [data, setData] = useState<string[]>(state);
  
  const handleChange = (e: CustomEvent) => {
    setData(e.detail.tagify.value.map((item: { value: string }) => item.value));
  };

  const settings: TagifySettings<Tagify.BaseTagData> = {
    ...baseTagifySettings,
    whitelist: suggestions,
    editTags: 1,
    backspace: "edit",
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
      "edit:updated": handleChange,
      "edit:start": handleChange,
      "edit:input": handleChange,
    },
  };
  const handlePostMemberSkills = async () => {
    try {
      const access_token = getCookie("accessToken");
      const userId = getCookie("userId")?.toString();      
      if (access_token) {
        const value = {
          userId: userId!,
          skills: data
        };

        await postMemberSkill(access_token, value);
        toast.success(`Post skills successfully!`)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(`Post skills failed!`)
      }
    }
  };
  const handlePostMemberHobbies = async () => {
    try {
      const access_token = getCookie("accessToken");
      const userId = getCookie("userId")?.toString();      

      if (access_token && userId) {
        const value = {
          userId: userId,
          hobbies: data
        }
        await postMemberHobby(access_token, value);
        toast.success(`Post hobbies successfully!`)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(`Post hobbies failed!`)
      }
    }
  };

  const handleSubmitTags =  () => {
    if (useTagFor === "skills") {
      handlePostMemberSkills();
    }
    if (useTagFor === "hobbies") {
      handlePostMemberHobbies();
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div
        className={`form-group border-[1px] border-gray-300 dark:border-darkHover  rounded-[6px] p-[6px] 
        ${useTagFor === "skills" ? "isSkills" : "isHobbies"}
      ${isEdit ? "" : "pointer-events-none"}`}
      >
        <Tags value={state} settings={settings} readOnly={false} className="dark:text-white"/>
      </div>
      {isEdit ? (
        <div>
          <UnlinkButton
            textContent={"Save"}
            icon={""}
            iconPosition={"left"}
            backgroundColor={"bg-blue-700"}
            method={() => {
              handleSubmitTags();
            }}
            tailwind={"text-white dark:shadow-darkPrimaryBlue"}
          ></UnlinkButton>
        </div>
      ) : null}
    </div>
  );
}

export default TagField;
