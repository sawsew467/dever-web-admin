import {
  deleteHobby,
  getAllHobbies,
  patchHobby,
  postHobby,
} from "@/apis/dataOrganizer";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type THobby = {
  id: string;
  value: string;
  memberHobbyEntities: any;
  createdAt: string;
  updatedAt: string;
  creator: string;
  remover: string;
  deleteFlag: boolean;
};

function Hobbies() {
  const [editHobbiesValue, setEditHobbiesValue] = useState<string>("");
  const editRef = useRef<HTMLInputElement | null>(null);
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const handleOnChangeEditSkills = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditHobbiesValue(event.target.value);
  };
  const [inputHobbiesValue, setInputHobbiesValue] = useState<string>("");

  const handleOnChangeInputSkills = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputHobbiesValue(event.target.value);
  };
  const [hobbiesData, setHobbiesData] = useState<THobby[]>();
  const handleGetAllHobbies = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllHobbies(access_token);
        const data = response.data;
        setHobbiesData(data);
        setIsFetchData(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        toast.error("Get all hobbies failded!");
      }
    }
  };
  useEffect(() => {
    handleGetAllHobbies();
  }, []);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [hobbyId, setHobbyId] = useState<string>("");
  const handleEdit = (item: THobby) => {
    setEditHobbiesValue(item.value);
    setIsEdit(true);
    setHobbyId(item.id);
    if (editRef.current) {
      editRef.current.focus();
    }
  };
  const handleAddHobby = async (value: string) => {
    try {
      const access_token = getCookie("accessToken");
      const postValue = {
        value: value,
      };
      if (access_token) {
        const response = await postHobby(access_token, postValue);
        toast.success(`Add hobby with value: "${value}" successfully!`);
        setInputHobbiesValue('')
        handleGetAllHobbies();
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
  const handleUpdateHobby = async (value: string, itemId: string) => {
    try {
      const access_token = getCookie("accessToken");
      const updateValue = {
        value: value,
        id: itemId,
      };
      if (access_token) {
        const response = await patchHobby(access_token, updateValue);
        toast.success(`Update hobby with value: "${value}" successfully!`);
        handleGetAllHobbies();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Update hobby with value: "${value}" failed!`);
      }
    }
  };
  const handleDeleteHobby = async (item: THobby) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await deleteHobby(access_token, item.id);
        toast.success(`Deleted hobby with value: "${item.value}"successfully!`);
        handleGetAllHobbies();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Deleting hobby with value: "${item.value}" failed!`);
      }
    }
  };

  return (
    <div className="shadow-primary rounded-[10px] p-[20px] flex flex-col gap-[10px]">
      <div>
        <h3 className="font-[700] text-[24px]">Hobbies</h3>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h3 className="font-bold">All hobbies in database:</h3>

        <ul className="flex flex-col gap-[10px] max-h-[420px] overflow-y-scroll scrollbar-hide p-[4px]">
          {hobbiesData?.length == 0 ? (
            <div>Empty</div>
          ) : hobbiesData && !isFetchData ? (
            hobbiesData.map((item: THobby, index: number) => (
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
                    onClick={() => handleDeleteHobby(item)}
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
        <h3 className="font-bold">Add hobby: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={inputHobbiesValue}
            placeholder="Enter new skill..."
            className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
            onChange={(e) => handleOnChangeInputSkills(e)}
          />
          <button
            className="px-[20px] bg-blue-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleAddHobby(inputHobbiesValue)}
          >
            Add
          </button>
        </div>
      </div>

      <div className={`flex flex-col gap-[10px] ${isEdit ? "" : "hidden"}`}>
        <h3 className="font-bold">Edit hobbies: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={editHobbiesValue}
            className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
            onChange={(e) => handleOnChangeEditSkills(e)}
            ref={editRef}
          />
          <button
            className="px-[20px] bg-green-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleUpdateHobby(editHobbiesValue, hobbyId)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hobbies;
