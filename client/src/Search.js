import React from 'react';
import SearchTabs from './SearchTabs';
import Index_Header from './Index_Header';
import Index_Footer from './Index_Footer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import schoolPhoto from "./photo/school.jpg";
import organizationPhoto from "./photo/company.jpg";
import studentPhoto from "./photo/student.jpg";
import Flip  from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import { StylesProvider } from '@material-ui/styles';

class Search extends React.Component{
    render(){
        const hero = {
            backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('https://images.pexels.com/photos/373893/pexels-photo-373893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')", 
            backgroundSize: "cover",
            backgroundPosition: "center Bottom",
            backgroundRepeat: "noRepeat",
            backgroundAttachment: "fixed",
            color: "#fff",
            width: "101vw",
            marginLeft:'-8px',
            marginTop:'-8px',
        }

        const searchTabs = {
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "noRepeat",
            backgroundAttachment: "fixed",
            width: "100vw",
            marginLeft:'-8px',
            paddingTop:'30px',
            paddingBottom:'40px'
        }

        const whoCanUseIt = {
            paddingTop:'80px',
            paddingBottom:'80px'
        }

        const makeIt123 = {
            marginTop:'30px',
            marginBottom:'40px'
        };
        const makeItCenter = {
            marginLeft:'auto',
            marginRight:'auto',
        };
        const hihihi = {
            marginLeft:'auto',
            marginRight:'auto',
            marginTop:'12.5vh',
            marginBottom:'12.5vh'
        };        
        const img = {
            width:"70%",
            borderRadius: "50%"
        };

        const img2 = {
            width:"50%"
        };

        const CoolButton = withStyles({
            root: {
                boxShadow: 'none',
                textTransform: 'none',
                fontSize: 16,
                padding: '6px 12px',
                border: '1px solid',
                lineHeight: 1.5,              
                color: '#fff',
                borderColor: '#fff',
            },
            "&:hover": {
                backgroundColor: '#fff',
                borderColor: '#fff',
                color: '#000000',
            },
            '&:focus': {
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                borderColor: '#fff',
                color: '#000000',
            },
        })(Button); 

        return(
            <Grid container  md={12} justify="center" alignItems="center"> 
            <Paper style={hero}> 
            <div style={hero}>

                    <Grid item md={8} style={makeItCenter} spacing={0}>
                        <Index_Header/>
                    </Grid>
                    <Grid item md={8} style={hihihi} spacing={0}>
                        <div>
                            <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                                <Flip left cascade>
                                    Search Certificate    
                                </Flip>                                                  
                            </Typography>
                        </div>                 
                    </Grid>       
            </div>            
            </Paper>
            <Paper style={searchTabs} elevation={0}> 
                <div style={searchTabs}>
                <Grid container  md={12} justify="center" alignItems="center">
                    <Grid item md={8}>
                        <SearchTabs/>                        
                    </Grid>                                                 
                </Grid> 
                </div>
            </Paper>

        </Grid>
        );
    }
}
export default Search;
