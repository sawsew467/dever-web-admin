import {
  deleteSkill,
  getAllSkills,
  patchSkill,
  postSkill,
} from "@/apis/dataOrganizer";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
  const [editSkillsValue, setEditSkillsValue] = useState<string>("");
  const editRef = useRef<HTMLInputElement | null>(null);
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const handleOnChangeEditSkills = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditSkillsValue(event.target.value);
  };
  const [inputSkillsValue, setInputSkillsValue] = useState<string>("");

  const handleOnChangeInputSkills = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputSkillsValue(event.target.value);
  };
  const [skillsData, setSkillsData] = useState<TSkill[]>();
  const handleGetAllSkill = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllSkills(access_token);
        const data = response.data;
        setSkillsData(data);
        setIsFetchData(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        toast.error("Get all skill failded!");
      }
    }
  };
  useEffect(() => {
    handleGetAllSkill();
  }, []);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [skillId, setSkillId] = useState<string>("");
  const handleEdit = (item: TSkill) => {
    setEditSkillsValue(item.value);
    setIsEdit(true);
    setSkillId(item.id);
    if (editRef.current) {
      editRef.current.focus();
    }
  };
  const handleAddSkill = async (value: string) => {
    try {
      const access_token = getCookie("accessToken");
      const postValue = {
        value: value,
      };
      if (access_token) {
        const response = await postSkill(access_token, postValue);
        toast.success(`Add skill with value: "${value}" successfully!`);
        setInputSkillsValue('')
        handleGetAllSkill();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (value.length == 0) {
          toast.warning(`Can add empty value`);
        } else {
          toast.error(`Add skill with value: "${value}" failed!`);
        }
      }
    }
  };
  const handleUpdateSkill = async (value: string, itemId: string) => {
    try {
      const access_token = getCookie("accessToken");
      const updateValue = {
        value: value,
        id: itemId,
      };
      if (access_token) {
        const response = await patchSkill(access_token, updateValue);
        toast.success(`Update skill with value: "${value}" successfully!`);
        handleGetAllSkill();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Update skill with value: "${value}" failed!`);
      }
    }
  };
  const handleDeleteSkill = async (item: TSkill) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await deleteSkill(access_token, item.id);
        toast.success(`Deleted skill with value: "${item.value}"successfully!`);
        handleGetAllSkill();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Deleting skill with value: "${item.value}" failed!`);
      }
    }
  };

  return (
    <div className="shadow-primary rounded-[10px] p-[20px] flex flex-col gap-[10px]">
      <div>
        <h3 className="font-[700] text-[24px]">Skills</h3>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h3 className="font-bold">All skills in database:</h3>

        <ul className="flex flex-col gap-[10px] max-h-[420px] overflow-y-scroll scrollbar-hide p-[4px]">
          {skillsData?.length == 0 ? (
            <div>Empty</div>
          ) : skillsData && !isFetchData ? (
            skillsData.map((item: TSkill, index: number) => (
              <li
                className="flex flex-row justify-between rounded-[8px] px-[10px] py-[8px] shadow-primary bg-blue-100"
                key={index}
              >
                <p className="font-semibold">{item.value}</p>
                <div className="flex flex-row gap-[10px]">
                  <button
                    className="border-[1px] px-[4px] rounded-[5px] text-[12px] bg-green-400 text-white hover:scale-105 transition"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="border-[1px] px-[4px] rounded-[5px] text-[12px] bg-red-500 text-white hover:scale-105 transition"
                    onClick={() => handleDeleteSkill(item)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <LinearProgress />
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h3 className="font-bold">Add skill: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={inputSkillsValue}
            placeholder="Enter new skill..."
            className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
            onChange={(e) => handleOnChangeInputSkills(e)}
          />
          <button
            className="px-[20px] bg-blue-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleAddSkill(inputSkillsValue)}
          >
            Add
          </button>
        </div>
      </div>

      <div className={`flex flex-col gap-[10px] ${isEdit ? "" : "hidden"}`}>
        <h3 className="font-bold">Edit skill: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={editSkillsValue}
            className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
            onChange={(e) => handleOnChangeEditSkills(e)}
            ref={editRef}
          />
          <button
            className="px-[20px] bg-green-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleUpdateSkill(editSkillsValue, skillId)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
