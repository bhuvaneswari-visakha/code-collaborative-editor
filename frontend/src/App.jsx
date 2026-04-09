import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home/home';
import About from './components/About/about';
import Feature from './components/Features/feature';
import Register from './components/Register/register';
import Login from './components/Login/login';
import PublicLayout from './components/PublicLayout/PublicLayout';
 import Dashboard from "./pages/dashboard";
 import DocumentPage from "./pages/DocumentPage";
 const App = () => {
  return (
    <Router>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/document/:docId" element={<DocumentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
