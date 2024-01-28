"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import searchIcon from "@icon/page/member/list/search-outline.svg";

import {
  approveUser,
  deleteUserOutOfDB,
  getAllRemovedUser,
  restoreUser,
} from "@/apis/appUser";
import { deleteMemberInfo, getAllMemberInfo } from "@/apis/profile";
import Button from "@/components/Button";
import ApproveDialog from "@/components/Dialogs/MemberListDialog/ApproveDialog";
import DeleteAllRemovedUserDialog from "@/components/Dialogs/MemberListDialog/DeleteAllRemovedUserDialog";
import DeleteOutAUserDialog from "@/components/Dialogs/MemberListDialog/DeleteOutAUserDialog";
import MemberRecycleBinDialog from "@/components/Dialogs/MemberListDialog/MemberRecycleBinDialog";
import RemoveDialog from "@/components/Dialogs/MemberListDialog/RemoveDialog";
import MemberItem from "@/components/MemberItem/";
import Pagination from "@/components/Pagination";
import { dropdownMembers, openMemberList } from "@/redux/slices/sideBarControl";
import { RootState, store } from "@/redux/store";
import { memberPros, memberType } from "@/ultils/types";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import { MdRecycling } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type pageProps = {
  params: { listID: string };
};

function MemberList({ params }: pageProps) {
  const userRole = useSelector(
    (state: RootState) => state.userInfor.currentUser.role
  );
  const router = useRouter();
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const increaseIndex = 7;
  const [allMemberData, setAllMemberData] = useState([]);
  const [members, setMembers] = useState<memberPros[]>([]);
  const [countListPage, setCountListPage] = useState(0);
  const [isFetchData, setIsFetchData] = useState(true);
  const [openDialogToDelete, setOpenDialogToDelete] = useState<boolean>(false);
  const [openDialogToApprove, setOpenDialogToApprove] =
    useState<boolean>(false);
  const [removedUsers, setRemovedUsers] = useState<memberPros[]>([]);

  const [openDialogToRecycle, setOpenDialogToRecycle] =
    useState<boolean>(false);
  const [openDialogToDeleteOneUser, setOpenDialogToDeleteOneUser] =
    useState<boolean>(false);
  const [
    openDialogToDeleteAllRemovedUser,
    setOpenDialogToDeleteAllRemovedUser,
  ] = useState<boolean>(false);
  const [deleteUser, setDeleteUser] = useState<memberType>();

  const handleClickOpenDeleteDialog = () => {
    setOpenDialogToDelete(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDialogToDelete(false);
  };

  const handleClickOpenApproveDialog = () => {
    setOpenDialogToApprove(true);
  };
  const handleCloseApproveDialog = () => {
    setOpenDialogToApprove(false);
  };
  const handleGetAllMember = async () => {
    try {
      const access_token = getCookie("accessToken");
      const adminId = getCookie("userId");
      if (access_token) {
        const response = await getAllMemberInfo(access_token);
        const data = response.data.body;
        const currentUserRole = store.getState().userInfor.currentUser.role;

        let filteredData = data
          .map((value: memberType) => {
            if (currentUserRole === "admin") {
              return {
                ...value,
                isSelected: false,
              };
            } else if (value.status === "Approved") {
              return {
                ...value,
                isSelected: false,
              };
            }
            return null;
          })
          .filter((value: memberPros) => value !== null);

        if (currentUserRole == "admin") {
          filteredData = filteredData.filter(
            (value: memberPros) => value.id !== adminId
          );
        }

        setCountListPage(Math.ceil(filteredData.length / increaseIndex));
        setIsFetchData(false);
        setAllMemberData(filteredData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const getAllRemovedMember = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllRemovedUser(access_token);
        const data = response.data.body;
        setRemovedUsers(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const handleRestoreUser = async (
    userInfo: memberPros,
    isNeedToast: boolean
  ) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token && userInfo) {
        await restoreUser(access_token, userInfo.id);
        if (isNeedToast) {
          toast.success(
            "Restored user with email: " + userInfo.email + "successfully!"
          );
        }
        handleGetAllMember();
        getAllRemovedMember();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error("Something went wrong when restore user " + userInfo.email);
      }
    }
  };
  const handleDeleteUserOutOfBD = async (
    userInfo: memberType,
    isNeedToast: boolean
  ) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token && userInfo) {
        await deleteUserOutOfDB(access_token, userInfo.id);
        if (isNeedToast) {
          toast.success(
            "Deleted user with email: " + userInfo.email + " successfully!"
          );
        }
        getAllRemovedMember();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error("Something went wrong when delete user " + userInfo.email);
      }
    }
  };
  const handleRestoreAllUser = async () => {
    removedUsers.forEach((item) => handleRestoreUser(item, false));
    toast.success("Restored successfully!");
  };
  const handleDeleteAllRemovedUser = async () => {
    removedUsers.forEach((item) => handleDeleteUserOutOfBD(item, false));
    toast.success("Deleted successfully!");
  };

  useEffect(() => {
    handleGetAllMember();
    getAllRemovedMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const updatedMembers = members.map((member: memberPros) => ({
      ...member,
      isSelected: isChecked,
    }));
    setMembers(updatedMembers);
  };

  const toggleMemberSelection = (id: string) => {
    setMembers((prevMembers: memberPros[]) =>
      prevMembers.map((member: memberPros) =>
        member.id === id
          ? { ...member, isSelected: !member.isSelected }
          : member
      )
    );
  };

  const [selectedMembers, setSelectedMembers] = useState<memberPros[]>([]);
  const handleGetAllSelectedMembers = (purpose: "approve" | "delete") => {
    const newMembersSelected: memberPros[] = members.filter(
      (value) => value.isSelected == true
    );
    setSelectedMembers(newMembersSelected);
    if (newMembersSelected.length !== 0 && purpose == "delete") {
      handleClickOpenDeleteDialog();
    } else if (newMembersSelected.length !== 0 && purpose == "approve") {
      handleClickOpenApproveDialog();
    }
  };

  const handleRemoveUser = async (
    userId: string,
    userEmail: string,
    isNeedToast: boolean
  ) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await deleteMemberInfo(userId, access_token);
        if (isNeedToast) {
          toast.success(`Remove user ${userEmail} successfully!`);
        }
      }
      setOpenDialogToDelete(false);
      handleGetAllMember();
      getAllRemovedMember();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setOpenDialogToDelete(false);
        toast.error("Something went wrong when remove user " + userEmail);
      }
    }
  };
  const handleApproveUser = async (
    userId: string,
    userEmail: string,
    isNeedToast: boolean
  ) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await approveUser(userId, access_token);
        if (isNeedToast) {
          toast.success(`Approved user with email: ${userEmail}`);
        }
      }
      handleGetAllMember();
      setOpenDialogToApprove(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setOpenDialogToApprove(false);
        if (error.response?.data.responseStatusCode === 4) {
          toast.error("Something went wrong when approve user: " + userEmail);
        }
      }
    }
  };

  const handleDelectSelectedMembers = () => {
    selectedMembers.forEach((value) =>
      handleRemoveUser(value.id, value.email, false)
    );
    toast.success(`Remove successfully!`);
    setOpenDialogToRecycle(false);
  };

  const handleApproveSelectedMembers = () => {
    selectedMembers.forEach((item) => {
      if (item.status !== "Approved") {
        handleApproveUser(item.id, item.email, false);
      } else {
        handleCloseApproveDialog();
      }
    });
    toast.success(`Approved successfully!`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dropdownMembers(true));
    dispatch(openMemberList(true));
  }, [dispatch]);

  return (
    <div
      className={`w-[100%] ${
        isOpenSlidebar
          ? isMouseVisit
            ? "sm:w-[calc(100%-250px)]"
            : "sm:w-[calc(100%-65px)]"
          : "sm:w-[calc(100%-250px)]"
      } absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}
    >
      <div className="w-[100%] flex flex-col gap-[20px] select-none">
        <div>
          <h1 className="font-bold text-[24px] select-none pt-[20px] px-[16px] dark:text-white">
            All Members
          </h1>
        </div>
        <div className="flex justify-between px-[16px]">
          <div className="flex gap-[16px]">
            <div className="flex w-fit h-[38px] rounded-[10px] overflow-hidden">
              <select className="w-fit leading-4 px-[20px] rounded-tl-[10px] rounded-bl-[10px] border-2 outline-none border-slate-200 dark:border-darkHover bg-gray-100 dark:bg-dark dark:text-white select-none ">
                <option value="All" className="">
                  All
                </option>
                <option value="Approved" className="">
                  Active
                </option>
                <option value="Pending" className="">
                  Pending
                </option>
                <option value="Rejected" className="">
                  Rejected
                </option>
              </select>
              <input
                type="search"
                className="w-[392px] border-y-2 border-r-2 border-l-none border-slate-200 dark:text-white dark:border-darkHover dark:bg-dark select-none outline-none"
              />
              <div className="w-[42px] h-[38px] bg-primaryBlue flex items-center justify-center cursor-pointer">
                <Image
                  src={searchIcon}
                  alt="searchIcon"
                  className="w-[24px] h-[38px]"
                />
              </div>
            </div>
            {userRole === "admin" ? (
              <div className="flex gap-[16px] px-[16px] border-l-[2px] border-slate-200 items-center">
                <button type="button" title="Approve users">
                  <AiFillCheckCircle
                    className="text-[24px] dark:text-gray-300"
                    onClick={() => {
                      handleGetAllSelectedMembers("approve");
                    }}
                  />
                </button>
                <button type="button" title="Remove users">
                  <FaTrash
                    className="text-[20px] dark:text-gray-300"
                    onClick={() => {
                      handleGetAllSelectedMembers("delete");
                    }}
                  />
                </button>
                <button
                  type="button"
                  title="Users recovery"
                  className="relative"
                  onClick={() => {
                    if (removedUsers.length > 0) {
                      setOpenDialogToRecycle(true);
                    }
                  }}
                >
                  <MdRecycling className="text-[24px] dark:text-gray-300" />
                  {removedUsers.length == 0 ? null : (
                    <div className="absolute w-[16px] h-[16px] bg-red-500 top-[-4px] right-[-6px] rounded-[50%]">
                      <p className="text-[10px] text-white text-center">
                        {removedUsers.length}
                      </p>
                    </div>
                  )}
                </button>
              </div>
            ) : null}
          </div>

          {userRole === "admin" ? (
            <div className="flex gap-[12px]">
              <Button
                textContent={"Add member"}
                icon={"add"}
                iconPosition={"left"}
                backgroundColor={"bg-green-700"}
                href={""}
                method={() => {}}
                tailwind={"text-white dark:shadow-darkPrimaryGreen"}
              ></Button>
              <Button
                textContent={"Import"}
                icon={"import"}
                iconPosition={"left"}
                backgroundColor={"bg-white"}
                href={""}
                method={() => {}}
                tailwind={
                  "text-black border-2 border-slate-200 dark:border-0 dark:shadow-darkPrimary"
                }
              ></Button>
            </div>
          ) : null}
        </div>

        <div>
          <div
            id="tableHeader"
            className="flex border-b-2 bg-slate-50 dark:bg-dark h-[50px] dark:text-white dark:border-darkHover"
          >
            {/* checkbox */}
            <div className="w-[48px] flex items-center justify-center">
              <input
                id="select_all"
                type="checkbox"
                value="Name"
                checked={selectAll}
                onChange={(e) => handleSelectAllChange(e)}
                className="outline-none border-1 border-slate-200 dark:border-darkHover rounded-[4px] focus:ring-offset-[shadow] cursor-pointer"
              />
            </div>
            {/*Name*/}
            <div className="w-[68px] flex items-center justify-center text-[12px] uppercase">
              <p>Name</p>
            </div>
            <div className="flex w-[276px] items-center justify-center text-[12px]"></div>
            {/* position */}
            <div className="w-[200px] flex p-[16px] items-center text-[12px] uppercase">
              <p>Position</p>
            </div>
            {/* department */}
            <div className="w-[180px] flex p-[16px] items-center text-[12px] uppercase">
              <p>Department</p>
            </div>
            {/* status */}
            <div className="w-[100px] flex p-[16px] items-center text-[12px] uppercase">
              <p>Status</p>
            </div>
          </div>

          {isFetchData ? (
            <>
              <div className="w-full">
                <LinearProgress />
              </div>
            </>
          ) : members.length === 0 ? null : (
            <div id="tableBody">
              {members.map((value, index) => (
                <MemberItem
                  key={index}
                  value={value}
                  selecteFunct={toggleMemberSelection}
                  refreshApi={handleGetAllMember}
                  getAllRemovedMember={getAllRemovedMember}
                ></MemberItem>
              ))}
            </div>
          )}
        </div>

        {isFetchData ? null : (
          <Pagination
            paramID={params.listID}
            countNumberOfPage={countListPage}
            increaseIndex={increaseIndex}
            sliceSetData={setMembers}
            data={allMemberData}
            route={"/members/list/"}
          ></Pagination>
        )}
        
      </div>

      {/* Approve Dialog */}
      {userRole == "admin" ? (
        <ApproveDialog
          openDialogToApprove={openDialogToApprove}
          setOpenDialogToApprove={setOpenDialogToApprove}
          selectedMembers={selectedMembers}
          handleApproveSelectedMembers={handleApproveSelectedMembers}
          handleCloseApproveDialog={handleCloseApproveDialog}
        ></ApproveDialog>
      ) : null}
      {/* Delete Diglog */}
      {userRole == "admin" ? (
        <RemoveDialog
          openDialogToDelete={openDialogToDelete}
          setOpenDialogToDelete={setOpenDialogToDelete}
          selectedMembers={selectedMembers}
          handleCloseDeleteDialog={handleCloseDeleteDialog}
          handleDelectSelectedMembers={handleDelectSelectedMembers}
        ></RemoveDialog>
      ) : null}
      {/* Users RecycleBin */}
      {userRole == "admin" ? (
        <MemberRecycleBinDialog
          setOpenDialogToRecycle={setOpenDialogToRecycle}
          openDialogToRecycle={openDialogToRecycle}
          removedUsers={removedUsers}
          handleRestoreUser={handleRestoreUser}
          setOpenDialogToDeleteOneUser={setOpenDialogToDeleteOneUser}
          setDeleteUser={setDeleteUser}
          handleRestoreAllUser={handleRestoreAllUser}
          setOpenDialogToDeleteAllRemovedUser={
            setOpenDialogToDeleteAllRemovedUser
          }
        ></MemberRecycleBinDialog>
      ) : null}
      {/* {Dialog ask admin make sure to delete user} */}
      {userRole == "admin" ? (
        <DeleteOutAUserDialog
          openDialogToDeleteOneUser={openDialogToDeleteOneUser}
          setOpenDialogToDeleteOneUser={setOpenDialogToDeleteOneUser}
          deleteUser={deleteUser!}
          handleDeleteUserOutOfBD={handleDeleteUserOutOfBD}
        ></DeleteOutAUserDialog>
      ) : null}
      {/* Dialog to ask admin make sure to delete all removed user! */}
      {userRole == "admin" ? (
        <DeleteAllRemovedUserDialog
          openDialogToDeleteAllRemovedUser={openDialogToDeleteAllRemovedUser}
          setOpenDialogToDeleteAllRemovedUser={
            setOpenDialogToDeleteAllRemovedUser
          }
          removedUsers={removedUsers}
          handleDeleteAllRemovedUser={handleDeleteAllRemovedUser}
        ></DeleteAllRemovedUserDialog>
      ) : null}
    </div>
  );
}

export default MemberList;
