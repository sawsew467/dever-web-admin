import React from 'react'
import Image from "next/image";
import menu from "../../assets/images/header/menu.svg"
import logo from "../../assets/images/header/logo.svg"
import moon from "../../assets/images/header/moon.svg"
import avatar from "../../assets/images/header/avatar.svg"
function index() {
  return (
    <div className="left-0 right-0 top-0 fixed z-[1] bg-[#ffffff] backdrop-blur-sm">
      <div className="   h-[72px] flex justify-between items-center px-[32px]">
      <div className='flex'>
        <Image
            src={menu}
            alt="Picture of the author"
            />
        <Image
            src={logo}
            alt="Picture of the author"
            className='ml-[40px]'
            />
      </div>
      <div className='flex'>
      <Image
            src={moon}
            alt="Picture of the author"
            />
       <Image
            src={avatar}
            alt="Picture of the author"
            className='ml-[20px]'
            />
        <p className='border-l-[1px] border-[#E5E7EB] pl-[20px] ml-[20px] text-[#1C64F2]'>logout</p>
      </div>
      </div>
    </div>
  )
}

export default index