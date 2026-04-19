import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import DocumentPage from "./pages/DocumentPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Features from "./pages/Features";

 const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
      padding: '1rem 2rem',
      zIndex: '1000',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div 
        onClick={() => navigate('/')}
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #38bdf8, #0ea5e9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          cursor: 'pointer'
        }}>
        Code Editor
      </div>

      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <button 
          onClick={() => navigate('/about')}
          style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}>
          About
        </button>

        <button 
          onClick={() => navigate('/features')}
          style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}>
          Features
        </button>

        <a href="/login" style={{
          background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
          color: 'white',
          textDecoration: 'none',
          padding: '0.5rem 1.5rem',
          borderRadius: '25px',
          fontSize: '1rem',
          fontWeight: '600'
        }}>
          Login
        </a>
      </div>
    </nav>
  );
 };

 const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        {/* 
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Feature />} />
        </Route>
        */}
        <Route path="/" element={
          <div>
            {/* Hero Section */}
            <div style={{
              minHeight: '100vh',
              background: `url('https://images.wallpapersden.com/image/download/programming-8k-cool_bWdnbGWUmZqaraWkpJRnZWltrWdlaW0.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: 'white',
              textAlign: 'center',
              padding: '20px',
              paddingTop: '100px'
            }}>
              <div style={{
                maxWidth: '1200px',
                width: '100%'
              }}>
                <h1 style={{
                  fontSize: 'clamp(4rem, 12vw, 8rem)',
                  fontWeight: '300',
                  margin: '0',
                  lineHeight: '1.1',
                  background: 'linear-gradient(45deg, #ffffff, #e0f2fe, #bae6fd, #38bdf8, #0ea5e9)',
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(56, 189, 248, 0.5), 0 0 60px rgba(56, 189, 248, 0.3)',
                  animation: 'gradientShift 3s ease-in-out infinite, glowPulse 2s ease-in-out infinite alternate, textFloat 4s ease-in-out infinite',
                  position: 'relative'
                }}>
                  Code Collaborative<br/>
                  <span style={{
                    fontSize: 'clamp(3rem, 9vw, 6rem)',
                    background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706, #f97316, #ea580c)',
                    backgroundSize: '400% 400%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '400',
                    animation: 'gradientShift 4s ease-in-out infinite reverse, glowPulse 2.5s ease-in-out infinite alternate reverse, textFloat 5s ease-in-out infinite reverse'
                  }}>
                    Editor
                  </span>
                </h1>
              </div>
            </div>

            <style>{`
              @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }

              @keyframes glowPulse {
                0% {
                  text-shadow: 0 0 20px rgba(56, 189, 248, 0.3), 0 0 40px rgba(56, 189, 248, 0.2), 0 0 60px rgba(56, 189, 248, 0.1);
                }
                100% {
                  text-shadow: 0 0 40px rgba(56, 189, 248, 0.8), 0 0 80px rgba(56, 189, 248, 0.6), 0 0 120px rgba(56, 189, 248, 0.4);
                }
              }

              @keyframes textFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-5px) rotate(0.5deg); }
                50% { transform: translateY(-10px) rotate(0deg); }
                75% { transform: translateY(-5px) rotate(-0.5deg); }
              }

              @media (max-width: 768px) {
                nav {
                  padding: 1rem !important;
                }
                nav div:last-child {
                  gap: 1rem !important;
                }
                nav a {
                  font-size: 0.9rem !important;
                  padding: 0.4rem 0.8rem !important;
                }
              }

              @media (max-width: 480px) {
                nav {
                  flex-direction: column !important;
                  gap: 1rem !important;
                }
                nav div:last-child {
                  flex-wrap: wrap !important;
                  justify-content: center !important;
                }
              }
            `}</style>
          </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/document/:docId" element={<DocumentPage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
