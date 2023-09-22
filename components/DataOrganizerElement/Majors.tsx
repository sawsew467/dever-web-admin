import {
  deleteMajor,
  getAllMajor,
  patchMajor,
  postMajor,
} from "@/apis/dataOrganizer";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type TMajor = {
  id: string;
  value: string;
  memberHobbyEntities: any;
  createdAt: string;
  updatedAt: string;
  creator: string;
  remover: string;
  deleteFlag: boolean;
};

function Majors() {
  const [editMajorsValue, setEditMajorsValue] = useState<string>("");
  const editRef = useRef<HTMLInputElement | null>(null);
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const handleOnChangeEditMajors = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditMajorsValue(event.target.value);
  };
  const [inputMajorsValue, setInputMajorsValue] = useState<string>("");

  const handleOnChangeInputMajors = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputMajorsValue(event.target.value);
  };
  const [majorsData, setMajorsData] = useState<TMajor[]>();
  const handleGetAllMajor = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllMajor(access_token);
        const data = response.data;
        setMajorsData(data);
        setIsFetchData(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        toast.error("Get all major failded!");
      }
    }
  };
  useEffect(() => {
    handleGetAllMajor();
  }, []);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [majorId, setMajorId] = useState<string>("");
  const handleEdit = (item: TMajor) => {
    setEditMajorsValue(item.value);
    setIsEdit(true);
    setMajorId(item.id);
    if (editRef.current) {
      editRef.current.focus();
    }
  };
  const handleAddMajor = async (value: string) => {
    try {
      const access_token = getCookie("accessToken");
      const postValue = {
        value: value,
      };
      if (access_token) {
        const response = await postMajor(access_token, postValue);
        toast.success(`Add major with value: "${value}" successfully!`);
        setInputMajorsValue('')
        handleGetAllMajor();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (value.length == 0) {
          toast.warning(`Can add empty value`);
        } else {
          toast.error(`Add major with value: "${value}" failed!`);
        }
      }
    }
  };
  const handleUpdateMajor = async (value: string, itemId: string) => {
    try {
      const access_token = getCookie("accessToken");
      const updateValue = {
        value: value,
        id: itemId,
      };
      if (access_token) {
        const response = await patchMajor(access_token, updateValue);
        toast.success(`Update skill with value: "${value}" successfully!`);
        handleGetAllMajor();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Update major with value: "${value}" failed!`);
      }
    }
  };
  const handleDeleteMajor = async (item: TMajor) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await deleteMajor(access_token, item.id);
        toast.success(`Deleted major with value: "${item.value}"successfully!`);
        handleGetAllMajor();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Deleting major with value: "${item.value}" failed!`);
      }
    }
  };

  return (
    <div className="shadow-primary rounded-[10px] p-[20px] flex flex-col gap-[10px]">
      <div>
        <h3 className="font-[700] text-[24px]">Majors</h3>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h3 className="font-bold">All majors in database:</h3>

        <ul className="flex flex-col gap-[10px] max-h-[420px] overflow-y-scroll scrollbar-hide p-[4px]">
          {majorsData?.length == 0 ? (
            <div>Empty</div>
          ) : majorsData && !isFetchData ? (
            majorsData.map((item: TMajor, index: number) => (
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
                    onClick={() => handleDeleteMajor(item)}
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
        <h3 className="font-bold">Add major: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={inputMajorsValue}
            placeholder="Enter new skill..."
            className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
            onChange={(e) => handleOnChangeInputMajors(e)}
          />
          <button
            className="px-[20px] bg-blue-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleAddMajor(inputMajorsValue)}
          >
            Add
          </button>
        </div>
      </div>

      <div className={`flex flex-col gap-[10px] ${isEdit ? "" : "hidden"}`}>
        <h3 className="font-bold">Edit major: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={editMajorsValue}
            className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
            onChange={(e) => handleOnChangeEditMajors(e)}
            ref={editRef}
          />
          <button
            className="px-[20px] bg-green-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleUpdateMajor(editMajorsValue, majorId)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Majors;
