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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: 'white',
            textAlign: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '60px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '800px',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '3.5rem',
                marginBottom: '20px',
                fontWeight: '300',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Code Collaborative Editor
              </h1>
              <p style={{
                fontSize: '1.3rem',
                marginBottom: '40px',
                opacity: '0.9',
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto 40px auto'
              }}>
                Experience real-time collaborative coding like never before.
                Work together seamlessly with your team in a powerful, intuitive editor.
              </p>
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <a href="/login" style={{
                  padding: '15px 40px',
                  background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  boxShadow: '0 8px 25px rgba(79, 70, 229, 0.4)',
                  transition: 'all 0.3s ease',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(79, 70, 229, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.4)';
                }}>
                  🚀 Start Coding
                </a>
                <a href="/register" style={{
                  padding: '15px 40px',
                  background: 'transparent',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  📝 Join Now
                </a>
              </div>
            </div>
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
