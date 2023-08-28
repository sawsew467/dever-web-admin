"use client"
import React, { useState } from 'react'
import { useAppContext } from '@/app/context/AppContext';

import BrowseFile from '@/components/BrowseFile';
import EditorLarge from '@/components/EditorLarge';

function CreateNotification() {
    const {isOpenSlidebar, isMouseVisit} = useAppContext();

    const [importedImage, setImportedImage] = useState<File | null>(null);
    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>
            <div className='py-[20px] px-[16px] flex flex-col gap-[20px]'>
                <div>
                    <h1 className='font-[700] text-[24px] select-none'>Create notification</h1>
                </div>

                <div className='flex flex-col gap-[20px]'>
                    <div className='flex flex-col gap-[8px]'>
                        <h4 className='select-none font-[500]'>Notification title:</h4>
                        <input type="text" placeholder='Write title here' className='border-2 border-gray-300 rounded-[12px] w-full'/>
                    </div>
                    <div>
                        <BrowseFile 
                        formTitle='Notification thumbnail'
                        fileStorage={importedImage} 
                        setFileStorage={setImportedImage}
                        ></BrowseFile>
                    </div>
                    <div>
                        <EditorLarge
                        formTitle='Notification content'
                        ></EditorLarge>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateNotification
