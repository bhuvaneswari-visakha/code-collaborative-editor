import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Home from './components/Home/home';
// import About from './components/About/about';
// import Feature from './components/Features/feature';
// import Register from './components/Register/register';
// import Login from './components/Login/login';
// import PublicLayout from './components/PublicLayout/PublicLayout';
 import Dashboard from "./pages/dashboard";
 import DocumentPage from "./pages/DocumentPage";
 import Login from "./pages/Login";
 import Register from "./pages/Register";
 const App = () => {
  return (
    <Router>
      <Routes>
        {/* 
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Feature />} />
        </Route>
        */}
        <Route path="/" element={
          <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: 'white',
            textAlign: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated Background Elements */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              animation: 'float 6s ease-in-out infinite'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '60%',
              right: '15%',
              width: '60px',
              height: '60px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
              animation: 'float 8s ease-in-out infinite reverse'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '20%',
              left: '20%',
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '50%',
              animation: 'float 7s ease-in-out infinite'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '30%',
              right: '25%',
              width: '100px',
              height: '100px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '50%',
              animation: 'float 9s ease-in-out infinite reverse'
            }}></div>

            {/* Main Content Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(25px)',
              borderRadius: '30px',
              padding: '60px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '900px',
              width: '100%',
              position: 'relative',
              zIndex: '1'
            }}>
              {/* Hero Icon */}
              <div style={{
                fontSize: '4rem',
                marginBottom: '20px',
                animation: 'bounce 2s ease-in-out infinite'
              }}>
                🚀
              </div>

              <h1 style={{
                fontSize: '4rem',
                marginBottom: '20px',
                fontWeight: '200',
                textShadow: '0 4px 8px rgba(0,0,0,0.4)',
                background: 'linear-gradient(45deg, #ffffff, #e0e7ff, #c7d2fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.1'
              }}>
                Code Collaborative<br/>
                <span style={{
                  fontSize: '3.5rem',
                  background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '300'
                }}>
                  Editor
                </span>
              </h1>

              <p style={{
                fontSize: '1.4rem',
                marginBottom: '50px',
                opacity: '0.95',
                lineHeight: '1.7',
                maxWidth: '700px',
                margin: '0 auto 50px auto',
                fontWeight: '300'
              }}>
                Experience the future of collaborative coding with real-time synchronization,
                intelligent code completion, and seamless team collaboration.
                <br/><br/>
                <span style={{
                  fontSize: '1.1rem',
                  opacity: '0.8',
                  fontStyle: 'italic'
                }}>
                  "Where great minds code together"
                </span>
              </p>

              {/* Feature Highlights */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '40px',
                marginBottom: '50px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minWidth: '120px'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚡</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Real-time Sync</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minWidth: '120px'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🤖</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>AI-Powered</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minWidth: '120px'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔒</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Secure</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '25px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <a href="/login" style={{
                  padding: '18px 45px',
                  background: 'linear-gradient(45deg, #4f46e5, #7c3aed, #a855f7)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  boxShadow: '0 10px 30px rgba(79, 70, 229, 0.4)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                  e.target.style.boxShadow = '0 20px 40px rgba(79, 70, 229, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 10px 30px rgba(79, 70, 229, 0.4)';
                }}>
                  <span>🚀</span>
                  <span>Start Coding</span>
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s',
                    pointerEvents: 'none'
                  }}
                  onMouseOver={(e) => e.target.style.left = '100%'}
                  onMouseOut={(e) => e.target.style.left = '-100%'}></div>
                </a>

                <a href="/register" style={{
                  padding: '18px 45px',
                  background: 'transparent',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  border: '3px solid rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(-3px) scale(1.02)';
                  e.target.style.borderColor = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                }}>
                  <span>✨</span>
                  <span>Join Now</span>
                </a>
              </div>
            </div>

            {/* CSS Animations */}
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
              }
              @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
              }
            `}</style>
          </div>
        } />
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
