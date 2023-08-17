"use client"
import React from 'react'
import { useAppContext } from '@/app/context/AppContext';


function MemberList() {
    const {isOpenSlidebar, isMouseVisit} = useAppContext();

    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>
            <div >
                <h1 className='text-center mt-[100px] text-[50px] font-bold text-blue-500 dark:text-gray-500'>FU - DEVER</h1>
                <h1 className='text-center mt-[20px] text-[20px] font-bold text-blue-500 dark:text-gray-500'>Admin Website</h1>
                <h1 className='text-center mt-[20px] text-[20px] font-bold text-blue-500 dark:text-gray-500'>Sign In and Log In function will be here</h1>
            </div>
        </div>
    )
}

export default MemberList
