import React, {useRef, useState} from 'react'
import Image from 'next/image'
import Avatar from '@image/page/member/profile/Thang.png'
import UnlinkButton from '@component/UnlinkButton'

import axios from 'axios';

type TPros = {
    imageState: File | null;
    setImageState: React.Dispatch<React.SetStateAction<File | null>>;
}

function AvatarChanging():JSX.Element {
    const fileInputRef = useRef(null);
    const [imageState, setImageState] = useState<File | null>(null);
    const [imageSource, setImageSource] = useState(undefined);
    console.log(imageSource);
    
    const handleBrowseImage = () => {
        document.getElementById("imageImporter")?.click();
    }
    const handleOnChangeSeleteImage = (event:React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];        
        if(file && isValidFileType(file)) {
            setImageState(file);
        } else {
            setImageState(null);
            alert("Invalid file type!");
        }
    }
    const isValidFileType = (file: File) => {
        const acceptedTypes = [
            'image/png',
            'image/jpeg',
            'image/gif',
            'image/jpg',
            'image/webp'
          ];
        return acceptedTypes.includes(file.type);
    }
    const handleSubmitImage = async (file: File): Promise<string | null | undefined> => { 
        const CLOUD_NAME = "dy1uuo6ql";
        const UPLOAD_PRESET = "fu-dever";
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);
            
            const responseData = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
            setImageSource(responseData.data.secure_url);    
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;            
        }
    }
    return (
        <div className='flex flex-col xl:flex-row gap-[25px] p-[24px] shadow-primary rounded-[10px]'>
            <div className='w-[126px] h-[126px] rounded-[10px] overflow-hidden'>
                <Image src={imageState ? URL.createObjectURL(imageState) : Avatar} width={100} height={100} alt='avt' style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}></Image>
            </div>
            <div className='flex flex-col gap-[16px]'>
                <h3 className='font-[700] text-[24px]'>Tran Van Bao Thang</h3>
                <p className='font-[400] text-[16px]'>Front-end developer</p>
                <div>
                    <input type="file" name='file' id='imageImporter' className='hidden' multiple ref={fileInputRef}
                    onChange={(event) => handleOnChangeSeleteImage(event)} onSubmit={() => {console.log("Submit");
                    }}
                    />
                    <div className='flex flex-row justify-between'>
                        <UnlinkButton 
                        textContent={'Change Image'} 
                        icon={'upload'} 
                        iconPosition={'left'} 
                        backgroundColor={'bg-blue-700'} 
                        method={() => handleBrowseImage()} 
                        tailwind={'text-white'}
                        ></UnlinkButton>
                        {
                        imageState ?  <UnlinkButton 
                        textContent={'Save'} 
                        icon={''} 
                        iconPosition={'left'} 
                        backgroundColor={'bg-blue-700'} 
                        method={() => handleSubmitImage(imageState)} 
                        tailwind={'text-white'}
                        ></UnlinkButton> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvatarChanging
