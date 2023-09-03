import React, { useState } from 'react'
import UnlinkButton from '../UnlinkButton'
import EditorNormal from '../EditorNormal';

function AboutUser():JSX.Element {
    const fakeData = {
        about: `<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span>Dedicated, passionate, and accomplished</span><b><strong class="PlaygroundEditorTheme__textBold" style="color: rgb(74, 144, 226);"> Full Stack Developer</strong></b><b><strong class="PlaygroundEditorTheme__textBold"> </strong></b><i><b><strong class="PlaygroundEditorTheme__textBold PlaygroundEditorTheme__textItalic">with 9+ years of progressive experience</strong></b></i><span> working as an Independent Contractor for Google and developing and growing my educational social network that helps others learn programming, web design, game development, networking.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br><span>Aside from my job, I like to create and contribute to open source projects. That helps me to learn a ton of new stuff, grow as a developer and support other open source projects.</span></p>`
    }
    const [isEdit,setIsEdit] = useState<boolean>(false);
    const [isSave, setIsSave] = useState<boolean>(false);
    const [htmlString, setHtmlString] = useState<string>(fakeData.about);
    
    return (
        <div className='flex flex-col gap-[20px] p-[24px] shadow-primary rounded-[10px]'> 
            <h3 className='font-[700] text-[24px] select-none '>About you</h3>
            <div dangerouslySetInnerHTML={{__html: htmlString}}></div>
            <div>
                <UnlinkButton 
                textContent={'Edit bio'} 
                icon={'edit'} 
                iconPosition={'left'} 
                backgroundColor={'bg-blue-700'} 
                method={() => {setIsEdit(isEdit => !isEdit)}} 
                tailwind={'text-white'}
                ></UnlinkButton>
            </div>                
            
                {
                    isEdit ? <>
                        <EditorNormal 
                        htmlString={htmlString} 
                        setHtmlString={setHtmlString} 
                        isNeedSave={true}                                            
                        />
                    </> : null
                }
            
        </div>
    )
}

export default AboutUser
