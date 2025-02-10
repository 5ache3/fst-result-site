import React from 'react'
import SearchBar from './SearchBar'

export default function Header() {
  return (
    <div className='bg-black w-full h-15'>
      <ul className='flex justify-between text-stone-100 text-md  p-2 items-center'>
        <li>
        <a href="/">home</a>
        </li>
        <li>
        <a href="/module">modules</a>
        </li>
        <li>
        <a href="/matiere">matieres</a>
        </li>
        <li>
          <img src='/burger.svg' className=' bg-slate-300 w-5 sm:hidden'/>
        </li>
        <li  className='hidden sm:block'>
          <SearchBar/>
        </li>
      </ul>
    </div>
  )
}
