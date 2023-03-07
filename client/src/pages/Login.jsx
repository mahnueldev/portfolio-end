import React from 'react'
import { FormComp } from '../components'
import pattrn from '../../src/assets/images/puzzle.jpg'


const Login = () => {
  
        
  return (
    <section className='flex  items-center space-x-26 '>
        <img src={pattrn} alt='' className='xl:block w-4/6  xl: h-screen sm:hidden '/>
        <div className='xl:block md:block w-full sm:w-4/6  sm:mt-20 sm:ml-20'>
        <FormComp/>
        </div>

    </section>
  )
}

export default Login