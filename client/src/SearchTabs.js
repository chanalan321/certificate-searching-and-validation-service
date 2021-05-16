import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

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
        <Box p={3}>
          {children}
          
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SearchTabs() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [textData, setTextData] = React.useState("");

  const openFile = (event) => {
    let status = ""; // Status output
    const fileObj = event.target.files[0];
    const reader = new FileReader();
    console.log("hihihi ")
    
        
    let fileloaded = e => {
      // e.target.result is the file's content as text
      const fileContents = e.target.result;
      console.log("fileObj: " + fileContents.length)
      // Show first 80 characters of the file
      const _id = fileContents.substring(466,490);
      history.push({ 
        pathname: '/Search/SearchResult',
            state: {
              textData: _id,
              searchType: "3"
            }
      })
    }
    
    // Mainline of the method
    fileloaded = fileloaded.bind(this);
    reader.onload = fileloaded;
    reader.readAsText(fileObj);  
    
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleValueOnChang = (event) => {
    setTextData(event.target.value);
    console.log(event.target.value)
  };

  const mystyle = {
    padding: "15px"
  };

  return (
    <div className="search">
      <AppBar position="static" color="default">
      <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Search By Name" {...a11yProps(0)} />
          <Tab label="Search By Hash" {...a11yProps(1)} />
          <Tab label="Search By Json" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Grid container md={12} justify="center" alignItems="center">
        <Grid item md={7}>
          <TextField type='text' label="Enter Name to Search" fullWidth variant="outlined" onChange={handleValueOnChang}/>
        </Grid>
        <Grid item md={2}>
          <Link to ={{
            pathname: '/Search/SearchResult',
            state: {
              textData: textData,
              searchType: "0"
            }
          }}>
            <Button variant="contained" color="primary" style={mystyle} fullWidth>Search</Button>
          </Link>
        </Grid>
      </Grid>        
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Grid container md={12} justify="center" alignItems="center">
        <Grid item md={7}>
          <TextField type='text' label="Enter Hash to Search" variant="outlined" fullWidth onChange={handleValueOnChang}/>  
        </Grid>
        <Grid item md={2}>
          <Link to ={{
            pathname: '/Search/SearchResult',
            state: {
              textData: textData,
              searchType: "1"
            }
          }}>
            <Button variant="contained" color="primary" style={mystyle} fullWidth>Search</Button>
          </Link>
        </Grid>
      </Grid>          
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid container md={12} justify="center" alignItems="center">
        <Grid item md={2}>
        <Button
          variant="contained"
          component="label"
        >
          Upload a file!
          <input type="file"
            multiple={false}
            accept=".json"
            onChange={event=>openFile(event)}    
            hidden        
          />
        </Button>          
        </Grid>
      </Grid>    
      </TabPanel>
    </div>
  );
}