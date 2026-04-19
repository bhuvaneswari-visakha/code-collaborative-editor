const Features = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
      padding: '120px 20px 100px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: 'white'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          fontWeight: '300',
          textAlign: 'center',
          marginBottom: '60px',
          background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Features
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px'
        }}>
          <div style={{
            background: 'rgba(56, 189, 248, 0.1)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '15px'
            }}>
              ⚡
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '15px',
              color: '#38bdf8'
            }}>
              Real-time Sync
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              See changes instantly as your team collaborates on code
            </p>
          </div>

          <div style={{
            background: 'rgba(168, 85, 247, 0.1)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '15px'
            }}>
              🔒
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '15px',
              color: '#a855f7'
            }}>
              Enterprise Security
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              Bank-grade encryption and secure authentication
            </p>
          </div>

          <div style={{
            background: 'rgba(124, 58, 237, 0.1)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '15px'
            }}>
              👥
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '15px',
              color: '#7c3aed'
            }}>
              Team Collaboration
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              Work together seamlessly with unlimited team members
            </p>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '15px'
            }}>
              💡
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '15px',
              color: '#3b82f6'
            }}>
              Intelligent Completion
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              AI-powered code suggestions to speed up development
            </p>
          </div>

          <div style={{
            background: 'rgba(236, 72, 153, 0.1)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(236, 72, 153, 0.2)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '15px'
            }}>
              📊
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '15px',
              color: '#ec4899'
            }}>
              Analytics & Insights
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              Track productivity and team performance metrics
            </p>
          </div>

          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '15px'
            }}>
              🌍
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '15px',
              color: '#22c55e'
            }}>
              Global Access
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              Access your projects from anywhere, anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
