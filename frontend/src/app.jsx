// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Technology from './components/Technology';
import Roadmap from './components/Roadmap';
import EmailCaptureForm from './components/EmailCaptureForm';
import ParticleBackground from './components/ParticleBackground';
import StatsBanner from './components/StatsBanner';
import FeatureShowcase from './components/FeatureShowcase';
import TrustSignals from './components/TrustSignals';
import LiveDemo from './components/LiveDemo';

const LandingPage = () => (
  <main className="relative">
    <Hero />
    <StatsBanner />
    <FeatureShowcase />
    <LiveDemo />
    <TrustSignals />
    <EmailCaptureForm />
  </main>
);

const App = () => {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <ParticleBackground />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </div>
  );
};

export default App;