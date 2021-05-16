import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function createData(studentName, courseName, schoolName, courseDate,_id) {
    return { studentName, courseName, schoolName, courseDate, _id };
}
class SearchResult extends React.Component{
    state = {
        textData: null,
        searchType: null,
        rows: []
    }    

    componentDidMount () {
        const textData = this.props.location.state.textData;
        const searchType = this.props.location.state.searchType;        

        const rows_n = [];

        fetch('/searchDB', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({textData: textData, searchType: searchType})})
            .then(res => res.json())
            .then(res => res.forEach(function(obj) { rows_n.push(createData(obj.studentName, obj.courseName, obj.schoolName, obj.courseDate, obj._id)) }) )
            .then(res => this.setState(state => ({ 
                rows: rows_n,
                textData: textData,
                searchType: searchType
            })))
            
      }

    componentDidUpdate(prevState){

        if (this.props.location.state.textData != this.state.textData) {
            const textData = this.props.location.state.textData;
            const searchType = this.props.location.state.searchType;
            this.setState(state => ({ textData: textData }));
            this.setState(state => ({ searchType: searchType }));      
            
            const rows_n = [];
            
            fetch('/searchDB', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({textData: textData, searchType: searchType})})
                .then(res => res.json())
                .then(res => res.forEach(function(obj) { rows_n.push(createData(obj.studentName, obj.courseName, obj.schoolName, obj.courseDate, obj._id)) }) )
                .then(res => this.setState(state => ({ rows: rows_n })));
        }
    }
    

    render(){

        const mystyle = {
            marginBottom:'160px'
          };

        const makeIt123 = {
            marginTop:'-40px',
            marginBottom:'40px'
        };


        const handleClick = (event, _id) => {
            this.props.history.push({ 
                pathname: '/SearchResultDetail',
                state: {
                    _id: _id,
                    textData: this.state.textData,
                    searchType: this.state.searchType
                  }
            });    
        };

        return(
            <Grid container md={12} justify="center" alignItems="center">
                <Grid item md={8}>
            <div>
                <Typography component="h4" variant="h4" color="inherit" align="left" style={makeIt123}>
                    This is the result of searching {this.state.textData} :                                                  
                </Typography>
                <TableContainer component={Paper} style={mystyle}>
                <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell align="center">Student Name</TableCell>
                    <TableCell align="center">Course Name</TableCell>
                    <TableCell align="center">School Name</TableCell>
                    <TableCell align="center">Course Finish Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.rows.map((row) =>                           
                    <TableRow key={row._id} hover onClick={(event) => handleClick(event, row._id)} role="checkbox">
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
}

export default SearchResult;