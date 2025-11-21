import React from 'react'
import HomeBanner from './HomeComponents/HomeBanner'
import HomeHowItWork from './HomeComponents/HomeHowItWork'
import OurServices from './HomeComponents/OurServices'
import Sponser from './HomeComponents/Sponser'
import FQA from './HomeComponents/FQA'
import CustomerReview from './HomeComponents/CustomerReview'
import CustomerSatisfaction from './HomeComponents/CustomerSatisfaction'

export default function Home() {
  return (
    <div>

          <HomeBanner></HomeBanner>
          <HomeHowItWork></HomeHowItWork>
          <OurServices ></OurServices>
          <Sponser></Sponser>
          <CustomerSatisfaction></CustomerSatisfaction>
          <CustomerReview></CustomerReview>
          
          <FQA></FQA>

      
    </div>
  )
}
