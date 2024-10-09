import React from 'react'
import HBanner from "../Home components/HBanner"
import Whatwedo from "../Home components/Whatwedo"
import Eco from "../Home components/Eco"
import ABanner from "../Home components/ABanner"
import Testimonials from "../Home components/Testimonials"

const Homes = () => {
  return (
    <div>
      <HBanner />
      <Whatwedo />
      <Eco />
      <ABanner />
      <Testimonials />
      <Footer/>
    </div>
  )
}

export default Homes