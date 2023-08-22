"use client"
import React from 'react'
import { useAppContext } from '@/app/context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import avatar from '@image/page/member/profile/Thang.png'
import briefcaseIcon from '@icon/page/member/profile/briefcase.svg'
import calendarIcon from '@icon/page/member/profile/calendar-month.svg'

function Profile() {
    const {isOpenSlidebar, isMouseVisit} = useAppContext();

    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>
            <div className=' py-[20px] px-[16px] flex gap-[20px] flex-col select-none'>
                <div>
                    <h2 className='text-[24px] font-[700]'><span className='text-blue-500'>Your&apos;s</span> Profile</h2>
                </div>
                <div className='flex w-[100%] flex-row gap-[16px]'>
                    <div className='w-[32%] flex flex-col gap-[16px]'>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[16px]'>
                            <div className='flex flex-col gap-[8px]'>
                                <div className='w-[120px] h-[120px] object-cover overflow-hidden rounded-[16px]'>
                                    <Image
                                    src={avatar}
                                    alt='avatar'/>
                                </div>
                                <h1 className='text-[24px] font-[700]'>Tran Van Bao Thang</h1>
                            </div>
                            <div className='flex flex-col gap-[8px] '>
                                <div className='flex flex-row gap-[12px]'><Image src={briefcaseIcon} alt='briefcaseIcon'/><span className='font-[400] text-[16px]'>Front-End Developer</span></div>
                                <div className='flex flex-row gap-[12px]'><Image src={calendarIcon} alt='calendarIcon'/><span className='font-[400] text-[16px]'>19-02-2002</span></div>
                            </div>
                        </div>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px]'>Left</div>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px]'>Left</div>
                    </div>
                    <div className='w-[67%] flex flex-col gap-[16px]'>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px]'>right</div>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px]'>right</div>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px]'>right</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
