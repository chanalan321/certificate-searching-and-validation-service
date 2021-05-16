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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import CreateCertificate_component from './CreateCertificate_component';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }, 
  Dialog: {
    height : "80vh",
  },  
  form: {
    height : "100%",
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  textArea:{
    width: '100%',
  }
}));

function createData(createdAt,studentName, courseName, schoolName, courseDate,_id,createrId) {
  return { createdAt,studentName, courseName, schoolName, courseDate, _id ,createrId};
}

export default function Admin_PublishedCertificate_component() {
  const classes = useStyles();
  const location = useLocation();
  const { userId } = location.state || { userId: '' };
  const { userName } = location.state || { userName: '' };
  const [rows, setRows] = React.useState([]);
  const [searched, setSearched] = React.useState(false);
  const [schoolName, setSchoolName] = React.useState("");
  const [schoolId, setSchoolId] = React.useState("");
  const [studentName, setStudentName] = React.useState("");
  const [studentFName, setStudentFName] = React.useState("");
  const [studentLName, setStudentLName] = React.useState("");
  const [courseName, setCourseName] = React.useState("");
  const [modifyComment, setModifyComment] = React.useState("");
  const [fName, setfName] = React.useState("");
  const [auditorId, serAuditorId] = React.useState("");
  const [finishDate, setFinishDate] = React.useState("");
  const [createrId, setCreaterId] = React.useState("");
  const [transationHash, serTransationId] = React.useState("");
  const [certificateHash, serCertificateHash] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [_id, set_id] = React.useState("");
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [studentID, setStudentID] = React.useState("");

  const handleClickOpen = (event, row) => {
    setOpen(true);
    const textData = row._id;
    const searchType = "7"; 

    fetch('/searchDB', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({textData: textData, searchType: searchType})})
      .then(res => res.json())        
      .then(res => setStudentID(studentID)&set_id(textData)&serTransationId(res[0]["transationId"])&serCertificateHash(res[0]["hash"])&serAuditorId(res[0]["auditorId"])&setCreaterId(res[0]["createrId"])&setStudentLName(res[0]["studentLName"])&setStudentFName(res[0]["studentFName"])&setCourseName(res[0]["courseName"])&setSchoolName(res[0]["schoolName"])&setFinishDate(res[0]["courseDate"])&setSchoolId(res[0]["schoolId"])&setModifyComment(res[0]["modifyComment"]))
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {        
    if (!searched) {        
      const textData = userId;
      const searchType = "11"; 

      const rows_n = [];

      fetch('/searchDB', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({textData: textData, searchType: searchType})})
        .then(res => res.json())      
        .then(res => res.forEach(function(obj) { rows_n.push(createData(obj.createdAt,obj.studentName, obj.courseName, obj.schoolName, obj.courseDate, obj._id, obj.createrId)) }) )
        .then(res => setRows(rows_n))
        .then(setSearched(true))
    }
  });
  
  return(
    <React.Fragment>
    <Grid container md={12} justify="center" alignItems="center" className={classes.paper}>
        <Grid item md={11}>
    <div>
        <div><h1>Published Certificate</h1></div>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell align="center">id</TableCell>
            <TableCell align="center">Created Data</TableCell>
            <TableCell align="center">Student Name</TableCell>
            <TableCell align="center">Course Name</TableCell>
            <TableCell align="center">School Name</TableCell>            
            <TableCell align="center">Course Finish Date</TableCell>  
            <TableCell align="center">Creator Id</TableCell>                    
            <TableCell align="center">Detail</TableCell>  
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) =>                           
              <TableRow key={row._id} hover role="checkbox">
                  <TableCell align="center">
                    {row._id}
                  </TableCell>
                  <TableCell align="center">
                    {row.createdAt}
                  </TableCell>
                  <TableCell align="center">
                    {row.studentName}
                  </TableCell>
                  <TableCell align="center">{row.courseName}</TableCell>
                  <TableCell align="center">{row.schoolName}</TableCell>
                  <TableCell align="center">{row.courseDate}</TableCell>
                  <TableCell align="center">{row.createrId}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={(event) => handleClickOpen(event, row)}>
                      Detail  
                    </Button>
                  </TableCell>
              </TableRow>
            )}
        </TableBody>
        </Table>
    </TableContainer>
        
    </div>     
    </Grid>                
    </Grid>  
    
      <Dialog
        fullWidth={"md"}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Certificate Detail</DialogTitle>
        <DialogContent className={classes.Dialog}>
          <form className={classes.form} noValidate>
          <Grid container md={12} className={classes.paper}>
            <Grid item md={5} className={classes.form}>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={12} align="left">
                <Typography variant={'h6'} color={'primary'}>
                Certificate information:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} align="left">
                <TextField
                    autoComplete="certificateId"
                    name="certificateId"
                    variant="outlined"
                    required
                    fullWidth
                    value={_id}
                    id="certificateId"
                    label="Certificate Id"       
                    InputProps={{
                      readOnly: true,
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="studentLName"
                    name="lName"
                    variant="outlined"
                    required
                    fullWidth
                    value={studentLName}
                    id="studentLName"
                    label="Student Last Name"       
                    InputProps={{
                      readOnly: true,
                    }}    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="studentFName"
                    name="fName"
                    variant="outlined"
                    required
                    fullWidth
                    value={studentFName}
                    id="studentFName"
                    label="Student First Name"     
                    InputProps={{
                      readOnly: true,
                    }}              
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
                    InputProps={{
                      readOnly: true,
                    }}             
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
                    InputProps={{
                      readOnly: true,
                    }}  
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
              
            </Grid>  
            <Grid item md={5} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant={'h6'} color={'primary'}>
                Creator and Auditor Id:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="creatorId"
                    name="creatorId"
                    variant="outlined"
                    required
                    fullWidth
                    value={createrId}
                    id="creatorId"
                    label="Creator Id"       
                    InputProps={{
                      readOnly: true,
                    }}   
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="auditorId"
                    name="auditorId"
                    variant="outlined"
                    required
                    fullWidth
                    value={auditorId}
                    id="auditorId"
                    label="Auditor Id"     
                    InputProps={{
                      readOnly: true,
                    }}              
                  />
                </Grid>   
                <Grid item xs={12} sm={12}>
                  <Typography variant={'h6'} color={'primary'}>
                  Certificate Hash:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} align="left">
                <TextField
                    autoComplete="certificateHash"
                    name="certificateHash"
                    variant="outlined"
                    required
                    fullWidth
                    value={certificateHash}
                    id="certificateHash"    
                    InputProps={{
                      readOnly: true,
                    }}
                />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant={'h6'} color={'primary'}>
                  Transation Hash:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} align="left">
                  <TextareaAutosize
                    rowsMin={6}
                    className={classes.textArea}
                    value={transationHash}              
                    aria-label="maximum height"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>              
            </Grid> 
          </Grid>   
              
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>

);
}