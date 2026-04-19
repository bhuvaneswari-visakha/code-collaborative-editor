const About = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
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
          background: 'linear-gradient(45deg, #38bdf8, #0ea5e9, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          About Us
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          <div style={{
            background: 'rgba(56, 189, 248, 0.1)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '15px',
              color: '#38bdf8'
            }}>
              Our Mission
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              opacity: '0.9'
            }}>
              We empower developers worldwide to collaborate seamlessly through real-time code synchronization, intelligent tools, and a thriving community.
            </p>
          </div>

          <div style={{
            background: 'rgba(168, 85, 247, 0.1)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '15px',
              color: '#a855f7'
            }}>
              Why Choose Us
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              opacity: '0.9'
            }}>
              Built for teams of all sizes. From solo developers to enterprise teams, our platform scales with your needs while maintaining simplicity and performance.
            </p>
          </div>

          <div style={{
            background: 'rgba(124, 58, 237, 0.1)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '15px',
              color: '#7c3aed'
            }}>
              Our Vision
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              opacity: '0.9'
            }}>
              Transforming how developers work together. Making remote collaboration as natural as working side-by-side in the same room.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
