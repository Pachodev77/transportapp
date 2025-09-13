import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function LandingPage() {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '2rem',
  };

  const buttonContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px',
    width: '100%',
    maxWidth: '300px',
  };

  const buttonStyle = (color) => ({
    padding: '15px 30px',
    fontSize: '1.2rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: color,
    color: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    },
  });

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Bienvenido a Nuestro Servicio de Transporte</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#555' }}>
        ¿Cómo te gustaría continuar?
      </p>
      <div style={buttonContainer}>
        <button 
          onClick={() => navigate('/driver')} 
          style={buttonStyle('#2ecc71')}
        >
          Soy Conductor
        </button>
        <button 
          onClick={() => navigate('/passenger')} 
          style={buttonStyle('#3498db')}
        >
          Soy Pasajero
        </button>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <span style={{ color: '#666', marginRight: '5px' }}>¿Ya tienes una cuenta?</span>
          <button 
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#3498db',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: '5px',
              fontSize: '1rem',
            }}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
