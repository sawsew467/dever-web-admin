import {
    deleteMajor,
    deletePosition,
    getAllMajor,
    getAllPosition,
    patchMajor,
    patchPosition,
    postMajor,
    postPosition,
  } from "@/apis/dataOrganizer";
  import { LinearProgress } from "@mui/material";
  import axios from "axios";
  import { getCookie } from "cookies-next";
  import React, { useEffect, useRef, useState } from "react";
  import { toast } from "react-toastify";
  
  type TPosition = {
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
    const [editPositionsValue, setEditPositionsValue] = useState<string>("");
    const editRef = useRef<HTMLInputElement | null>(null);
    const [isFetchData, setIsFetchData] = useState<boolean>(true);
    const handleOnChangeEditPositions = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setEditPositionsValue(event.target.value);
    };
    const [inputPositionsValue, setInputPositionsValue] = useState<string>("");
  
    const handleOnChangeInputPositions = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setInputPositionsValue(event.target.value);
    };
    const [positionsData, setPositionsData] = useState<TPosition[]>();
    const handleGetAllPosition = async () => {
      try {
        const access_token = getCookie("accessToken");
        if (access_token) {
          const response = await getAllPosition(access_token);
          const data = response.data;
          setPositionsData(data);
          setIsFetchData(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
  
          toast.error("Get all position failded!");
        }
      }
    };
    useEffect(() => {
      handleGetAllPosition();
    }, []);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [positionId, setPositionId] = useState<string>("");
    const handleEdit = (item: TPosition) => {
      setEditPositionsValue(item.value);
      setIsEdit(true);
      setPositionId(item.id);
      if (editRef.current) {
        editRef.current.focus();
      }
    };
    const handleAddPosition = async (value: string) => {
      try {
        const access_token = getCookie("accessToken");
        const postValue = {
          value: value,
        };
        if (access_token) {
          const response = await postPosition(access_token, postValue);
          toast.success(`Add position with value: "${value}" successfully!`);
          setInputPositionsValue('')
          handleGetAllPosition();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (value.length == 0) {
            toast.warning(`Can add empty value`);
          } else {
            toast.error(`Add position with value: "${value}" failed!`);
          }
        }
      }
    };
    const handleUpdatePosition = async (value: string, itemId: string) => {
      try {
        const access_token = getCookie("accessToken");
        const updateValue = {
          value: value,
          id: itemId,
        };
        if (access_token) {
          const response = await patchPosition(access_token, updateValue);
          toast.success(`Update skill with value: "${value}" successfully!`);
          handleGetAllPosition();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(`Update major with value: "${value}" failed!`);
        }
      }
    };
    const handleDeletePosition = async (item: TPosition) => {
      try {
        const access_token = getCookie("accessToken");
        if (access_token) {
          const response = await deletePosition(access_token, item.id);
          toast.success(`Deleted position with value: "${item.value}"successfully!`);
          handleGetAllPosition();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(`Deleting position with value: "${item.value}" failed!`);
        }
      }
    };
  
    return (
      <div className="shadow-primary rounded-[10px] p-[20px] flex flex-col gap-[10px]">
        <div>
          <h3 className="font-[700] text-[24px]">Positions</h3>
        </div>
  
        <div className="flex flex-col gap-[10px]">
          <h3 className="font-bold">All positions in database:</h3>
  
          <ul className="flex flex-col gap-[10px] max-h-[420px] overflow-y-scroll scrollbar-hide p-[4px]">
            {positionsData?.length == 0 ? (
              <div>Empty</div>
            ) : positionsData && !isFetchData ? (
                positionsData.map((item: TPosition, index: number) => (
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
                      onClick={() => handleDeletePosition(item)}
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
          <h3 className="font-bold">Add positions: </h3>
          <div className="flex justify-between gap-[10px]">
            <input
              type="text"
              value={inputPositionsValue}
              placeholder="Enter new skill..."
              className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
              onChange={(e) => handleOnChangeInputPositions(e)}
            />
            <button
              className="px-[20px] bg-blue-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
              onClick={() => handleAddPosition(inputPositionsValue)}
            >
              Add
            </button>
          </div>
        </div>
  
        <div className={`flex flex-col gap-[10px] ${isEdit ? "" : "hidden"}`}>
          <h3 className="font-bold">Edit positions: </h3>
          <div className="flex justify-between gap-[10px]">
            <input
              type="text"
              value={editPositionsValue}
              className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
              onChange={(e) => handleOnChangeEditPositions(e)}
              ref={editRef}
            />
            <button
              className="px-[20px] bg-green-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
              onClick={() => handleUpdatePosition(editPositionsValue, positionId)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Majors;
  