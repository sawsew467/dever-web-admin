import {
    deleteDepartment,
    deleteMajor,
    getAllDepartment,
    getAllMajor,
    patchDepartment,
    patchMajor,
    postDepartment,
    postMajor,
  } from "@/apis/dataOrganizer";
  import { LinearProgress } from "@mui/material";
  import axios from "axios";
  import { getCookie } from "cookies-next";
  import React, { useEffect, useRef, useState } from "react";
  import { toast } from "react-toastify";
  
  type TDepartment = {
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
    const [editDepartmentsValue, setEditDepartmentsValue] = useState<string>("");
    const editRef = useRef<HTMLInputElement | null>(null);
    const [isFetchData, setIsFetchData] = useState<boolean>(true);
    const handleOnChangeEditDepartments = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setEditDepartmentsValue(event.target.value);
    };
    const [inputDepartmentsValue, setInputDepartmentsValue] = useState<string>("");
  
    const handleOnChangeInputDepartments = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setInputDepartmentsValue(event.target.value);
    };
    const [departmentsData, setDepartmentsData] = useState<TDepartment[]>();
    const handleGetAllDepartment = async () => {
      try {
        const access_token = getCookie("accessToken");
        if (access_token) {
          const response = await getAllDepartment(access_token);
          const data = response.data;
          setDepartmentsData(data);
          setIsFetchData(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
  
          toast.error("Get all department failded!");
        }
      }
    };
    useEffect(() => {
      handleGetAllDepartment();
    }, []);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [departmentId, setDepartmentId] = useState<string>("");
    const handleEdit = (item: TDepartment) => {
      setEditDepartmentsValue(item.value);
      setIsEdit(true);
      setDepartmentId(item.id);
      if (editRef.current) {
        editRef.current.focus();
      }
    };
    const handleAddDepartment = async (value: string) => {
      try {
        const access_token = getCookie("accessToken");
        const postValue = {
          value: value,
        };
        if (access_token) {
          const response = await postDepartment(access_token, postValue);
          toast.success(`Add department with value: "${value}" successfully!`);
          setInputDepartmentsValue('');
          handleGetAllDepartment();
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
    const handleUpdateDepartment = async (value: string, itemId: string) => {
      try {
        const access_token = getCookie("accessToken");
        const updateValue = {
          value: value,
          id: itemId,
        };
        if (access_token) {
          const response = await patchDepartment(access_token, updateValue);
          toast.success(`Update skill with value: "${value}" successfully!`);
          handleGetAllDepartment();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(`Update major with value: "${value}" failed!`);
        }
      }
    };
    const handleDeleteDepartment = async (item: TDepartment) => {
      try {
        const access_token = getCookie("accessToken");
        if (access_token) {
          const response = await deleteDepartment(access_token, item.id);
          toast.success(`Deleted department with value: "${item.value}"successfully!`);
          handleGetAllDepartment();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(`Deleting department with value: "${item.value}" failed!`);
        }
      }
    };
  
    return (
      <div className="shadow-primary rounded-[10px] p-[20px] flex flex-col gap-[10px]">
        <div>
          <h3 className="font-[700] text-[24px]">Departments</h3>
        </div>
  
        <div className="flex flex-col gap-[10px]">
          <h3 className="font-bold">All departments in database:</h3>
  
          <ul className="flex flex-col gap-[10px] max-h-[420px] overflow-y-scroll scrollbar-hide p-[4px]">
            {departmentsData?.length == 0 ? (
              <div>Empty</div>
            ) : departmentsData && !isFetchData ? (
                departmentsData.map((item: TDepartment, index: number) => (
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
                      onClick={() => handleDeleteDepartment(item)}
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
          <h3 className="font-bold">Add department: </h3>
          <div className="flex justify-between gap-[10px]">
            <input
              type="text"
              value={inputDepartmentsValue}
              placeholder="Enter new skill..."
              className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
              onChange={(e) => handleOnChangeInputDepartments(e)}
            />
            <button
              className="px-[20px] bg-blue-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
              onClick={() => handleAddDepartment(inputDepartmentsValue)}
            >
              Add
            </button>
          </div>
        </div>
  
        <div className={`flex flex-col gap-[10px] ${isEdit ? "" : "hidden"}`}>
          <h3 className="font-bold">Edit department: </h3>
          <div className="flex justify-between gap-[10px]">
            <input
              type="text"
              value={editDepartmentsValue}
              className="rounded-[8px] placeholder:text-[14px] border-gray-300 w-full"
              onChange={(e) => handleOnChangeEditDepartments(e)}
              ref={editRef}
            />
            <button
              className="px-[20px] bg-green-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
              onClick={() => handleUpdateDepartment(editDepartmentsValue, departmentId)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Majors;
  