import React from 'react'
import Aboutbanner from '../About components/Aboutbanner'
import Acompany from '../About components/Acompany'
import Bridge from '../About components/Bridge'
import Quote from '../About components/Quote'
import Footer from '../components/Footer'
const About = () => {
  return (
    <div>
      <Aboutbanner />
      <Acompany />
      <Bridge />
      <Quote />
      <Footer/>
    </div>
  )
}

export default About