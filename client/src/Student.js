import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import web3 from 'web3';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Flip  from 'react-reveal/Flip';
import Index_Header from './Index_Header';
import { useLocation } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";

function createData(studentName, courseName, schoolName, courseDate, publishDate, hash, hashSignature, transationId, _id,schoolId) {
    return {
        studentName,
        courseName,
        schoolName,
        courseDate,
        publishDate,
        hash,
        hashSignature,
        transationId,
        _id,
        schoolId
    };
}

class Student extends React.Component {
    state = {
        textData: null,
        id: null,
        rows: [],
        transactionHash: null,
        transactionAccount: null,
        transactionData: null,
        databaseResultHash: null,
        open: false,
        searchDBResult: null,
        correctness_Hash: "false",
        correctness_HashSignature: "false",
        correctness_TransactionAccount: "false",
        check_correctness_Hash: "false",
        check_correctness_HashSignature: "false",
        check_correctness_TransactionAccount: "false",
        get_DataHash: "false",
        fileDownloadUrl: null,
    }

    componentDidMount() {
        const  userId = this.props.location.state.userId || { userId: '' };
        const  userName = this.props.location.state.userName || { userName: '' };
        const rows_n = [];

        console.log(userId)

        fetch('/searchDB', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({searchType: "12", textData: userId})
            })
            .then(res => res.json())
            .then(res => res.forEach(function (obj) {
                rows_n.push(createData(obj.studentName, obj.courseName, obj.schoolName, obj.courseDate, obj.publishDate, obj.hash, obj.hashSignature, obj.transationId, obj._id, obj.schoolId))
            }))
            .then(res => this.setState(state => ({rows: rows_n})))
            .then(res => this.setState(state => ({transactionHash: rows_n[0]["transationId"], textData: rows_n[0]["_id"],})))
    }

    componentDidUpdate(prevState) {

        console.log("componentDidUpdate")

        if (this.state.transactionHash != null && this.state.transactionAccount == null) {
            console.log("1111")
            fetch('/getTransactionReceipt', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({transactionHash: this.state.transactionHash})
            }).then(res => res.json())
            // .then(res => console.log(res.logs[0]["data"])) .then(res => console.log(res))
                .then(res => this.setState(state => ({transactionAccount: res.from, transactionData: res.logs[0]["data"]
                //testTeam:matchfindresponse.team1.name, matchIdChanged: false
            }))).then(console.log("transactionData: " + this.state.transactionData));
        }

        if (this.state.searchDBResult != null) {
            console.log("searchDBResultYYYY")
        } else {
            console.log("searchDBResultBBBB")
            console.log("searchDBResult: " + this.state.searchDBResult)
        }

        if (this.state.get_DataHash == "false") {
            console.log("get_DataHashYYYY")
        } else {
            console.log("get_DataHashBBBB")
        }

        if (this.state.searchDBResult != null && this.state.get_DataHash == "false") {
            console.log("222222")
            fetch('/getHash', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({textData: this.state.searchDBResult})
                })
                .then(res => res.text())
                .then(res => this.setState(state => ({databaseResultHash: res})))
                .then(res => this.setState(state => ({get_DataHash: "ture"})))
                .then(console.log("transactionData: " + this.state.transactionData))
                .then(console.log("databaseResultHash: " + web3.utils.asciiToHex(this.state.databaseResultHash)))
        }

        if (web3.utils.asciiToHex(this.state.databaseResultHash) == this.state.transactionData && this.state.check_correctness_Hash == "false") {
            this.setState(state => ({correctness_Hash: "true"}))
            this.setState(state => ({check_correctness_Hash: "true"}))
            console.log("true")
        }

        if (this.state.databaseResultHash != null && this.state.correctness_HashSignature == "false" && this.state.check_correctness_HashSignature == "false") {
            fetch('/verifyHash', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({schoolId: this.state.rows[0]["schoolId"], textData: this.state.databaseResultHash, signature: this.state.rows[0]["hashSignature"]
                })
                })
                .then(res => res.text())
                .then(res => this.setState(state => ({correctness_HashSignature: res})))
                .then(res => this.setState(state => ({check_correctness_HashSignature: "true"})))
        }

        if (this.state.transactionAccount != null && this.state.correctness_TransactionAccount == "false" && this.state.check_correctness_TransactionAccount == "false") {
            fetch('/checkAccount', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({
                        //textData: this.state.transactionAccount
                        textData: this.state.transactionAccount,
                        schoolId: this.state.rows[0]["schoolId"]
                    })
                })
                .then(res => res.text())
                .then(res => this.setState(state => ({correctness_TransactionAccount: res})))
                .then(res => this.setState(state => ({check_correctness_TransactionAccount: "true"})))
        }

    }

    render() {

        const hero = {
            backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('https://images.pexels.com/photos/169677/pexels-photo-169677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')", 
            backgroundSize: "cover",
            backgroundPosition: "center Bottom",
            backgroundRepeat: "noRepeat",
            backgroundAttachment: "fixed",
            color: "#fff",
            width: "101vw",
            marginLeft:'-8px',
            marginTop:'-8px',
        };

        const makeIt123 = {
            marginTop:'40px',
            marginBottom:'40px'
        };

        const hihihi = {
            marginLeft:'auto',
            marginRight:'auto',
            marginTop:'12.5vh',
            marginBottom:'12.5vh'
        };  

        const makeItCenter = {
            marginLeft:'auto',
            marginRight:'auto',
        };

        const mystyle = {
            display: "block",
            whiteSpace: 'nowrap',
            textOverflow: "ellipsis"
        };

        const TableRowColumnStyle = {
            whiteSpace: 'nowrap',
            wordWrap: 'break-word'
        };

        const buttonStyle = {
            display: "inline",
            marginLeft: "5px"
        };

        const modal = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
        const paper = {
            background: "white",
            border: '2px solid #000',
            boxShadow: "5px",
            padding: "0px 30px 50px 30px"
        }

        const toolbar = {
            alignItems: "center",    
            marginLeft: "auto"
        }

        const toolbarTitle= {
            flex: 1,
        }

        const toolbarSecondary= {
            justifyContent: 'space-between',
            overflowX: 'auto',
        }

        const toolbarLink= {
            padding: "10px",
            paddingLeft: "25px",
            paddingRight: "25px",
            marginTop: "20px",
            flexShrink: "0",
            color:"#AEAEAE",
            textDecoration: "none" 
        }

        const toolbarLink2= {
            padding: "10px",
            paddingLeft: "50px",
            paddingRight: "50px",
            marginTop: "20px",
            flexShrink: "0",    
            marginLeft: "auto",    
            color:"#FFF",   
            textDecoration: "none"     
        }

        const userName = this.props.location.state.userName

        const handleOpen = () => {
            console.log(this.state.rows[0]["_id"])
            this.setState(state => ({open: true}));
            fetch('/searchDB', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({textData: this.state.rows[0]["_id"], searchType: "4"})
                })
                .then(res => res.json())
                .then(res => this.setState(state => ({searchDBResult: res})));

        };

        const handleClose = () => {
            this.setState(state => ({open: false}));
        };

        const handleDownload = () => {
            let output;
            output = JSON.stringify(this.state.rows);
            // Download it
            const blob = new Blob([output]);
            const fileDownloadUrl = URL.createObjectURL(blob);
            this.setState ({fileDownloadUrl: fileDownloadUrl}, 
              () => {
                this.dofileDownload.click(); 
                URL.revokeObjectURL(fileDownloadUrl);  // free up storage--no longer needed.
                this.setState({fileDownloadUrl: ""})
            })    
          };


        return (
            <Grid container md={12} justify="center" alignItems="center">
                <Paper style={hero}> 
                <div style={hero}>

                        <Grid item md={8} style={makeItCenter} spacing={0}>
                        <Toolbar style={toolbar}>
                            <Link
                                color="inherit"
                                noWrap
                                variant="body2"
                                style={toolbarLink2}
                                onClick={event => event.preventDefault()}>
                            {"Hi  " + userName}
                            </Link>
                            <Link 
                                onClick={() => {
                                this.props.history.push({ 
                                    pathname: '/Login'
                                });    
                                }}
                                color="inherit"
                                noWrap
                                variant="body2"
                                underlineHover
                                style={toolbarLink}>
                            Logout
                            </Link>
                        </Toolbar>
                        </Grid>
                        <Grid item md={8} style={hihihi} spacing={0}>
                            <div>
                                <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                                    <Flip left cascade>
                                    Certificate Data   
                                    </Flip>                                                  
                                </Typography>
                            </div>                 
                        </Grid>       
                </div>            
                </Paper>
                <Grid item md={8}>
                    <div style={makeIt123}>
                        <TableContainer component={Paper} style={mystyle}>
                            <Table aria-label="simple table">
                                {this
                                    .state
                                    .rows
                                    .map((row) => (
                                        <TableBody>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center">Student Name:</TableCell>
                                                <TableCell align="left">{row.studentName}</TableCell>
                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center">Course Name:</TableCell>
                                                <TableCell align="left">{row.courseName}</TableCell>
                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center">School Name:</TableCell>
                                                <TableCell align="left">{row.schoolName}</TableCell>
                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center">Course Finish Date:</TableCell>
                                                <TableCell align="left">{row.courseDate}</TableCell>
                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center">Data Insert Date:</TableCell>
                                                <TableCell align="left">{row.publishDate}</TableCell>
                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center">Data Hash:</TableCell>
                                                <TableCell align="left">{row.hash}</TableCell>
                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center">Hash Signature:</TableCell>

                                                <TableCell maxWidth="50px" align="left">
                                                    {row
                                                        .hashSignature
                                                        .substring(0, row.hashSignature.length / 2)}
                                                </TableCell>

                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center"></TableCell>

                                                <TableCell maxWidth="50px" align="left">
                                                    {row
                                                        .hashSignature
                                                        .substring(row.hashSignature.length / 2, row.hashSignature.length)}
                                                </TableCell>

                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center">Transaction Account:</TableCell>
                                                <TableCell align="left">{this.state.transactionAccount}</TableCell>
                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center">Transaction Id:</TableCell>
                                                <TableCell align="left">
                                                    <a target="_blank" href={"https://ropsten.etherscan.io/tx/" + row.transationId}>{row.transationId}</a>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow style={TableRowColumnStyle}>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="right">
                                                    <Button variant="contained" color="primary" style={buttonStyle} onClick={handleDownload}>Get Json</Button>
                                                    <a hidden = "true"
                                                        download="Certificate.json"
                                                        href={this.state.fileDownloadUrl}
                                                        ref={e=>this.dofileDownload = e}
                                                    >download it</a>

                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        style={buttonStyle}
                                                        onClick={handleOpen}>Verfy Data</Button>

                                                    <Modal
                                                        aria-labelledby="transition-modal-title"
                                                        aria-describedby="transition-modal-description"
                                                        open={this.state.open}
                                                        onClose={handleClose}
                                                        closeAfterTransition
                                                        BackdropComponent={Backdrop}
                                                        BackdropProps={{
                                                        timeout: 500
                                                    }}
                                                        display='flex'
                                                        alignItems='center'
                                                        style={modal}>
                                                        <Fade in={this.state.open}>
                                                            <div style={paper}>
                                                                <h2 id="transition-modal-title">Blockchain data validation</h2>
                                                                <table>
                                                                    <tr>
                                                                        <td>Student Name:</td>
                                                                        <td>{this.state.rows[0]["studentName"]}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>School Name:</td>
                                                                        <td>{this.state.rows[0]["schoolName"]}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Course Name:</td>
                                                                        <td>{this.state.rows[0]["courseDate"]}</td>
                                                                    </tr>
                                                                </table>
                                                                <Divider variant="middle"/>
                                                                <table>
                                                                    <tr>
                                                                        <td>Correctness Hash:</td>
                                                                        <td>{this.state.correctness_Hash}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Correctness HashSignature:</td>
                                                                        <td>{this.state.correctness_HashSignature}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Correctness TransactionAccount:</td>
                                                                        <td>{this.state.correctness_TransactionAccount}</td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </Fade>
                                                    </Modal>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ))}
                            </Table>
                        </TableContainer>

                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default Student;