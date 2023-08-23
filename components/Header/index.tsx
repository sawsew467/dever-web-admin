"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import menu from "@icon/components/header/menu.svg"
import logo from "@icon/components/header/logo.svg"
import moon from "@icon/components/header/moon.svg"
import avatar from "@icon/components/header/avatar.svg"
import { useAppContext } from '@/app/context/AppContext';
import Link from 'next/link';
function Header() {
  const {isDarkMode, setIsOpenSlidebar, setIsDarkMode} = useAppContext();

  const handleOpenMenu = () => {
    setIsOpenSlidebar(isOpenSlidebar => !isOpenSlidebar);
  }

  const handleSetDarkMode = () => {
    setIsDarkMode(isDarkMode => !isDarkMode);
    const html = document.documentElement;
    html.classList.toggle('dark')
  }
  return (
    <div className="left-0 right-0 top-0 fixed z-[1] bg-[#ffffff] backdrop-blur-sm">
      <div className="h-[72px] flex justify-between items-center px-[32px] border-b-2">
      <div className='flex items-center'>
        <Image
            src={menu}
            alt="Picture of the author"
            className='cursor-pointer w-[50px] h-[50px] p-2 rounded-md hover:bg-gray-100 transition duration-200'
            onClick={handleOpenMenu} 
            />
        <div>
          <Link href={"/"}>
            <Image
              src={logo}
              alt="Picture of the author"
              className='ml-[40px]'
              />
            </Link>
        </div>
      </div>
      <div className='flex items-center'>
      <Image
            id='darkmodeToggle'
            src={moon}
            alt="Picture of the author"
            className='cursor-pointer w-[50px] h-[50px] p-2 rounded-md hover:bg-gray-100 transition duration-200'
            onClick={handleSetDarkMode}
            />
       <Image
            src={avatar}
            alt="Picture of the author"
            className='ml-[20px] mr-[-4px] cursor-pointer w-[50px] h-[50px] p-[10px] rounded-md hover:bg-gray-100 transition duration-200'
            />
        <div className='border-l-[1px] ml-[20px] border-[#E5E7EB] cursor-pointer select-none '>
          <p className=' ml-[16px] mr-[-4px] px-2 py-2 hover:bg-gray-100 transition duration-200 rounded-md  text-[#1C64F2]'>Log out</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Header