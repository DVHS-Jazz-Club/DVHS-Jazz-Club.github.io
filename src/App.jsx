import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles.css';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Performances from './components/Performances';
import Join from './components/Join';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Admin from './components/Admin';

function App() {
  const [data, setData] = useState(null);
  const [sortedPerformances, setSortedPerformances] = useState({ upcoming: [], past: [] });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', images: [] });

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = [];
        const past = [];
        const monthMap = { JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11 };

        jsonData.performances.forEach(perf => {
            const perfDate = new Date(perf.year, monthMap[perf.month.toUpperCase()], perf.day);
            if (perfDate >= today) {
                upcoming.push(perf);
            } else {
                past.push(perf);
            }
        });
        
        past.sort((a, b) => {
            const dateA = new Date(a.year, monthMap[a.month.toUpperCase()], a.day);
            const dateB = new Date(b.year, monthMap[b.month.toUpperCase()], b.day);
            return dateB - dateA;
        });

        setSortedPerformances({ upcoming, past });
      });
  }, []);

  const handlePerformanceClick = (title) => {
    const performance = data.performances.find(p => p.title === title);
    if (performance && data.gallery) {
      const performanceImages = data.gallery.filter(item => item.performance === title);
      setModalContent({ title, images: performanceImages });
      setShowModal(true);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  
  const MainSite = () => (
    <>
      <Navbar />
      <Hero heroImages={data.heroImages} />
      <About />
      <Performances 
        upcoming={sortedPerformances.upcoming} 
        past={sortedPerformances.past}
        onPerformanceClick={handlePerformanceClick} 
      />
      <Join />
      <Contact officers={data.officers} />
      <Footer />
      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        images={modalContent.images}
      />
    </>
  );

  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App; 