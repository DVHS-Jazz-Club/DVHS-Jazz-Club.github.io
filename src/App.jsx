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
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', images: [] });

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
      });
  }, []);

  const handlePerformanceClick = (performance) => {
    setModalContent({ 
      title: performance.title, 
      images: performance.media || [] 
    });
    setShowModal(true);
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  
  const MainSite = () => (
    <>
      <Hero heroImages={data.heroImages} />
      <About aboutImage={data.aboutImage} />
      <Performances 
        upcoming={data.performances.upcoming || []} 
        past={data.performances.past || []}
        onPerformanceClick={handlePerformanceClick} 
      />
      <Join />
      <Contact officers={data.officers} />
    </>
  );

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        images={modalContent.images}
      />
    </>
  );
}

export default App; 