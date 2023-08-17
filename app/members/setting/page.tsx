"use client"
import React from 'react'
import { useAppContext } from '@/app/context/AppContext';
import Link from 'next/link';

function SettingList() {
    const {isOpenSlidebar, isMouseVisit} = useAppContext();

    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>
            <div>
                <h1 className='text-center mt-[100px] text-[30px] font-bold text-black dark:text-gray-500'>This is member list page</h1>
                <h1 className='text-center mt-[10px] mb-[20px] text-[20px] font-bold text-black dark:text-gray-500'>Only the owner accountss profile can be set</h1>
                <div className='text-center flex flex-col '>
                    <Link href={"/members/setting/1"} >Go to member profile setting 1</Link>
                    <Link href={"/members/setting/2"} >Go to member profile setting 2</Link>
                </div>
                {/* Write page content here */}
            </div>
        </div>
    )
}

export default SettingList
