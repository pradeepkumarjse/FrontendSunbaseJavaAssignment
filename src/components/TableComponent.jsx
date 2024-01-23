
import React, { useState } from 'react';
import { Row, Col, Table, Button, Modal, Form, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import './TableComponent.css'; 

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { faMinus, faPen, faPlus, faSearch,faSync } from '@fortawesome/free-solid-svg-icons'; 


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableComponent = ({ data,token,fetchCustomers}) => {

    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('Search by'); // Default to searching all criteria

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        address: '',
        city: '',
        state: '',
        email: '',
        phone: '',
    });




    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddCustomer =  ()  => {
        //  API endpoint to add a new customer
        const apiUrl = 'http://localhost:8080/api/customers';

        //  API call using the form data
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {                
                console.log('Customer added successfully:', data);
                 fetchCustomers();
                toast.success('Customer added successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });

                setFormData({
                    firstName: '',
                    lastName: '',
                    street: '',
                    address: '',
                    city: '',
                    state: '',
                    email: '',
                    phone: '',
                });
                setShowModal(false);
            })
            .catch(error => {
                toast.error('Failed to add customer. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });

                console.error('Error adding customer:', error);
            });
        setShowModal(false);
    };


    const handleDelete = (id) => {
        const deleteApiUrl = `http://localhost:8080/api/customers/${id}`;
    
        // Make the DELETE request
        fetch(deleteApiUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => {
            if (response.ok) {        
             fetchCustomers();
            toast.success('Customer deleted successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });            } else {
              console.error('Failed to delete customer');
            }
          })
          .catch(error => {

            toast.error('An Error occured while deleting Customer please try again later!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }); 
            
            console.error('Error deleting customer:', error);
          });
      };
    


      const handleEditModal = (customer) => {      
        setFormData(customer);
        setShowModal(true);
      }

      const handleEdit = () => {
        const editApiUrl = `http://localhost:8080/api/customers/${formData.id}`;    

        fetch(editApiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        })
          .then(response => {
            if (response.ok) {
                fetchCustomers();
                toast.success('Customer Edited successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  }); 
                
                  setShowModal(false);

              console.log('Customer edited successfully');
            } else {
              console.error('Failed to edit customer');
            }
          })
          .catch(error => {
            console.error('Error editing customer:', error);
          });
      };

      const applySearchFilter = () => {
        // Filter data based on search criteria and term
        const filteredData = data.filter((customer) => {
            
          const searchField = customer[searchCriteria.toLowerCase()];
      
          // Check if searchTerm is defined and searchField is present for the current customer
          if (searchTerm !== undefined && searchField !== undefined) {
            // Case-insensitive search
            return !searchField.toLowerCase().includes(searchTerm.toLowerCase());
          }
      
          return true;
        });
      
        return filteredData;
      };
      
      const syncCustomers = () => {
        const suncApiUrl = `http://localhost:8080/api/customers/sync`;
    
        // Make the POST request
        fetch(suncApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => {
            if (response.ok) {        
             fetchCustomers();
            toast.success('Customer synchronization completed successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });            } else {
            }
          })
          .catch(error => {

            toast.error('An Error occured while syncing Customers please try again later!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }); 
            
          });
      }
      
      


    return (<>
        <Table striped bordered hover responsive className="custom-table">
            <thead>
                <tr>
                    <th colSpan="8" className="customer-list-title">
                        Customer List
                    </th>
                </tr>
                <tr>
                    <td colSpan="12">
                        <InputGroup className="mb-2">
                            <Row className='mt-2 justify-content-end'>
                                <Col className='group-actions group-actions1 margin-button'>
                                    <Button variant="primary" onClick={handleShowModal} className='add-customer-button mr-2'>
                                        <FontAwesomeIcon icon={faPlus} /> Add Customer
                                    </Button>
                                </Col>
                                <Col className='group-actions'>
                                    <label>Status</label>
                                    <DropdownButton
                                        as={InputGroup.Prepend}
                                        variant="outline-secondary"
                                        title={searchCriteria}
                                        id="input-group-dropdown-1"
                                    >
                                        <Dropdown.Item onClick={() => setSearchCriteria('Search by')}>All</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSearchCriteria('firstName')}>First Name</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSearchCriteria('city')}>City</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSearchCriteria('email')}>Email</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSearchCriteria('phone')}>Phone</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                                <Col className='group-actions'>
                                    <FormControl
                                        placeholder={`Search by ${searchCriteria.toLowerCase()}`}
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className='search-customer-button margin-button'
                                    />
                                </Col>
                                <Col className='group-actions margin-button'>
                                    <Button variant="outline-secondary" className='search-customer-icon'>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                </Col>

                                <Col className='group-actions ml-auto margin-button'>
                                    <Button variant="outline-secondary" className='search-customer-icon btn btn-light' onClick={(e) => syncCustomers()}>
                                        Sync &nbsp;
                                        <FontAwesomeIcon icon={faSync} />
                                    </Button>
                                </Col>
                            </Row>
                        </InputGroup>
                    </td>
                </tr>

                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {applySearchFilter().map((customer) => (
                    <tr key={customer.email}>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.state}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>

                            <div className="action-icons">
                            <button   onClick={(e)=>handleDelete(customer.id)} className="minus-icon circle-icon mr-2"> <FontAwesomeIcon icon={faMinus}/></button>
                            <button  className="icon pen-icon"  onClick={(e)=>handleEditModal(customer)}> <FontAwesomeIcon icon={faPen} /></button>
                            </div>


                        </td>

                    </tr>
                ))}
            </tbody>
        </Table>


        <ToastContainer />


        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" placeholder="Enter street"
                            value={formData.street}
                            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="Enter state"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={formData?.id==undefined ? handleAddCustomer : handleEdit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

    </>


    );
};

export default TableComponent;


