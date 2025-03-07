import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    transition: 'color 0.3s',
  };

  const hoverStyle = {
    textDecoration: 'none',
    color: '#90caf9', // Light blue on hover
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={linkStyle}>
            MyWebsite
          </Link>
        </Typography>
        <Box>
                    {/* <Button color="inherit">
            <Link to="/buy" style={linkStyle}>
              Buy
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/rent" style={linkStyle}>
              Rent
            </Link>
          </Button> */}
          <Button color="inherit">
            <Link
              to="/login"
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.color = '#90caf9')}
              onMouseLeave={(e) => (e.target.style.color = 'white')}
            >
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/signup"
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.color = '#90caf9')}
              onMouseLeave={(e) => (e.target.style.color = 'white')}
            >
              Signup
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
