"use client"
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';
interface pageProps {
    params: {blogID: string};
}

function BlogDetail({params}: pageProps) {
    const isOpenSlidebar = useSelector((state: RootState) => state.app.isOpenSlidebar);
    const isMouseVisit = useSelector((state: RootState) => state.app.isMouseVisit);

    return (
        <div className={`w-[100%] ${isOpenSlidebar ? isMouseVisit ? "sm:w-[calc(100%-250px)]" : "sm:w-[calc(100%-65px)]" : "sm:w-[calc(100%-250px)]"} absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}>
            <div>
                <h1 className='text-center mt-[100px] text-[30px] font-bold text-black dark:text-gray-500'>
                    This is: {params.blogID} detail blog page</h1>
                {/* Write page content here */}
            </div>
        </div>
    )
}

export default BlogDetail;
