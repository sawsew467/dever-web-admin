"use client"
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/app/context/AppContext';
import Image from 'next/image';

import searchIcon from '@icon/page/member/list/search-outline.svg'
import checkIcon from '@icon/page/member/list/check-circle.svg'
import trashIcon from '@icon/page/member/list/trash.svg'

import MemberItem from '@/components/MemberItem/';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';

interface pageProps {
    params: {listID: string};
}

function MemberList({params}: pageProps) {
    const {isOpenSlidebar, isMouseVisit} = useAppContext();

    // fake data
    const memberList = [
        {
            id: 1,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 2,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Pending",
        },
        {
            id: 3,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Expired",
        },
        {
            id: 4,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 5,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 6,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Expired",
        },
        {
            id: 7,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 8,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 9,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 10,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Pending",
        },
        {
            id: 11,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Expired",
        },
        {
            id: 12,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Pending",
        },
        {
            id: 13,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Pending",
        },
        {
            id: 14,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 15,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 16,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 17,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 18,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Pending",
        },
        {
            id: 19,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
        {
            id: 20,
            firstName: "Tran Van",
            lastName: "Bao Thang",
            email: "thangtvbde170145@fpt.edu.vn",
            position: "President",
            department: "Board of Directors",
            status: "Active",
        },
    ]

    const increaseIndex = 8;
    const [members, setMembers] = useState(memberList.slice(0, increaseIndex+1));
    const [countListPage, setCountListPage] = useState(Math.ceil(memberList.length/increaseIndex));
    const pages: { param: string; startIndex: number; endIndex: number; }[] = [];

    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>

            <div className='w-[100%] flex flex-col gap-[20px] select-none'>
                <div>
                    <h1 className='font-bold text-[24px] select-none pt-[20px] px-[16px]'>All Members</h1>
                </div>
                <div className='flex justify-between px-[16px]'>

                    <div className='flex gap-[16px]'>
                        <div className='flex w-fit h-[38px] rounded-[10px] overflow-hidden'>
                            <select className='w-[84px] leading-4 px-[20px] rounded-tl-[10px] rounded-bl-[10px] border-2 outline-none border-slate-200 bg-gray-100 select-none '>
                                <option value="All" className=''>All</option>
                                <option value="All" className=''>All</option>
                                <option value="All" className=''>All</option>
                            </select>
                            <input type="search" className='w-[392px] border-y-2 border-r-2 border-l-none border-slate-200 select-none outline-none'/>
                            <div className='w-[42px] h-[38px] bg-primaryBlue flex items-center justify-center cursor-pointer'>
                                <Image 
                                src={searchIcon}
                                alt='searchIcon'
                                className='w-[24px] h-[38px]'
                                />
                            </div>
                        </div>
                        <div className='flex gap-[16px] px-[16px] border-l-[2px] border-slate-200'>
                            <Image 
                                src={checkIcon}
                                alt='checkIcon'
                                className='w-[24px] h-[38px] cursor-pointer'
                            />
                            <Image 
                                src={trashIcon}
                                alt='trashIcon'
                                className='w-[24px] h-[38px] cursor-pointer'
                            />
                        </div>
                    </div>
                    <div className='flex gap-[12px]'>
                        <Button 
                            textContent={'Add member'} 
                            icon={'add'} 
                            iconPosition={'left'} 
                            backgroundColor={'bg-green-700'} 
                            href={''} 
                            method={() => {}} 
                            tailwind={'text-white'}
                        ></Button>
                        <Button
                            textContent={'Import'} 
                            icon={'import'} 
                            iconPosition={'left'} 
                            backgroundColor={'bg-white'} 
                            href={''} 
                            method={() => {}} 
                            tailwind={'text-black border-2'}
                        ></Button>
                    </div>
                </div>

                <div>
                    <div id='tableHeader' className='flex border-b-2 bg-slate-50 h-[50px]'>
                        {/* checkbox */}
                        <div className='w-[48px] flex items-center justify-center'>
                            <input type="checkbox" value="Name" className='outline-none border-1 border-slate-200 rounded-[4px] focus:ring-offset-[shadow] cursor-pointer'/>
                        </div>
                        {/*Name*/}
                        <div className='w-[68px] flex items-center justify-center text-[12px] uppercase'>
                            <p>Name</p>
                        </div>
                        <div className="flex w-[276px] items-center justify-center text-[12px]">
                        </div>
                        {/* position */}
                        <div className='w-[200px] flex p-[16px] items-center text-[12px] uppercase'>
                            <p>Position</p>
                        </div>
                        {/* department */}
                        <div className='w-[180px] flex p-[16px] items-center text-[12px] uppercase'>
                            <p>Department</p>
                        </div>
                        {/* status */}
                        <div className='w-[100px] flex p-[16px] items-center text-[12px] uppercase'>
                            <p>Status</p>
                        </div>
                    </div>

                    <div id='tableBody'>
                        {
                            members.map((value, index) => (
                                <MemberItem key={index}
                                value={value}
                                ></MemberItem>
                            ))
                        }
                    </div>
                </div>

                <Pagination 
                paramID={params.listID} 
                countNumberOfPage={countListPage} 
                pages={pages} 
                increaseIndex={increaseIndex} 
                sliceSetData={setMembers} 
                data={memberList} 
                route={'/members/list/'}
                ></Pagination>
            </div>
        </div>
    )
}

export default MemberList
