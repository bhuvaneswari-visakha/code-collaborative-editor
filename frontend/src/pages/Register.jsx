import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.text();
        setError(errorData || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse 700px 500px at 80% 40%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
        radial-gradient(ellipse 600px 700px at 15% 60%, rgba(56, 189, 248, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
      `,
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      paddingTop: '120px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '12%',
        width: '100px',
        height: '100px',
        background: 'rgba(168, 85, 247, 0.15)',
        borderRadius: '50%',
        animation: 'float 9s ease-in-out infinite',
        boxShadow: '0 0 40px rgba(168, 85, 247, 0.25)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(56, 189, 248, 0.12)',
        borderRadius: '50%',
        animation: 'float 11s ease-in-out infinite reverse',
        boxShadow: '0 0 35px rgba(56, 189, 248, 0.2)'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '70%',
        right: '30%',
        width: '70px',
        height: '70px',
        background: 'rgba(124, 58, 237, 0.1)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
        boxShadow: '0 0 30px rgba(124, 58, 237, 0.15)'
      }}></div>

      <div style={{
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(25px)',
        borderRadius: '30px',
        padding: '60px',
        boxShadow: '0 30px 80px rgba(56, 189, 248, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        width: '100%',
        maxWidth: '550px',
        position: 'relative',
        zIndex: '1',
        marginBottom: '50px'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '6px',
          background: 'linear-gradient(90deg, #a855f7, #d946ef, #ec4899, #f43f5e)',
          borderRadius: '30px 30px 0 0'
        }}></div>

        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <h2 style={{
            fontSize: '2.8rem',
            marginBottom: '15px',
            fontWeight: '200',
            color: '#f3e8ff',
            background: 'linear-gradient(135deg, #a855f7, #d946ef)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Join the Community
          </h2>
          <p style={{
            color: '#cbd5e1',
            fontSize: '1.1rem',
            margin: '0',
            fontWeight: '400'
          }}>
            Create your account and unlock collaborative coding
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
              color: '#f3e8ff',
              fontWeight: '700',
              fontSize: '1rem'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                border: '2px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '15px',
                fontSize: '1.1rem',
                boxSizing: 'border-box',
                background: 'rgba(30, 41, 59, 0.8)',
                outline: 'none',
                fontWeight: '500',
                color: '#f3e8ff'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
              color: '#f3e8ff',
              fontWeight: '700',
              fontSize: '1rem'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a unique username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                border: '2px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '15px',
                fontSize: '1.1rem',
                boxSizing: 'border-box',
                background: 'rgba(30, 41, 59, 0.8)',
                outline: 'none',
                fontWeight: '500',
                color: '#f3e8ff'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
              color: '#f3e8ff',
              fontWeight: '700',
              fontSize: '1rem'
            }}>

              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                border: '2px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '15px',
                fontSize: '1.1rem',
                boxSizing: 'border-box',
                background: 'rgba(30, 41, 59, 0.8)',
                outline: 'none',
                fontWeight: '500',
                color: '#f3e8ff'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              padding: '15px 20px',
              borderRadius: '12px',
              marginBottom: '30px',
              fontSize: '1rem',
              fontWeight: '600',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.1)',
              animation: 'shake 0.5s ease-in-out'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(135deg, #a855f7, #d946ef, #ec4899)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 25px rgba(168, 85, 247, 0.4)',
              marginBottom: '30px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span>🎉</span>
              <span>Create Account</span>
            </span>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transition: 'left 0.6s',
              pointerEvents: 'none'
            }}
            onMouseOver={(e) => e.target.style.left = '100%'}
            onMouseOut={(e) => e.target.style.left = '-100%'}></div>
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          paddingTop: '25px',
          borderTop: '2px solid rgba(168, 85, 247, 0.2)'
        }}>
          <p style={{
            color: '#cbd5e1',
            fontSize: '1rem',
            margin: '0',
            fontWeight: '500'
          }}>
            Already have an account?{' '}
            <a
              href="/login"
              style={{
                color: '#a855f7',
                textDecoration: 'none',
                fontWeight: '700',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              Sign In →
            </a>
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        button:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Register;