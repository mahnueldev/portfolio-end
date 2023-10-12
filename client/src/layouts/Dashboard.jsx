import React from 'react'
import { CountDev, CountDes, CountCert } from '../components'

const Dashboard = () => {
  return (
    <section className='flex justify-center space-x-24'>
    <CountDev/>
    <CountDes/>
    <CountCert/>
    </section>
  )
}

export default Dashboard