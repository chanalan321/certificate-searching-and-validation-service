import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import { useState, useEffect } from 'react';


export default function Worker_lowerlistItems(props) {
  const location = useLocation();
  const { userId } = location.state || { userId: '' };
  const { userName } = location.state || { userName: '' };
  //const { problemBadgeContent } = location.state || { problemBadgeContent: 5 };
  const [problemBadgeContent, setProblemBadgeContent] = React.useState(0); 
  const [reviewingBadgeContent, setReviewingBadgeContent] = React.useState(0); 

  useEffect(() => {
    fetch('/getProblemBadgeContent', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: userId})})
      .then(res => res.json())
      .then(res => setProblemBadgeContent(res.length) & console.log("ABC: " + res.length))

    fetch('/getReviewingBadgeContent', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userId})})
        .then(res => res.json())
        .then(res => setReviewingBadgeContent(res.length))
  });

  return (
    <div>
    <ListItem button component={Link} to={{
      pathname: "/Worker/ReviewingCertificate",
      state: { userId: userId,userName: userName}
    }}>
      <ListItemIcon>
        <Badge color="secondary">    
          
          <DashboardIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Reviewing Certificate" />
    </ListItem>
    <ListItem button component={Link} to={{
      pathname: "/Worker/ProblemCertificate",
      state: { userId: userId,userName: userName}
    }}>
      <ListItemIcon>
        <Badge badgeContent={problemBadgeContent} color="secondary"> 
          <ShoppingCartIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Problem Certificate" />
    </ListItem>
    <ListItem button component={Link} to={{
      pathname: "/Worker/PublishedCertificate",
      state: { userId: userId,userName: userName}
    }}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Published Certificate" />
    </ListItem>
  </div>
  );
}
