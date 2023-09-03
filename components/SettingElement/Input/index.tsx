import React from 'react'

type TPros = {
    title: string,
    value: string,
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    isValidDataType: boolean;
    type: "text" | "date" | "number" | "password";
    isEdit: boolean;
}

function Input({title, value, onChange, isValidDataType, type, isEdit}: TPros):JSX.Element {

    const capitalizeFirstLetter = (inputString: string):string => {
        if(inputString.length === 0) return inputString;
        const firstChar = inputString.charAt(0).toUpperCase();
        const restOfString = inputString.slice(1);
        return  firstChar + restOfString;
    }
    const lowercaseFirstLetter = (inputString:string):string => {
        if(inputString.length === 0) return inputString;
        const firstChar = inputString.charAt(0).toLocaleLowerCase();
        const restOfString = inputString.slice(1);
        return  firstChar + restOfString;
    }

    return (
        <div className='flex flex-col relative'>
        <span className='font-[300] text-[14px]'>{capitalizeFirstLetter(title)}</span>
        <input type={type} placeholder={`Enter your ${lowercaseFirstLetter(title)}...`} 
            value={value}
            onChange={(e) => onChange(e)}
            disabled={!isEdit}
            className={`rounded-[6px] border-gray-300 bg-gray-50 text-[14px] ${!isEdit ? "text-gray-500" : "text-black"}`}
            />
        {
            !isValidDataType ? 
            <span className='absolute right-0 font-[500] text-[14px] text-red-700'>{`${capitalizeFirstLetter(title)} is invalid!`}</span>
            : null
        }
    </div>
    )
}

export default Input
