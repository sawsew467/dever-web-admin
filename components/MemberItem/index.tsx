"use client"
import React from 'react'
import Image from 'next/image'
import avatar from '@image/page/member/list/Thang.png'
import Link from 'next/link'

import Button from '@component/Button'

interface memberPros {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    position: string,
    department: string,
    status: string,
}

interface IPros {
    value: memberPros
}

function MemberItem({value}: IPros) {
    return (
        <div className='flex justify-between border-b-2 h-[78px]'>
        <div className='flex'>
            <div className='w-[48px] flex items-center justify-center'>
                <input type="checkbox" value="" id='' className='outline-none border-1 border-slate-200 rounded-[4px] focus:ring-offset-[shadow] cursor-pointer'/>
            </div>
            {/*Name*/}
            <div className='w-[68px] flex items-center justify-center text-[12px] uppercase'>
                <div className='w-[32px] h-[32px] rounded-[50%] overflow-hidden object-fill'>
                    <Image
                    src={avatar}
                    alt='avatar'
                    />
                </div>
            </div>
            <div className="flex flex-col w-[276px] pt-[16px] px-[16px] text-[12px]">
                <h3 className='text-[16px] font-[600]'>{value.firstName + " " +value.lastName}</h3>
                <p className='text-[14px]'>{value.email}</p>
            </div>
            {/* position */}
            <div className='w-[200px] flex p-[16px] items-center text-[16px] font-[600]'>
                <p>{value.position}</p>
            </div>
            {/* department */}
            <div className='w-[180px] flex p-[16px] items-center text-[14px] font-[600]'>
                <p>{value.department}</p>
            </div>
            {/* status */}
            <div className='w-[100px] flex p-[16px] items-center text-[12px]'>
                <p className={`py-[2px] px-[10px]  rounded-[6px] font-[500] 
                ${value.status === "Active" ? "bg-primaryGreenBland text-green-800" : 
                    value.status === "Pending" ? "bg-primaryYellowBland text-primaryBrown" : 
                        "bg-primaryRedBland text-primaryRed"}`}>{value.status}</p>
            </div> 
        </div>

        <div className='flex h-[78px]'>
            <div className='flex gap-[16px] justify-center items-center p-[16px]'>
                <Button
                href={`/members/setting/${value.id}`}
                method={()=>{}}
                icon='edit'
                backgroundColor='bg-blue-700'
                iconPosition='left'
                textContent='Edit'
                tailwind='text-white'
                ></Button>
                <Button
                href=''
                method={()=>{}}
                icon='delete'
                backgroundColor='bg-red-700'
                iconPosition='left'
                textContent='Delete'
                tailwind='text-white'
                ></Button>
            </div>
            <div className='p-[16px] flex justify-center items-center text-primaryBlue text-[14px]'>
                <Link href={`/members/profile/${value.id}`}>View Profile</Link>
            </div>
        </div>
    </div>



    )
}

export default MemberItem
