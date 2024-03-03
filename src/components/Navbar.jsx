import React from 'react'

function navbar() {
  return (
    <nav className='flex justify-center flex-col items-center'>
      <p className='text-4xl font-bold mt-10'>TO DO List</p>
      <ul className='flex gap-4 mt-4 text-xl '>
        <li className='cursor-pointer hover:font-bold transition-all duration-200 '>Add Task</li>
        <li className='cursor-pointer  hover:font-bold transition-all duration-200'>View Task</li>
      </ul>
    </nav>
  )
}

export default navbar