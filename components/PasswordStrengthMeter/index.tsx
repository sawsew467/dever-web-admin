import React from 'react'
import zxcvbn from 'zxcvbn';

type TProps = {
    password: string;
} 

function PasswordStrengthMeter({password}: TProps) {
    const strength = zxcvbn(password);
    const num = strength.score * 100 /4;
    const passLable = () => {
        switch(strength.score) {
            case 0:
                return 'Very weak'
            case 1:
                return 'Weak'
            case 2: 
                return 'Fear'
            case 3: 
                return 'Good'
            case 4:
                return 'Strong'
            default: 
                return 'none'
        }
    }
    const processColor = () => {
        switch(strength.score) {
            case 0:
                return '#828282'
            case 1:
                return '#EA1111'
            case 2: 
                return '#FFAD00'
            case 3: 
                return '#9BC158'
            case 4:
                return '#00B500'
            default: 
                return 'none'
        }
    }
    const changePasswordColor = () => ({
        width: `${num}%`,
        background: processColor(),
    })
    return (
        <div className='w-full flex flex-row items-center justify-center gap-2 relative'>
            <div className='w-full bg-slate-200 rounded-md h-2 overflow-hidden '>
                <div className='h-2 transition-all' style={changePasswordColor()}></div>
                
            </div>
            <div className='absolute top-[38px] right-[20px]'>
                <p>{passLable()}</p>
            </div>
        </div>
    )
}

export default PasswordStrengthMeter
