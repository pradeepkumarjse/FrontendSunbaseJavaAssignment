// App.jsx

import React, { useState } from 'react';
import CustomerListComponent from './components/CustomerListComponent'
import LoginComponent from './components/LoginComponent';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken.jwttoken);
  };

  return (
    <div>
      {!token ? (
        <LoginComponent onLogin={handleLogin} />
      ) : (
        <CustomerListComponent token={token} />
      )}
    </div>
  );
};

export default App;
