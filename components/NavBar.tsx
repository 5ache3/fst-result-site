import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Link from 'next/link'
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
export default function NavBar({filliere}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const path = filliere ? filliere:'';
  return (
    <nav className='bg-black text-white w-full shadow-lg rounded-sm md:rounded-lg'>
      <div className='flex justify-between items-center p-4 max-w-7xl mx-auto'>
        <Link href='/' className='text-2xl font-bold hover:text-gray-300 transition duration-300'>
          Home
        </Link>
        
        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-8 items-center'>
          <Link href={`/${path}/matieres/`} className='hover:text-gray-300 transition duration-300 font-semibold text-xl'>Matieres</Link>
          <Link href={`/${path}/modules/`} className='hover:text-gray-300 transition duration-300 font-semibold text-xl'>Modules</Link>
          <SearchBar />
        </div>

        {/* Mobile Menu Button */}
        <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className='w-8 h-8' /> : <Menu className='w-8 h-8' />}
        </button>
      </div>
      
      {/* Mobile Menu with Animation */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`md:hidden bg-black w-full flex flex-col px-4 space-y-4 overflow-hidden ${isOpen ? 'py-4' : 'py-0'}`}
      >
        <Link href={`/${path}/matieres/`} className='hover:text-gray-300 transition duration-300 font-semibold text-xl' onClick={() => setIsOpen(false)}>Matieres</Link>
        <Link href={`/${path}/modules/`} className='hover:text-gray-300 transition duration-300 font-semibold text-xl' onClick={() => setIsOpen(false)}>Modules</Link>
        <SearchBar />
      </motion.div>
    </nav>
  )
}
