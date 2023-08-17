"use client"
import React from 'react'
import {useAppContext } from '@/app/context/AppContext'
import Link from 'next/link';

function View() {
    const {isOpenSlidebar, isMouseVisit} = useAppContext();

    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>
            <div>
                <h1 className='text-center mt-[100px] text-[30px] font-bold text-black dark:text-gray-500'>This is view notification page</h1>
                {/* Write page content here */}
                <div className='text-center flex flex-col '>
                    <Link href={"/notifications/views/1"} >View Detail Notification 1</Link>
                    <Link href={"/notifications/views/2"} >View Detail Notification 2</Link>
                    <Link href={"/notifications/views/3"} >View Detail Notification 3</Link>
                </div>
            </div>
        </div>
    )
}

export default View
