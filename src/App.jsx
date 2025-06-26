import { useState, useEffect, useMemo } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', images: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePerformanceClick = useMemo(() => (performance) => {
    setModalContent({ 
      title: performance.title, 
      images: performance.media || [] 
    });
    setShowModal(true);
  }, []);

  const handleCloseModal = useMemo(() => () => {
    setShowModal(false);
  }, []);

  // Memoize MainSite component to prevent unnecessary re-renders
  const MainSite = useMemo(() => () => (
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
  ), [data, handlePerformanceClick]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading Jazz Club Website...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#dc3545',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div>
          <h2>Error Loading Website</h2>
          <p>{error}</p>
          <p>Please refresh the page or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <>
            <Navbar />
            <main>
              <MainSite />
            </main>
            <Footer />
            <Modal
              show={showModal}
              onClose={handleCloseModal}
              title={modalContent.title}
              images={modalContent.images}
            />
          </>
        } />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </>
  );
}

export default App; 