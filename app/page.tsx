"use client"
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

function Home() {
    const isOpenSlidebar = useSelector((state: RootState) => state.app.isOpenSlidebar);
    const isMouseVisit = useSelector((state: RootState) => state.app.isMouseVisit);

    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>
            <div >
                <h1 className='text-center mt-[100px] text-[50px] font-bold text-blue-500 dark:text-gray-500'>FU - DEVER</h1>
                <h1 className='text-center mt-[20px] text-[20px] font-bold text-blue-500 dark:text-gray-500'>Welcome!</h1>
            </div>
        </div>
    )
}

export default Home
