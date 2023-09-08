import React, {useState} from 'react'
import { HiPlus } from "react-icons/hi";


type TPros = {
    text: string
    isAdd: boolean;
    setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddButton({text, isAdd, setIsAdd}: TPros) {
    const [isVisit, setIsVisit] = useState<boolean>(false);

    return (
        <div className='relative'>
        <button className={`w-[40px] h-[40px] flex flex-col items-center justify-center border-2 text-[18px] border-blue-700 rounded-[50%] transition ${isAdd ? "text-white bg-blue-700"  : "text-blue-700 bg-white"} ${isVisit ? "rotate-[360deg]" : null}`}
        onClick={() => setIsAdd(isAdd => !isAdd)}
        onMouseEnter={() => setIsVisit(true)}
        onMouseLeave={() => setIsVisit(false)}
        >
            <HiPlus className={"w-[20px] h-[20px]"}/>
        </button>
    
            <p className={`absolute top-[8px] left-[44px] pointer-events-none font-[600] text-[14px] text-blue-700 opacity-1 whitespace-nowrap text-ellipsis z-[-1] ${isVisit ? "opacity-1 animate-fade-right animate-duration-300" : " opacity-0"}`} >{text}</p>
        
    </div>
    )
}

export default AddButton
