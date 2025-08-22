import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import FormatPage from './components/FormatPage';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'format', 'about'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFormat = () => {
    const element = document.getElementById('format');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection('format');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-300">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="pt-16">
        <Hero onFormatClick={scrollToFormat} />
        <Features />
        <FormatPage />
        <About />
      </main>

      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#27272a',
            color: '#f4f4f5',
            border: '1px solid #3f3f46',
            fontFamily: '"Chakra Petch", sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#f4f4f5',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f4f4f5',
            },
          },
        }}
      />
    </div>
  );
}

export default App;