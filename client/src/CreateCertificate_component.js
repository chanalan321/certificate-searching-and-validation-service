import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function CreateCertificate_component() {
  const classes = useStyles();
  const location = useLocation();
  const { userId } = location.state || { userId: '' };
  const { userName } = location.state || { userName: '' };
  const [schoolId, setSchoolId] = React.useState("");
  const [schoolName, setSchoolName] = React.useState("");
  const [fName, setfName] = React.useState("");
  const [lName, setlName] = React.useState("");
  const [studentID, setStudentID] = React.useState("");
  const [courseName, setCourseName] = React.useState("");
  const [finishDate, setFinishDate] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  useEffect(() => {
    fetch('/getUserSchoolId_Name', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: userId})})
      .then(res => res.json())      
      .then(res => setSchoolName(res.schoolName) & setSchoolId(res.schoolId));
    
    if (snackbarOpen) {
      console.log("Snackbar Open")
    }
  });  

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    if (studentID != "" && schoolName != "" && fName != "" && lName != "" && courseName != "" && finishDate != "" && schoolId != "") {
      fetch('/initialCertificate', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({studentID: studentID,createrId: userId,studentFName: fName,studentLName: lName,schoolName: schoolName,courseName: courseName,finishDate: finishDate,schoolId: schoolId})})
        .then(res => res.json())      
        .then(res => alert(res))
        .then(setSnackbarOpen(true))
    }else{
      alert("All field should be filled.")
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      <CssBaseline />
      <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Certificate
        </Typography>
      <div className={classes.paper}>        
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="studentLName"
                name="lName"
                variant="outlined"
                required
                fullWidth
                value={lName}
                id="studentLName"
                label="Student Last Name"       
                onChange={e => setlName(e.target.value)}    
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="studentFName"
                name="fName"
                variant="outlined"
                required
                fullWidth
                value={fName}
                id="studentFName"
                label="Student First Name"     
                onChange={e => setfName(e.target.value)}              
              />
            </Grid>      
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="studentID"
                name="studentID"
                variant="outlined"
                required
                fullWidth
                value={studentID}
                id="studentID"
                label="Student ID"     
                onChange={e => setStudentID(e.target.value)}              
              />
            </Grid>        
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="courseName"
                label="Course Name"
                name="courseName"
                value={courseName}
                onChange={e => setCourseName(e.target.value)}   
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="schoolName"
                label="school Name"
                name="schoolName"
                value={schoolName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="finishDate"
                label="Course Finish Date"
                type="date"
                fullWidth
                className={classes.textField}
                value={finishDate}
                onChange={e => setFinishDate(e.target.value)}  
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            InputLabelProps={{
              shrink: true,
            }}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Certificate Created Successfully"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}