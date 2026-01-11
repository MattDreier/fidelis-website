import React, { Suspense } from 'react';

// Eager-loaded (above fold / critical path)
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

// Lazy-loaded (below fold)
const Services = React.lazy(() => import('./components/Services'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const CallToAction = React.lazy(() => import('./components/CallToAction'));

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden w-full">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Services />
          <Testimonials />
          <CallToAction />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;