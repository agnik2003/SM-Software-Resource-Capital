import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- 1. Add this import
import ScrollToTop from './components/ScrollToTop'; // <-- 1. Import it here
import Home from './pages/Home';
import About from './pages/About'; // <-- Add this import
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Careers from './pages/Careers';

import Login from './pages/Login';
import Signup from './pages/SignUp';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#050505]">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} /> {/* <-- Activate the route */}
            
            {/* Placeholders for remaining pages */}
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;