"use client";
import React from 'react'
import Image from "next/image";
import bell from "../../assets/images/sidebar/bell.svg"
import chevrondown from "../../assets/images/sidebar/chevron-down.svg"
import usersgroup from "../../assets/images/sidebar/users-group.svg"
import gridplus from '../../assets/images/sidebar/grid-plus.svg'
import { useState } from 'react';
import { isBlock } from 'typescript';
import { Flamenco } from 'next/font/google';
function index() {
   const [isDropdownNotifications,setIsDropdownNotifications]= useState(false)
   const [isDropdownMembers,setIsDropdownMembers]= useState(false)
   const [isDropdownBlogs,setIsDropdownBlogs]= useState(false)
   const handleDropdownNotifications = ()=>{
      setIsDropdownNotifications(!isDropdownNotifications)
      setIsDropdownBlogs(false)
      setIsDropdownMembers(false)
   }
   const handleDropdownMembers = ()=>{
      setIsDropdownMembers(!isDropdownMembers)
      setIsDropdownNotifications(false)
      setIsDropdownBlogs(false)
   }  
    const handleDropdownBlogs = ()=>{
      setIsDropdownBlogs(!isDropdownBlogs)
      setIsDropdownMembers(false)
      setIsDropdownNotifications(false)
   }

  return (
    <>
<aside id="default-sidebar" className="fixed top-[72px] left-0 z-40  h-screen transition-transform -translate-x-full sm:translate-x-0 " aria-label="Sidebar">
   <div className="h-full bg-[#ffffff] ">
      <ul className="w-[255px] ml-[12px] mr-[12px] ">
      <li className='pt-[16px]'>
        <button
         type='button'
         onClick={handleDropdownNotifications}
         //  className='flex pt-[16px] px-[8px] w-[255px] text-gray-900 items-center justify-between'
          className={isDropdownNotifications?"flex px-[8px] w-[255px] text-gray-900 items-center justify-between py-[6px] bg-gray-100 rounded-[8px]":"flex  px-[8px] w-[255px] text-gray-900 items-center justify-between"}
          >
         <div className='flex items-center'>
        <Image
            src={bell}
            alt="Picture of the author"
            className='w-[24px] h-[24px] '
            />
        <span className="pl-[12px] text-[16px] ">Notifications</span>
            </div>
            <div className={isDropdownNotifications?"rotate-180":""}>

                  <Image
            src={chevrondown}
            alt="Picture of the author"
            className='r-0'
            
            />
            </div>
        </button>
        <ul id="dropdown-Notifications"  
        className={isDropdownNotifications?"pt-[6px]":"hidden"}
        >
                  <li>
                     <a href="#" className="flex items-center w-full  text-gray-900 transition duration-75 rounded-lg pl-11 group ">View notifications</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center w-full pt-[16px] text-gray-900 transition duration-75 rounded-lg pl-11 group ">Create notification</a>
                  </li>

            </ul>
      </li>
      <li className='pt-[16px]'>
        <button
         type='button'
         onClick={handleDropdownMembers}
         //  className='flex pt-[16px] px-[8px] w-[255px] text-gray-900 items-center justify-between'
          className={isDropdownMembers?"flex px-[8px] w-[255px] text-gray-900 items-center justify-between py-[6px] bg-gray-100 rounded-[8px]":"flex  px-[8px] w-[255px] text-gray-900 items-center justify-between"}
          >
         <div className='flex items-center'>
        <Image
            src={usersgroup}
            alt="Picture of the author"
            className='w-[24px] h-[24px] '
            />
        <span className="pl-[12px] text-[16px] ">Members</span>
            </div>
            <div className={isDropdownMembers?"rotate-180":""}>

                  <Image
            src={chevrondown}
            alt="Picture of the author"
            className='r-0'
            
            />
            </div>
        </button>
        <ul id="dropdown-Notifications"  
        className={isDropdownMembers?"pt-[6px]":"hidden"}
        >
                  <li>
                     <a href="#" className="flex items-center w-full  text-gray-900 transition duration-75 rounded-lg pl-11 group ">Member List</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center w-full pt-[16px] text-gray-900 transition duration-75 rounded-lg pl-11 group ">Profile</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center w-full pt-[16px] text-gray-900 transition duration-75 rounded-lg pl-11 group ">Settings</a>
                  </li>
            </ul>
      </li>
      <li className='pt-[16px]'>
        <button
         type='button'
         onClick={handleDropdownBlogs}
         //  className='flex pt-[16px] px-[8px] w-[255px] text-gray-900 items-center justify-between'
          className={isDropdownBlogs?"flex px-[8px] w-[255px] text-gray-900 items-center justify-between py-[6px] bg-gray-100 rounded-[8px]":"flex  px-[8px] w-[255px] text-gray-900 items-center justify-between"}
          >
         <div className='flex items-center'>
        <Image
            src={gridplus}
            alt="Picture of the author"
            className='w-[24px] h-[24px] '
            />
        <span className="pl-[12px] text-[16px] ">Blogs</span>
            </div>
            <div className={isDropdownBlogs?"rotate-180":""}>

                  <Image
            src={chevrondown}
            alt="Picture of the author"
            className='r-0'
            
            />
            </div>
        </button>
        <ul id="dropdown-Notifications"  
        className={isDropdownBlogs?"pt-[6px]":"hidden"}
        >
                  <li>
                     <a href="#" className="flex items-center w-full  text-gray-900 transition duration-75 rounded-lg pl-11 group ">Blog list</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center w-full pt-[16px] text-gray-900 transition duration-75 rounded-lg pl-11 group ">Your blog</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center w-full pt-[16px] text-gray-900 transition duration-75 rounded-lg pl-11 group ">Create blog</a>
                  </li>
            </ul>
      </li>
      
      
      </ul>
   </div>
</aside>


    </>
  )
}

export default index