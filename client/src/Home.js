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
import CertificateValidation from "./photo/CertificateValidation.png";
import DataIntegrity from "./photo/DataIntegrity.png";
import DataNonRepudiation from "./photo/DataNonRepudiation.png";
import Flip  from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import { StylesProvider } from '@material-ui/styles';


class Home extends React.Component{
    render(){
        const hero = {
            backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('https://images.pexels.com/photos/2535387/pexels-photo-2535387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')", 
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "noRepeat",
            backgroundAttachment: "fixed",
            color: "#fff",
            width: "101vw",
            marginLeft:'-8px',
            marginTop:'-8px',
        }

        const feature = {
            backgroundColor:"#F6F6F6",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "noRepeat",
            backgroundAttachment: "fixed",
            width: "100vw",
            marginLeft:'-8px',
            paddingTop:'40px',
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
            marginTop:'25vh',
            marginBottom:'25vh'
        };
        const hihihi2 = {
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
                                BLOCKCHAIN-BASED
                                </Flip>   
                                <Flip left cascade>
                                EDUCATIONAL RECORD PLATFORM
                                </Flip>                              
                                </Typography>
                                <Typography variant="h5" color="inherit" align="center" style={makeIt123}>
                                <Flip left cascade>
                                Multi-signature & Zero-knowledge proof
                                </Flip>
                                </Typography>
                                <Grid item md={2} style={makeItCenter}>
                                <Flip left cascade>
                                    <CoolButton variant="outlined" color="primary" href="#contained-buttons" fullWidth style={makeIt123} href="/search">Try it</CoolButton>
                                </Flip>
                                </Grid>
                            </div>                 
                        </Grid>       
                </div>
                </Paper>
                <Paper style={{feature}} elevation={0}> 
                <div style={feature}>
                <Grid container  md={12} justify="center" alignItems="center">
                    <Grid item md={8}>
                        
                        <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                            <Flip left cascade>
                                Feature
                            </Flip>
                        </Typography>
                        
                    </Grid>                
                </Grid>
                <Grid container md={12} justify="center" alignItems="center">
                    <Grid container md={12} justify="center" alignItems="center">                        
                        <Grid item md={4} justify="center" alignItems="center">
                            <Fade left>
                            <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                            <img  style={img2} src={DataIntegrity} alt=""/>
                            </Typography>
                            </Fade>
                        </Grid>
                        <Grid item md={5} justify="center" alignItems="center">
                            <Fade right>
                            <Typography component="h5" variant="h5" color="inherit" align="center" style={makeIt123}>
                            Data integrity
                            </Typography>
                            <Typography component="h6" variant="h6" color="inherit" align="center" style={makeIt123}>
                            we can not necessarily prevent the hacker modify the data, but we can at least know if the hash on the database does not match with the blockchain network data.
                            </Typography>
                            </Fade>
                        </Grid>
                    </Grid>
                    <Grid container md={12} justify="center" alignItems="center">   
                        <Grid item md={5} justify="center" alignItems="center">
                            <Fade left>
                            <Typography component="h5" variant="h5" color="inherit" align="center" style={makeIt123}>
                            Data non-repudiation
                            </Typography>
                            <Typography component="h6" variant="h6" color="inherit" align="center" style={makeIt123}>
                            Other than preventing the hacker modify data, we need to prove the data authenticity
                            </Typography>
                            </Fade>
                        </Grid>                     
                        <Grid item md={4} justify="center" alignItems="center">
                            <Fade right>
                            <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                            <img  style={img2} src={DataNonRepudiation} alt=""/>
                            </Typography>
                            </Fade>
                        </Grid>                        
                    </Grid>
                    <Grid container md={12} justify="center" alignItems="center">                        
                        <Grid item md={4} justify="center" alignItems="center">
                            <Fade left>
                            <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                            <img  style={img2} src={CertificateValidation} alt=""/>
                            </Typography>
                            </Fade>
                        </Grid>
                        <Grid item md={5} justify="center" alignItems="center">
                            <Fade right>
                            <Typography component="h5" variant="h5" color="inherit" align="center" style={makeIt123}>
                            Certificate validation
                            </Typography>
                            <Typography component="h6" variant="h6" color="inherit" align="center" style={makeIt123}>
                            By providing the platform to verify the educational certificate, to promote interplay between multiple stakeholders (school, students, organization) with high transparency and defense of each participant’s interest.
                            </Typography>
                            </Fade>
                        </Grid>
                    </Grid>                               
                </Grid> 
                </div>
                </Paper>
                <Paper elevation={0} style={whoCanUseIt} >
                <Grid container  md={12} justify="center" alignItems="center">
                    <Grid item md={8}>
                        <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>                            
                            <Flip left cascade>
                            Who can use it?
                            </Flip>
                        </Typography>
                    </Grid>                
                </Grid>
                <Grid container  md={12} justify="center" alignItems="center">
                    <Grid item md={3} justify="center" alignItems="center">
                        <Fade top>
                        <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                        <img  style={img} src={studentPhoto} alt=""/>
                        </Typography>
                        <Grid item md={12} justify="center" alignItems="center">
                            <Typography component="h4" variant="h4" color="inherit" align="center" style={makeIt123}>
                                Students
                            </Typography>
                        </Grid>
                        </Fade>
                    </Grid>  
                    <Grid item md={3} justify="center" alignItems="center">
                        <Fade bottom>
                        <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                        <img  style={img} src={schoolPhoto} alt=""/>
                        </Typography>
                        <Grid item md={12} justify="center" alignItems="center">
                            <Typography component="h4" variant="h4" color="inherit" align="center" style={makeIt123}>
                                School
                            </Typography>
                        </Grid>
                        </Fade>
                    </Grid>        
                    <Grid item md={3} justify="center" alignItems="center">
                        <Fade top>
                        <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                        <img  style={img} src={organizationPhoto} alt=""/>
                        </Typography>
                        <Grid item md={12} justify="center" alignItems="center">
                            <Typography component="h4" variant="h4" color="inherit" align="center" style={makeIt123}>
                            Organization
                            </Typography>
                        </Grid>
                        </Fade>
                    </Grid>        
                </Grid> 
                </Paper>
                <Paper style={hero}> 
                <div style={hero}>
                        <Grid item md={8} style={hihihi2} spacing={0}>
                            <div>
                                <Typography component="h1" variant="h3" color="inherit" align="center" style={makeIt123}>
                                <Flip left cascade>
                                Let's try it
                                </Flip>                    
                                </Typography>
                                <Typography variant="h5" color="inherit" align="center" style={makeIt123}>
                                <Flip left cascade>
                                You might be wondering: Is it really useful? 
                                </Flip>
                                <Flip left cascade>
                                If you never try you'll never know. 
                                </Flip>
                                </Typography>
                                <Grid item md={2} style={makeItCenter}>
                                <Flip left cascade>
                                    <CoolButton variant="outlined" color="primary" href="#contained-buttons" fullWidth style={makeIt123} href="/search">Try it</CoolButton>
                                </Flip>
                                </Grid>
                            </div>                 
                        </Grid>       
                </div>
                </Paper>
                <Index_Footer/>

            </Grid>


        );
    }
}

export default Home;