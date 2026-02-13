import React from "react";
import HomeBanner from "./HomeComponents/HomeBanner";
import HomeHowItWork from "./HomeComponents/HomeHowItWork";
import OurServices from "./HomeComponents/OurServices";
import Sponser from "./HomeComponents/Sponser";
import FQA from "./HomeComponents/FQA";
import CustomerReview from "./HomeComponents/CustomerReview";
import CustomerSatisfaction from "./HomeComponents/CustomerSatisfaction";
import Tracking from "./HomeComponents/Tracking";

export default function Home() {
  return (
    <div className="space-y-5 md:space-y-10">
      <HomeBanner />
      <HomeHowItWork />
      <OurServices />
      <Sponser />
      <Tracking />
      <CustomerSatisfaction />
      <CustomerReview />
      <FQA />
    </div>
  );
}
