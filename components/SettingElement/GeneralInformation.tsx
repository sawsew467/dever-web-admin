import React, {useState, useRef} from 'react'

import EditIconAnimate from '@icon/components/Button/edit.gif'
import EditIconPause from '@icon/components/Button/edit_pause.png'
import Image from 'next/image';
import Button from '../Button';
import Input from './Input';
import Selection from './Selection';
import UnlinkButton from '../UnlinkButton';

type GeneralState = {
    firstName: string;
    lastName: string,
    birthday: string,
    homeAddress: string,
    position: string,
    role: string,
    major: string,
    education: string,
    workHistory: string,
    department: string,
    joinDate: string,
}

function GeneralInformation():JSX.Element {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const fakeData = {
        id: 0,
        firstName: "Tran Van",
        lastName: "Bao Thang",
        birthday: "2002-02-19",
        homeAddress: "Trieu Son, Trieu Phong, Quang Tri",
        position: "Club President",
        role: "Front-End developer",
        major: "Software Engineering",
        education: "FPT University",
        workHistory: "NAPA Global, Google , Facebook",
        department: "Board of Directors",
        email: "thangtvbde170145@fpt.edu.vn",
        phone: "0828 828 497",
        joinDate: "2021-09-12",
    }

    const [firstName, setFirstName] = useState<string>(fakeData.firstName);
    const [lastName, setLastName] = useState<string>(fakeData.lastName);
    const [birthday, setBirthday] = useState<string>(fakeData.birthday);
    const [homeAddress, setHomeAddress] = useState<string>(fakeData.homeAddress);
    const [position, setPosition] = useState<string>(fakeData.position);
    const [role, setRole] = useState<string>(fakeData.role);
    const [major, setMajor] = useState<string>(fakeData.major);
    const [education, setEducation] = useState<string>(fakeData.education);
    const [workHistory, setWorkHistory] = useState<string>(fakeData.workHistory);
    const [department, setDepartment] = useState<string>(fakeData.department);
    const [joinDate, setJoinDate] = useState<string>(fakeData.joinDate);

    const [isFirstName, setIsFirstName] = useState<boolean>(true);
    const [isLastName, setIsLastName] = useState<boolean>(true);
    const [isBirthday, setIsBirthday] = useState<boolean>(true);
    const [isHomeAddress, setIsHomeAddress] = useState<boolean>(true);
    const [isPosition, setIsPosition] = useState<boolean>(true);
    const [isRole, setIsRole] = useState<boolean>(true);
    const [isMajor, setIsMajor] = useState<boolean>(true);
    const [isEducation, setIsEducation] = useState<boolean>(true);
    const [isWorkHistory, setIsWorkHistory] = useState<boolean>(true);
    const [isDepartment, setIsDepartment] = useState<boolean>(true);
    const [isJoinDate, setIsJoinDate] = useState<boolean>(true);

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
        setIsFirstName(true);
      }
      
    const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
        setIsLastName(true);
      }
      
    const handleChangeBirthday = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthday(event.target.value);
        setIsBirthday(true);
      }
      
    const handleChangeHomeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHomeAddress(event.target.value);
        setIsHomeAddress(true);
      }
      
    const handleChangePosition = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPosition(event.target.value);
        setIsPosition(true);
      }
      
    const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
        setIsRole(true);
      }
      
    const handleChangeMajor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMajor(event.target.value);
        setIsMajor(true);
      }
      
    const handleChangeEducation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEducation(event.target.value);
        setIsEducation(true);
      }
      
    const handleChangeWorkHistory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWorkHistory(event.target.value);
        setIsWorkHistory(true);
      }
      
    const handleChangeDepartment = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartment(event.target.value);
        setIsDepartment(true);
      }
      
    const handleChangeJoinDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJoinDate(event.target.value);
        setIsJoinDate(true);
      }
    
    const position_options = [
        "Member",
        "Secretary",
        "Club President",
        "Vice Club President",
        "Academic Department Head",
        "Vice Academic Department Head",
        "Events Department Head",
        "Vice Events Department Head",
        "Media Department Head",
        "Vice Media Department Head",
        "Administrative Department Head",
        "Vice Administrative Department Head",
    ]

    const major_options = [
        "Artificial Intelligence",
        "Software Engineering",
        "Information Security",
        "Information System",
        "Digital Art Design",
    ]
    const department_options = [
        "Board of Directors",
        "Academic Board",
        "Events Board",
        "Media Board",
        "Administrative Board"
    ]

    const [generalInfomationState, setGeneralInfomationState] = useState<GeneralState>({
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        homeAddress: homeAddress,
        position: position,
        role: role,
        major: major,
        education: education,
        workHistory: workHistory,
        department: department,
        joinDate: joinDate,
    })

    const handleSaveForm = () => {
        const getData = {
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            homeAddress: homeAddress,
            position: position,
            role: role,
            major: major,
            education: education,
            workHistory: workHistory,
            department: department,
            joinDate: joinDate,
        }
        setGeneralInfomationState(getData);        
    }
    
    console.log(generalInfomationState);

    return (
        <div className='flex flex-col gap-[20px] shadow-primary p-[24px] rounded-[10px]'>
        <div className='flex flex-row justify-between items-center'>
            <h3 className='font-[700] text-[24px]'>General information</h3>
            <button className='w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-black cursor-pointer transition' onClick={() => {setIsEdit(!isEdit)}}>
                <Image src={isEdit ? EditIconAnimate : EditIconPause} alt='Edit' width={18} height={18} 
                ></Image>
            </button>
        </div>
        <div className='flex flex-col lg:flex-row gap-[20px] select-none'>
            <div className='w-full lg:w-[50%] flex flex-col gap-[20px]'>
                <Input 
                title={'fist name'} 
                value={firstName} 
                onChange={(e) => handleChangeFirstName(e)} 
                isValidDataType={isFirstName}
                type='text'
                isEdit={isEdit}/>
                <Input 
                title={'Birthday'} 
                value={birthday} 
                onChange={(e) => handleChangeBirthday(e)} 
                isValidDataType={isBirthday}
                type='date'
                isEdit={isEdit}/>
                <Selection 
                title='position'
                options={position_options} 
                value={position} 
                isEdit={isEdit} 
                onChange={(e) => handleChangePosition(e)}/>
               <Selection
                title='major'
                options={major_options} 
                value={major} 
                isEdit={isEdit} 
                onChange={(e) => handleChangeMajor(e)}/>
                <Input 
                title={'work history'} 
                value={workHistory} 
                onChange={(e) => handleChangeWorkHistory(e)} 
                isValidDataType={isWorkHistory}
                type='text'
                isEdit={isEdit}/>
                <Input 
                title={'join date'} 
                value={joinDate} 
                onChange={(e) => handleChangeJoinDate(e)} 
                isValidDataType={isJoinDate}
                type='date'
                isEdit={isEdit}/>
                

            </div>
            <div className='w-full lg:w-[50%] flex flex-col gap-[20px]'>
                <Input 
                title={'Last Name'} 
                value={lastName} 
                onChange={(e) => handleChangeLastName(e)} 
                isValidDataType={isLastName}
                type='text'
                isEdit={isEdit}/>
                <Input 
                title={'Home Address'} 
                value={homeAddress} 
                onChange={(e) => handleChangeHomeAddress(e)} 
                isValidDataType={isHomeAddress}
                type='text'
                isEdit={isEdit}/>
                <Input 
                title={'Role'} 
                value={role} 
                onChange={(e) => handleChangeRole(e)} 
                isValidDataType={isRole}
                type='text'
                isEdit={isEdit}/>
                <Input 
                title={'Education'} 
                value={education} 
                onChange={(e) => handleChangeEducation(e)} 
                isValidDataType={isEducation}
                type='text'
                isEdit={isEdit}/>
                 <Selection
                title='department'
                options={department_options} 
                value={department} 
                isEdit={isEdit} 
                onChange={(e) => handleChangeDepartment(e)}/>

            </div>
        </div>

        {isEdit ? 
            <div>
                <UnlinkButton 
                textContent={'Save'} 
                icon={''} 
                iconPosition={'left'} 
                backgroundColor={'bg-blue-700'} 
                method={() => {handleSaveForm()}} 
                tailwind={'text-white'}
                ></UnlinkButton>
            </div> : null}
    </div>
    )
}

export default GeneralInformation
