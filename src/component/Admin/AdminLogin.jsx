import React, { useState } from 'react';

const AdminLogin = ({ theme = 'dark', onLogin }) => {
  const isDark = theme === 'dark';

  const pageBg = isDark ? '#181e2a' : '#f9fafb';
  const cardBg = isDark ? '#2c3349' : '#ffffff';
  const inputBg = isDark ? '#3a4160' : '#f0f2f5';
  const inputBorder = isDark ? '#4b5470' : '#d1d5db';
  const textColor = isDark ? '#e1e6f0' : '#1f2937';
  const placeholderColor = isDark ? '#8b94b2' : '#9ca3af';
  const shadow = isDark
    ? '0 4px 12px rgba(0,0,0,0.7)'
    : '0 4px 12px rgba(0,0,0,0.1)';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const containerStyle = {
    backgroundColor: pageBg,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '1rem',
  };

  const cardStyle = {
    backgroundColor: cardBg,
    padding: '2.5rem 3rem',
    borderRadius: '14px',
    boxShadow: shadow,
    width: '100%',
    maxWidth: '400px',
    color: textColor,
  };

  const titleStyle = {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: '700',
    textAlign: 'center',
    userSelect: 'none',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1.25rem',
    borderRadius: '8px',
    border: `1.5px solid ${inputBorder}`,
    backgroundColor: inputBg,
    color: textColor,
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: isDark ? '#6272ff' : '#2563eb',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    backgroundColor: isDark ? '#6272ff' : '#2563eb',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: isDark
      ? '0 4px 10px rgba(98, 114, 255, 0.6)'
      : '0 4px 10px rgba(37, 99, 235, 0.6)',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: isDark ? '#4b5edc' : '#1e40af',
  };

  const [btnHover, setBtnHover] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter your email and password.');
      return;
    }
    onLogin && onLogin({ email });
  };

  return (
    <div style={containerStyle}>
      <form style={cardStyle} onSubmit={handleSubmit} aria-label="Admin Login Form" noValidate>
        <h2 style={titleStyle}>Admin Login</h2>
        {error && (
          <div
            role="alert"
            style={{
              marginBottom: '1rem',
              color: '#ff6b6b',
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}
        <label htmlFor="email" style={labelStyle}>
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            ...inputStyle,
            borderColor: emailFocus ? inputFocusStyle.borderColor : inputBorder,
            color: textColor,
          }}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          aria-required="true"
          autoComplete="username"
        />
        <label htmlFor="password" style={labelStyle}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...inputStyle,
            borderColor: passwordFocus ? inputFocusStyle.borderColor : inputBorder,
            color: textColor,
          }}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          aria-required="true"
          autoComplete="current-password"
        />
        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: btnHover ? buttonHoverStyle.backgroundColor : buttonStyle.backgroundColor,
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          aria-label="Submit Admin Login"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;