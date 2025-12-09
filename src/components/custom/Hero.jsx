import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (

    <div className='flex flex-col justify-center items-center w-full px-5 mt-28 gap-9'>
      <h1 className='font-extrabold text-[30px] md:text-[42px] text-center max-w-4xl leading-tight'>
        <span className='text-[#f56551]'>Discover Your Next Adventure With AI: </span>
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your intersts and budget</p>
      <Link to={'/create-trip'}>
        <Button>Get Started, It's Free</Button>
      </Link>
      <img src='/landing.png' className='py-10 h-auto max-h-[500px] w-full object-contain' />
    </div>

  )
}

export default Hero
