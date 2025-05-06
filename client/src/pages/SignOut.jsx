import React from 'react';

const SignOut = () => {
  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    box: {
      backgroundColor: '#ffffff',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      borderRadius: '12px',
      minWidth: '280px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#1a1a1a',
    },
    message: {
      fontSize: '16px',
      color: '#555',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Sign out</h1>
        <p style={styles.message}>You have signed out successfully</p>
      </div>
    </div>
  );
};

export default SignOut;
