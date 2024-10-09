import React from 'react'
import Sbanner from '../service components/Sbanner'
import Miniprojects from '../service components/Miniprojects'
import BuildingConstruction from '../service components/BuildingConstruction'
import Footer from '../components/Footer'
const Services = () => {
  return (
    <div>
      <Sbanner />
      <BuildingConstruction />
      <Miniprojects />
      <Footer/>
    </div>
  )
}

export default Services