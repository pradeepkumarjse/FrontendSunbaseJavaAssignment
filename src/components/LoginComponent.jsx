
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './LoginComponent.css'; // Import the CSS file


const LoginComponent = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Call to backend login API
    try {
      const response = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log(" Login response ==>  ",response)

      if (response.ok) {
        
        const token = await response.json();
        // Pass the token to the parent component
        onLogin(token);
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container className="login-container">
    <Row>
      <Col xs={12} md={12}>
        <h2>Login Page</h2>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="login id"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="lg"
            />
          </Form.Group>
          <Form.Group controlId="formPassword"  className="mt-2">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
            />
          </Form.Group>
          <Button variant="primary" size="lg" className="mt-2" onClick={handleLogin}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default LoginComponent;
