"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import searchIcon from "@icon/page/member/list/search-outline.svg";
import checkIcon from "@icon/page/member/list/check-circle.svg";
import trashIcon from "@icon/page/member/list/trash.svg";

import MemberItem from "@/components/MemberItem/";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { deleteMemberInfo, getAllMemberInfo } from "@/apis/profile";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Button as MUIButton } from "@mui/material/";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { store } from "@/redux/store";
import { approveUser} from "@/apis/appUser";
import { memberPros, memberType } from "@/ultils/types";
import { dropdownMembers, openMemberList } from "@/redux/slices/sideBarControl";

type pageProps = {
  params: { listID: string };
};


function MemberList({ params }: pageProps) {
  const userRole = useSelector(
    (state: RootState) => state.userInfor.currentUser.role
  );
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
  const pages: { param: string; startIndex: number; endIndex: number }[] = [];
  const [isFetchData, setIsFetchData] = useState(true);
  console.log(members);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialogToDelete, setOpenDialogToDelete] = useState<boolean>(false);
  const [openDialogToApprove, setOpenDialogToApprove] =
    useState<boolean>(false);

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
      if (access_token) {
        const response = await getAllMemberInfo(access_token);
        const data = response.data.body;
        const currentUserRole = store.getState().userInfor.currentUser.role;        
        console.log(data);
        
        
        const filteredData = data
          .map((value: memberType) => {
            if (currentUserRole === "admin") {
              return {
                ...value,
                isSelected: false,
              };
            } else if (value.status.value === "Approved") {
              return {
                ...value,
                isSelected: false,
              };
            }
            return null;
          })
          .filter((value: memberPros) => value !== null);

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
  useEffect(() => {
    handleGetAllMember();
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

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await deleteMemberInfo(userId, access_token);
        toast.success(`Deleted user ${userEmail} successfully!`);
      }
      setOpenDialogToDelete(false);
      handleGetAllMember();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setOpenDialogToDelete(false);
        toast.error("Deleting failed!");
      }
    }
  };
  const handleApproveUser = async (userId:string, userEmail:string) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await approveUser(userId, access_token);
        console.log(response);
        toast.success(`Rejected user with email: ${userEmail}`);
      }
      handleGetAllMember();
      setOpenDialogToApprove(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setOpenDialogToApprove(false);
        toast.error("Rejecting failed!");
      }
    }
  };


  const handleDelectSelectedMembers = () => {
    selectedMembers.forEach((value) => handleDeleteUser(value.id, value.email));
  };
  const handleApproveSelectedMembers = () => {
    selectedMembers.forEach((item) => {
      if(item.status !== "Approved") {
        handleApproveUser(item.id, item.email);
      } else {
        handleCloseApproveDialog();
      }
    })
  }    

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
          <h1 className="font-bold text-[24px] select-none pt-[20px] px-[16px]">
            All Members
          </h1>
        </div>
        <div className="flex justify-between px-[16px]">
          <div className="flex gap-[16px]">
            <div className="flex w-fit h-[38px] rounded-[10px] overflow-hidden">
              <select className="w-fit leading-4 px-[20px] rounded-tl-[10px] rounded-bl-[10px] border-2 outline-none border-slate-200 bg-gray-100 select-none ">
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
                className="w-[392px] border-y-2 border-r-2 border-l-none border-slate-200 select-none outline-none"
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
              <div className="flex gap-[16px] px-[16px] border-l-[2px] border-slate-200">
                <Image
                  src={checkIcon}
                  alt="checkIcon"
                  className="w-[24px] h-[38px] cursor-pointer"
                  onClick={() => {
                    handleGetAllSelectedMembers("approve");
                  }}
                />
                <Image
                  src={trashIcon}
                  alt="trashIcon"
                  className="w-[24px] h-[38px] cursor-pointer"
                  onClick={() => {
                    handleGetAllSelectedMembers("delete");
                  }}
                />
              </div>
            ) : null}
          </div>

          {/* Approve Dialog */}
          <Dialog
            fullScreen={fullScreen}
            open={openDialogToApprove}
            onClose={handleClickOpenDeleteDialog}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              <p className="text-yellow-400 font-[600] ">
                Warning about approve users
              </p>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <p>Make sure you want to approve these users:</p>
                {selectedMembers.map((item, index) => (
                  <p key={index} className={`${item.status === "Pending" ? "text-yellow-400" : item.status === "Rejected" ? "text-red-700" : "text-green-500" }`}>
                    {item.email} 
                    <span className={`ml-[10px] font-[500] ${item.status == "Approved" ? "text-green-700" : null}`}>{ item.status == "Approved" ? "Approved" : null }</span>
                  </p>
                ))}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <MUIButton autoFocus onClick={handleCloseApproveDialog}>
                <p className="hover:text-green-600">Cancel</p>
              </MUIButton>
              <MUIButton
                onClick={() => {
                  handleApproveSelectedMembers();
                }}
                autoFocus
              >
                <p className="hover:text-red-600">Approve All</p>
              </MUIButton>
            </DialogActions>
          </Dialog>
          {/* Delete Diglog */}
          <Dialog
            fullScreen={fullScreen}
            open={openDialogToDelete}
            onClose={handleClickOpenDeleteDialog}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              <p className="text-red-600 font-[600] ">
                Warning about deleting users
              </p>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <p>Make sure you want to delete these users:</p>
                {selectedMembers.map((value, index) => (
                  <p key={index} className="text-green-600">
                    {value.email}
                  </p>
                ))}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <MUIButton autoFocus onClick={handleCloseDeleteDialog}>
                <p className="hover:text-green-600">Cancel</p>
              </MUIButton>
              <MUIButton
                onClick={() => {
                  handleDelectSelectedMembers();
                }}
                autoFocus
              >
                <p className="hover:text-red-600">Delete</p>
              </MUIButton>
            </DialogActions>
          </Dialog>

          {userRole === "admin" ? (
            <div className="flex gap-[12px]">
              <Button
                textContent={"Add member"}
                icon={"add"}
                iconPosition={"left"}
                backgroundColor={"bg-green-700"}
                href={""}
                method={() => {}}
                tailwind={"text-white"}
              ></Button>
              <Button
                textContent={"Import"}
                icon={"import"}
                iconPosition={"left"}
                backgroundColor={"bg-white"}
                href={""}
                method={() => {}}
                tailwind={"text-black border-2"}
              ></Button>
            </div>
          ) : null}
        </div>

        <div>
          <div
            id="tableHeader"
            className="flex border-b-2 bg-slate-50 h-[50px]"
          >
            {/* checkbox */}
            <div className="w-[48px] flex items-center justify-center">
              <input
                id="select_all"
                type="checkbox"
                value="Name"
                checked={selectAll}
                onChange={(e) => handleSelectAllChange(e)}
                className="outline-none border-1 border-slate-200 rounded-[4px] focus:ring-offset-[shadow] cursor-pointer"
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
          ) : members.length === 0 ? null : 
          (
            <div id="tableBody">
              {members.map((value, index) => (
                <MemberItem
                  key={index}
                  value={value}
                  selecteFunct={toggleMemberSelection}
                  refreshApi={handleGetAllMember}
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
    </div>
  );
}

export default MemberList;
