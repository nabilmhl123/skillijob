import React from 'react';
import Hero from '../components/home/Hero';
import ProblemSection from '../components/home/ProblemSection';
import SectorsSection from '../components/home/SectorsSection';

const Home = () => {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SectorsSection />
    </main>
  );
};

export default Home;
