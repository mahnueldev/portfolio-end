import React from 'react'
import { CountDev, CountDes } from '../components'

const Dashboard = () => {
  return (
    <section className='flex justify-center space-x-24'>
    <CountDev/>
    <CountDes/>
    </section>
  )
}

export default Dashboard