import React, { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import './styles.css'
import logo from './logo.jpg';
import './Acercade';
import { Container, Nav, Navbar } from 'react-bootstrap';
<link href='https://fonts.googleapis.com/css?family=Acme' rel='stylesheet'></link>

const ToggleDivs = () => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstDivVisible, setIsFirstDivVisible] = useState(false);
  const [isSecondDivVisible, setIsSecondDivVisible] = useState(false);

  useEffect(() => {
    const initAuthClient = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        setIsAuthenticated(true);
      }
    };

    initAuthClient();
  }, []);

  const handleLogin = async () => {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        console.log("Login successful!");
        setIsAuthenticated(true);
      },
      onError: (err) => {
        console.error("Login failed:", err);
      }
    });
  };

  const handleLogout = async () => {
    await authClient.logout();
    setIsAuthenticated(false);
  };

  const handleFirstButtonClick = () => {
    setIsFirstDivVisible(!isFirstDivVisible);
  };

  const handleSecondButtonClick = () => {
    setIsSecondDivVisible(!isSecondDivVisible);
  };

  return (
    <>
      <div className='divbienv'>
        <h1 style={{ fontFamily: 'Acme' }}>¡Bienvenido!</h1>
      </div>

      <img src={logo} alt="Logo" />

      <div>
        <button className='botontemp' onClick={handleFirstButtonClick}>
          {isFirstDivVisible ? 'Ocultar' : 'Mostrar'} Temperatura
        </button>
        {isFirstDivVisible && (
          <div className="divtemp">
            <div className='inftemp'>
              <h1>Temperatura actual:</h1>

                  <div className='circulo4'><center>23 °C</center></div>                  
                  <div className='circulo3'></div>

            </div>
          </div>
        )}

        <button className='botonreco' onClick={handleSecondButtonClick}>
          {isSecondDivVisible ? 'Ocultar' : 'Mostrar'} Cantidad de agua
        </button>
        {isSecondDivVisible && (
          <div className="divreco">
            <div className='infreco'>
                <h3>Cantidad de agua generada:</h3>
                
                  <div className='circulo2'><center>10.03 L</center></div>                  
                  <div className='circulo'></div>
                
                
               </div>
          </div>
        )}
      </div>

      {/* Navbar */}
      <Navbar expand="lg" className='navinicio'>
        <Container fluid className='cont'>
          <Navbar.Brand href="#" style={{ color: "white", fontFamily: "cursive" }}>Moisture Water</Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0 " style={{ maxHeight: '100px' }}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout} style={{ color: 'white' }}>Cerrar Sesión</Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogin} style={{ color: 'white' }}>Iniciar Sesión</Nav.Link>
            )}
            <Nav.Link href="AcercaDe" style={{color:'white'}}>Acerca de</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default ToggleDivs;
