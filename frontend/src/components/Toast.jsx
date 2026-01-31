import { useEffect, useState } from 'react';

const toastStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#4BB543', // green
  color: 'white',
  padding: '12px 20px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  fontWeight: 'bold',
  zIndex: 1000,
  animation: 'fadeInOut 3s',
};

export default function Toast({ message }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!show) return null;

  return (
    <div style={toastStyle}>
      {message}
    </div>
  );
}
