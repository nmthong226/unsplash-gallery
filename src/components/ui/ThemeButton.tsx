import React from 'react'
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import './ThemeButton.css';
import { cn } from '@/lib/utils';

interface ThemeButtonProps {
    toggleTheme : () => void,
    className : string,
}
const ThemeButton: React.FC<ThemeButtonProps> = ({ toggleTheme, className }) => {
    return (
        <div className={cn(className, ' flex rounded-full border-2 border-gray-200 dark:border-zinc-900 z-10')}>
            <label className='flex w-10 h-10 cursor-pointer justify-center items-center'>
                <input
                    type='checkbox'
                    className='absolute opacity-0'
                    onChange={toggleTheme} />
                <MdSunny className='sun' />
                <FaMoon className='moon' />
                <span className='toggle'></span>
            </label>
        </div>
    )
}

export default ThemeButton