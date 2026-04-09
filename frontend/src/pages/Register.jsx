import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    name: '',
    phoneNo: ''
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
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
        background: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '50%',
        animation: 'float 9s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(255, 255, 255, 0.04)',
        borderRadius: '50%',
        animation: 'float 11s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '70%',
        right: '30%',
        width: '70px',
        height: '70px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(25px)',
        borderRadius: '30px',
        padding: '60px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        width: '100%',
        maxWidth: '550px',
        position: 'relative',
        zIndex: '1'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '6px',
          background: 'linear-gradient(90deg, #ec4899, #f97316, #eab308, #84cc16)',
          borderRadius: '30px 30px 0 0'
        }}></div>

        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{
            fontSize: '3.5rem',
            marginBottom: '15px',
            animation: 'bounce 2s ease-in-out infinite'
          }}>
            🎨
          </div>
          <h2 style={{
            fontSize: '2.8rem',
            marginBottom: '15px',
            fontWeight: '200',
            color: '#1f2937',
            background: 'linear-gradient(135deg, #ec4899, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Join the Community
          </h2>
          <p style={{
            color: '#6b7280',
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
              display: 'block',
              marginBottom: '10px',
              color: '#374151',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📧</span>
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
                border: '2px solid #e5e7eb',
                borderRadius: '15px',
                fontSize: '1.1rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ec4899';
                e.target.style.boxShadow = '0 0 0 4px rgba(236, 72, 153, 0.1), 0 8px 25px rgba(236, 72, 153, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              color: '#374151',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>👤</span>
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
                border: '2px solid #e5e7eb',
                borderRadius: '15px',
                fontSize: '1.1rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ec4899';
                e.target.style.boxShadow = '0 0 0 4px rgba(236, 72, 153, 0.1), 0 8px 25px rgba(236, 72, 153, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              color: '#374151',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🔐</span>
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
                border: '2px solid #e5e7eb',
                borderRadius: '15px',
                fontSize: '1.1rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ec4899';
                e.target.style.boxShadow = '0 0 0 4px rgba(236, 72, 153, 0.1), 0 8px 25px rgba(236, 72, 153, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              color: '#374151',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>👨‍💻</span>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                border: '2px solid #e5e7eb',
                borderRadius: '15px',
                fontSize: '1.1rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ec4899';
                e.target.style.boxShadow = '0 0 0 4px rgba(236, 72, 153, 0.1), 0 8px 25px rgba(236, 72, 153, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div style={{ marginBottom: '35px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              color: '#374151',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📱</span>
              Phone Number <span style={{ fontWeight: '400', color: '#9ca3af', fontSize: '0.9rem' }}>(Optional)</span>
            </label>
            <input
              type="tel"
              name="phoneNo"
              placeholder="Enter your phone number"
              value={formData.phoneNo}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '16px 20px',
                border: '2px solid #e5e7eb',
                borderRadius: '15px',
                fontSize: '1.1rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ec4899';
                e.target.style.boxShadow = '0 0 0 4px rgba(236, 72, 153, 0.1), 0 8px 25px rgba(236, 72, 153, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          {error && (
            <div style={{
              background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
              border: '1px solid #fca5a5',
              color: '#dc2626',
              padding: '15px 20px',
              borderRadius: '12px',
              marginBottom: '30px',
              fontSize: '1rem',
              fontWeight: '600',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.1)',
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
              background: 'linear-gradient(135deg, #ec4899, #f97316, #eab308)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 25px rgba(236, 72, 153, 0.4)',
              marginBottom: '30px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 15px 35px rgba(236, 72, 153, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.4)';
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
          borderTop: '2px solid #f3f4f6'
        }}>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            margin: '0',
            fontWeight: '500'
          }}>
            Already have an account?{' '}
            <a
              href="/login"
              style={{
                color: '#ec4899',
                textDecoration: 'none',
                fontWeight: '700',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#f97316';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#ec4899';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Sign In →
            </a>
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Register;