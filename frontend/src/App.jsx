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
        <Route path="/" element={<div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
          <h1>Welcome to Code Collaborative Editor</h1>
          <p>A real-time collaborative code editor for teams</p>
          <div style={{ marginTop: '30px' }}>
            <a href="/login" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>Login</a>
            <a href="/register" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Register</a>
          </div>
        </div>} />
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
