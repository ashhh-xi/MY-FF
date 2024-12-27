import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import ImpactDashboard from "./ImpactDashboard";
import NFTCollection from "./NFTCollection";
import Testimonials from "./Testimonials";
import FutureEnhancements from "./FutureEnhancements";
import Footer from "./Footer";

function Homepage() {
  return (
    <div className="min-h-screen bg-trsnsparent
      Bruno-ace-sc;

    ">
      <Hero />
      <Features />
      <ImpactDashboard />
      <NFTCollection />
      <Testimonials />
      <FutureEnhancements />
      <Footer />
    </div>
  );
}


export default Homepage;
