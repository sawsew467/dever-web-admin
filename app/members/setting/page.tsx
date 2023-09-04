"use client"
import React, {useState, useRef} from 'react'
import { useAppContext } from '@/app/context/AppContext';
import AvatarChanging from '@component/SettingElement/AvatarChanging';
import AboutUser from '@component/SettingElement/AboutUser';
import ContactInfomation from '@/components/SettingElement/ContactInfomation';
import GeneralInformation from '@/components/SettingElement/GeneralInformation';

function SettingList() {
    const {isOpenSlidebar, isMouseVisit} = useAppContext();

    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>
            <div className='py-[20px] px-[16px] flex flex-col gap-[20px]'>
                <div className=''>
                    <h3 className='font-[700] text-[24px] '><span className='text-blue-500'>Your&apos;s</span> profile setting</h3>
                </div>
                <div className='flex flex-col lg:flex-row gap-[16px]'>
                    <div className='flex flex-col gap-[16px] w-full lg:w-[40%] h-fit select-none'>
                        <AvatarChanging/>
                        <ContactInfomation/>
                    </div>
                    <div className='flex flex-col gap-[16px] w-full lg:w-[60%] h-fit' >
                        <AboutUser/>
                        <GeneralInformation/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingList
