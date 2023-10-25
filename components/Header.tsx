import React from 'react'
import { Modal } from './Modal'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <nav className='flex w-full px-8 py-2 font-bold justify-between   '>
            Docker Management by Gaurav D. Lohar
            <div className='inline-flex gap-8'>
                <Modal />
                <Link href='https://github.com/lohargaurav00/parshva-xlsx.git' target='_blank'>
                    <Image src='github-mark.svg' width={40} height={40} alt='github' />
                </Link>
            </div>
        </nav>
    )
}

export default Header