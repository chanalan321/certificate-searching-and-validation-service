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


const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
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

function createData(createdAt,studentName, courseName, schoolName, courseDate,_id) {
  return { createdAt,studentName, courseName, schoolName, courseDate, _id };
}

export default function ReviewingCertificate_component() {
  const classes = useStyles();
  const location = useLocation();
  const { userId } = location.state || { userId: '' };
  const { userName } = location.state || { userName: '' };
  const [rows, setRows] = React.useState([]);
  const [searched, setSearched] = React.useState(false);
  const [schoolName, setSchoolName] = React.useState("");
  const [fName, setfName] = React.useState("");
  const [lName, setlName] = React.useState("");
  const [courseName, setCourseName] = React.useState("");
  const [finishDate, setFinishDate] = React.useState("");

  useEffect(() => {        
    if (!searched) {        
      const textData = userId;
      const searchType = "5"; 

      const rows_n = [];

      fetch('/searchDB', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({textData: textData, searchType: searchType})})
        .then(res => res.json())      
        .then(res => res.forEach(function(obj) { rows_n.push(createData(obj.createdAt,obj.studentName, obj.courseName, obj.schoolName, obj.courseDate, obj._id)) }) )
        .then(res => setRows(rows_n))
        .then(setSearched(true))
    }
  });
  
  return(
    <Grid container md={12} justify="center" alignItems="center" className={classes.paper}>
        <Grid item md={11}>
    <div>
        <div><h1>Reviewing Certificate</h1></div>
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
              </TableRow>
            )}
        </TableBody>
        </Table>
    </TableContainer>
        
    </div>     
    </Grid>                
    </Grid>       
);
}