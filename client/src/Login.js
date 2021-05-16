import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Index_Header from './Index_Header';

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {userNumber : '', password:'',id:'',typeOfUser:''}
        //設定該function的this為class本身
        this.submitForm = this.submitForm.bind(this)
        this.changeUserNumberState = this.changeUserNumberState.bind(this)
        this.changePasswordState = this.changePasswordState.bind(this)
    }    

    changeUserNumberState(event){
        //使用setState將值寫到nameVal中
        this.setState({userNumber:event.target.value}, () => console.log(this.state.userNumber))
        console.log('改了改了')
    }
    changePasswordState(event){
        //使用setState將值寫到nameVal中
        this.setState({password:event.target.value}, () => console.log(this.state.password))
        console.log('改了改了' + this.state.password)
        console.log(event.target.value)
    }

    submitForm(event){
        event.preventDefault()
        //loginUser("abc");
        const userNumber = this.state.userNumber
        const password = this.state.password
        fetch('/loginabc', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userNumber: userNumber, password: password})
        })
        .then(res => res.json())
        .then(res => { 
          if(res.userId==""|| res.typeOfUser==""){
            alert("The enter userNumber or password is wrong")
          }else{
            this.props.history.push({ 
              pathname: '/'+res.typeOfUser,
              //pathname: '/Worker',
              state: {
                  userId:res.userId,
                  typeOfUser:res.typeOfUser,
                  userName:res.userName
              }
          })
          }
        });        
    }

    

    render(){

    const paper = {
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }
    const avatar = {
            margin: 1,
            //backgroundColor: theme.palette.secondary.main,
        }
    const form = {
            width: '80%', // Fix IE 11 issue.
            minWidth: '200px',
            padding: "40px",
            marginTop:'20vh',
    }
    const submit = {
            margin: (3, 0, 2),
    }

    const makeItCenter = {
      marginLeft:'auto',
      marginRight:'auto',
    };

    const makeItRight = {
      marginLeft:'auto',
      
    };

    const hihihi = {
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'25vh',
        marginBottom:'25vh'
    };

    const hero = {
      backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')", 
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "noRepeat",
      backgroundAttachment: "fixed",
      color: "#fff",
      width: "101vw",
      height: '100vh',
      marginLeft:'-8px',
      marginTop:'-8px',
    };

  
  return (
    <Grid container  md={12} xs={12} justify="center" alignItems="center"> 
    <Paper style={hero}> 
      <div style={hero}>
        <Grid item md={8} xs={8} style={makeItCenter} spacing={0}>
          <Index_Header/>
        </Grid>
        <Grid item md={8} xs={8} style={makeItCenter} spacing={0}>
        <Grid item md={4} sm={4} xs={12} style={makeItRight} spacing={0}>
        <Paper style={form} elevation={0} variant="outlined" square> 
          <Typography component="h4" variant="h4" align="center" >
          Sign in
        </Typography>
        <form noValidate onSubmit={this.submitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userNumber"
            label="User ID"
            name="userNumber"
            autoComplete="userNumber"
            autoFocus
            onChange={this.changeUserNumberState}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.changePasswordState}
          />
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={submit}
          >
            Sign In
          </Button >
        </form>
      </Paper> 
      </Grid>              
        </Grid>       
      </div>
    </Paper>
     
    </Grid>
  );
}
}

export default Login;