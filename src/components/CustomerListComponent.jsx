// CustomerListComponent.jsx

import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import TableComponent from './TableComponent';

const CustomerListComponent = ({ token }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
  
    fetchCustomers();
  }, [token]);


    // Fetch customers from backend using the token
    const fetchCustomers = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/customers', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            const customerData = await response.json();
            setCustomers(customerData);
          } else {
            console.error('Failed to fetch customers');
          }
        } catch (error) {
          console.error('Error during customer fetch:', error);
        }
      };
  
  return (
    <Container>    
    <Row className='mt-5'>
      <Col xs={12}>
        <TableComponent data={customers} token={ token }  fetchCustomers={fetchCustomers} />
      </Col>
    </Row>
  </Container>
  );
};

export default CustomerListComponent;
