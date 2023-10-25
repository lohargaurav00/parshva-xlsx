import React from 'react'
import { Modal } from './Modal'

const Header = () => {
    return (
        <nav className='flex w-full px-8 py-2 font-bold justify-between   '>
            Docker Management by Gaurav D. Lohar
            <Modal />
        </nav>
    )
}

export default Header