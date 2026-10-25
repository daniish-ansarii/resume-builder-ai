import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import ShowcaseAndFaq from '../components/home/ShowcaseAndFaq'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <ShowcaseAndFaq />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
