import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image';

import EditIconAnimate from '@icon/components/Button/edit.gif'
import EditIconPause from '@icon/components/Button/edit_pause.png'
import Input from './Input';
import UnlinkButton from '../UnlinkButton';


function ContactInfomation():JSX.Element {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const fakeData = {
        phone: "0828 828 497",
        email: "thangtvbde170145@fpt.edu.vn"
    }

    const [phoneNumber, setPhoneNumber] = useState<string>(fakeData.phone);
    const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(true);
    const [email, setEmail] = useState<string>(fakeData.email);
    const [isEmail, setIsEmail] = useState<boolean>(true);

    const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
       setPhoneNumber(event.target.value);
       setIsPhoneNumber(true);
    }
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setIsEmail(true);
    }

    const handleValidation = ():boolean => {
        const phoneRegex = /^(\+\d{1,3}\s?)?(\(\d{1,4}\)|\d{1,4})([\s.-]?\d{1,10}){1,5}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let isPhoneCorrect = true;
        let isEmailCorrect = true;
        if(!phoneRegex.test(phoneNumber)) {
            isPhoneCorrect = false
            setIsPhoneNumber(isPhoneCorrect);
        } 
        if(!emailRegex.test(email)) {
            isEmailCorrect = false;
            setIsEmail(isEmailCorrect);
        }

        if(isPhoneCorrect && isEmailCorrect) return true;
        return false;
    }
    const handleSubmitChanged = () => {
        if(handleValidation()) {            
            console.log("POST");
        } else {
            console.log("CANCEL POST");
        }
    }

    return (
        <div className='flex flex-col gap-[20px] shadow-primary p-[24px] rounded-[10px]'>
            <div className='flex flex-row justify-between items-center'>
                <h3 className='font-[700] text-[24px]'>Contact information</h3>
                <button className='w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-black cursor-pointer transition' onClick={() => {setIsEdit(!isEdit)}}>
                    <Image src={isEdit ? EditIconAnimate : EditIconPause} alt='Edit' width={18} height={18} 
                    ></Image>
                </button>
            </div>
            <div className='flex flex-col gap-[20px]'>
                <Input 
                    title={'Phone number'}
                    value={phoneNumber}
                    onChange={(e) => handleChangePhoneNumber(e)}
                    isValidDataType={isPhoneNumber}
                    type='text'
                    isEdit={isEdit} 
                    />
                <Input 
                    title={'Email'} 
                    value={email} 
                    onChange={(e) => handleChangeEmail(e)} 
                    isValidDataType={isEmail}
                    type='text'
                    isEdit={isEdit}
                    />
            </div>
            {isEdit ? 
            <div>
                <UnlinkButton
                textContent={'Save'} 
                icon={''} 
                iconPosition={'left'} 
                backgroundColor={'bg-blue-700'} 
                method={() => {handleSubmitChanged()}} 
                tailwind={'text-white'}
                ></UnlinkButton>
            </div> : null}
        </div>
    )
}

export default ContactInfomation
