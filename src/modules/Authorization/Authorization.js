import React from 'react'
import Login from './components/Login/Login'
import './Authorization.css'
import '../../common/css/style.css'
import logo from '../../logo.svg';
import SignInWithGoogleBtn from './components/SignInWithGoogleBtn/SignInWithGoogleBtn'
import Register from './components/Register/Register';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Authorization() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='page'>
      <div className='wrapper'>
        <div className='auth'>
          <div className='auth-side'>
            <img src={logo} className="logo" alt="logo" />
            <h1>Welcome Page</h1>
            <p>Here is DashboardApp</p>
            <p>If you have a Google account - you can use the button below to login.</p>
            <SignInWithGoogleBtn />
          </div>
          <div className='form-side'>
            <h2>Autherization form</h2>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={value} 
                  onChange={handleChange} 
                  aria-label="basic tabs example"  
                >
                  <Tab label="Login" {...a11yProps(0)} />
                  <Tab label="Register" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0} active>
                <Login />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Register />
              </TabPanel>
            </Box>     
          </div>
        </div>
      </div>
    </div>
    
  )
}