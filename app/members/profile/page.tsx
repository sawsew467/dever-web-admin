"use client"
import React, { ReactNode, useEffect } from 'react'
import { useAppContext } from '@/app/context/AppContext';
import Image from 'next/image';
import Button from '@/components/Button';

import avatar from '@image/page/member/profile/Thang.png'
import briefcaseIcon from '@icon/page/member/profile/briefcase.svg'
import calendarIcon from '@icon/page/member/profile/calendar-month.svg'
import facebookIcon from '@icon/page/member/profile/facebook.svg'
import githubIcon from '@icon/page/member/profile/github.svg'
import youtubeIcon from '@icon/page/member/profile/youtube.svg'
import branchIcon from '@icon/page/member/profile/code-merge.svg'
import projectImage from '@image/page/notification/list/thumbnail.png'

function Profile() {
    const {isOpenSlidebar, isMouseVisit} = useAppContext();

    const userData = {
        id: 0,
        firstName: "Tran Van",
        lastName: "Bao Thang",
        about: "<p>Dedicated, passionate, and accomplished Full Stack Developer with 9+ years of progressive experience working as an Independent Contractor for Google and developing and growing my educational social network that helps others learn programming, web design, game development, networking.<br/><br/>Aside from my job, I like to create and contribute to open source projects. That helps me to learn a ton of new stuff, grow as a developer and support other open source projects.</p>",
        birthday: "19-02-2002",
        homeAddress: "Trieu Son, Trieu Phong, Quang Tri",
        position: "President",
        role: "Front-End developer",
        major: "Software Engineering",
        education: "FPT University",
        workHistory: "NAPA Global, Google , Facebook",
        deparment: "Board of Directors",
        email: "thangtvbde170145@fpt.edu.vn",
        phone: "0828 828 497",
        joinDate: "12-09-2021",
        socialMedia: [
            {
                platform: "facebook",
                link: "#"
            },
            {
                platform: "github",
                link: "#"
            },
            {
                platform: "youtube",
                link: "#"
            }
        ],
        skills: ["#HTML5", "#CSS3", "#Javascript", "#ReactJS", "#NextJS", "#ExpressJS", "#MongoDB"],
        hobbies: ["#Soccer", "#Coding", "#Foods", "#Travel", "#Books", "#Chess", "#Game"],
        project: [
            {
                id: 0,
                img: "Image",
                title: "Noteworthy technology acquisitions 2021",
                desc: "<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>",
                link: "https://github.com/sawsew467/dever-web-frontend",
            },
            {
                id: 1,
                img: "Image",
                title: "Noteworthy technology acquisitions 2021",
                desc: "<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>",
                link: "https://github.com/sawsew467/dever-web-frontend",
            },
            {
                id: 2,
                img: "Image",
                title: "Noteworthy technology acquisitions 2021",
                desc: "<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>",
                link: "https://github.com/sawsew467/dever-web-frontend",
            },
        ],

    }

    const renderHtmlString = (htmlString: string) => {
      return <div dangerouslySetInnerHTML={{__html : htmlString}}></div>
    }

    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>
            <div className=' py-[20px] px-[16px] flex gap-[20px] flex-col select-none'>
                <div>
                    <h2 className='text-[24px] font-[700]'><span className='text-blue-500'>Your&apos;s</span> Profile</h2>
                </div>
                <div className='flex w-[100%] flex-col gap-[16px] lg:flex-row'>
                    <div className='w-full lg:w-[32%] flex flex-col gap-[16px]'>
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
                            <div className='flex flex-col'>
                                <div className='flex flex-row'><span className='font-[400] text-[16px]'>Email address:</span></div>
                                <div className='flex flex-row'><span className='font-[700] text-[16px]'>{userData.email}</span></div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row'><span className='font-[400] text-[16px]'>Home address:</span></div>
                                <div className='flex flex-row'><span className='font-[700] text-[16px]'>{userData.homeAddress}</span></div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row'><span className='font-[400] text-[16px]'>Phone number:</span></div>
                                <div className='flex flex-row'><span className='font-[700] text-[16px]'>{userData.phone}</span></div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row'><span className='font-[700] text-[20px]'>Social media:</span></div>
                                <div className='flex flex-row gap-[16px]'>
                                    <Image src={facebookIcon} alt='facebookIcon'></Image>
                                    <Image src={githubIcon} alt='githubIcon'></Image>
                                    <Image src={youtubeIcon} alt='youtubeIcon'></Image>
                                </div>
                            </div>
                        </div>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]'>
                            <div>
                                <h3 className='font-[700] text-[24px]'>Skills</h3>
                            </div>
                            <div className='flex flex-wrap gap-[8px]'>
                                {
                                    userData?.skills.map((item, index) => (
                                        
                                        <p key={index} className='py-[2px] px-[12px] bg-green-100 text-green-800 rounded-[8px] text-[14px] font-[600]'>{item.replace('#', '')}</p>
                                        
                                    ))
                                }
                            </div>
                        </div>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]'>
                            <div>
                                <h3 className='font-[700] text-[24px]'>Hobbies</h3>
                            </div>
                            <div className='flex flex-wrap gap-[8px]'>
                                {
                                    userData?.hobbies.map((item, index) => (
                                        
                                        <p key={index} className='py-[2px] px-[12px] bg-purple-100 text-purple-800 rounded-[8px] text-[14px] font-[600]'>{item.replace('#', '')}</p>
                                       
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-[67%] flex flex-col gap-[16px]'>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]'>
                            <div><h3 className='font-[700] text-[24px]'>General information</h3></div>
                            <div className='flex flex-col gap-[8px]'>
                                <h4 className='font-[600] text-[20px]'>About me</h4>
                                <div className='font-[400] text-[16px]' id='aboutMember'>
                                    {renderHtmlString(userData.about)}
                                </div>
                            </div>
                            <div className='flex flex-row gap-[80px]'>
                                <div className='flex flex-col gap-[20px]'>
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row'><span className='font-[400] text-[16px]'>Join date:</span></div>
                                        <div className='flex flex-row'><span className='font-[700] text-[16px]'>{userData.joinDate}</span></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row'><span className='font-[400] text-[16px]'>Position</span></div>
                                        <div className='flex flex-row'><span className='font-[700] text-[16px]'>{userData.position}</span></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row'><span className='font-[400] text-[16px]'>Department:</span></div>
                                        <div className='flex flex-row'><span className='font-[700] text-[16px]'>{userData.deparment}</span></div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-[20px]'>
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row'><span className='font-[400] text-[16px]'>Education:</span></div>
                                        <div className='flex flex-row'><span className='font-[700] text-[16px]'>{userData.education}</span></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row'><span className='font-[400] text-[16px]'>Major</span></div>
                                        <div className='flex flex-row'><span className='font-[700] text-[16px]'>{userData.major}</span></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row'><span className='font-[400] text-[16px]'>Work history:</span></div>
                                        <div className='flex flex-row'><span className='font-[700] text-[16px]'>{userData.workHistory}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]'>
                            <div><h3 className='font-[700] text-[24px] '>My projects</h3></div>
                            <div className=' flex flex-col gap-[20px]'>
                                {
                                    userData?.project.map((item, index) => {
                                        return (
                                        
                                                <div className='flex flex-row shadow-primary rounded-[16px] h-fit overflow-hidden relative' key={index}>
                                                    <div className='w-[30%] h-[100%] absolute'>
                                                        <Image src={projectImage} alt='project' className='w-[100%] h-full object-cover'></Image>
                                                    </div>
                                                    <div className='lg:w-[70%] w-[100%] p-[20px] flex flex-col gap-[16px] ml-[30%]'>
                                                        <div className='flex flex-col gap-[8px]'>
                                                            <h3 className='font-[700] text-[24px]'>{item.title}</h3>
                                                            <div className='text-[16px] font-[400] text-gray-500 h-[48px] overflow-hidden'>
                                                                {renderHtmlString(item.desc)}
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-[8px]'><Image src={branchIcon} alt='codeMerge'></Image><a href={item.link}
                                                            className='text-[16px]  font-[400px]'
                                                        >{item.link}</a></div>
                                                        <div>
                                                        <Button 
                                                            textContent={'Demo'} 
                                                            icon={'arrowRight'} 
                                                            iconPosition={'right'} 
                                                            backgroundColor={'bg-blue-700'} 
                                                            href={item.link} 
                                                            method={() => {}} 
                                                            tailwind={'text-white'}
                                                        
                                                        ></Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
