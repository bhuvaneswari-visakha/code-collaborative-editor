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
        <Route path="/" element={<div>
          <h1>Welcome to Code Collaborative Editor</h1>
          <p>A real-time collaborative code editor for teams</p>
          <a href="/login">Login</a> | <a href="/register">Register</a>
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
