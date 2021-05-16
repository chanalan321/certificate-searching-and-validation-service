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
import { useState, useEffect } from 'react';
import Badge from '@material-ui/core/Badge';


export default function Worker_upperlistItems() {
  const location = useLocation();
  const { userId } = location.state || { userId: '' };
  const { userName } = location.state || { userName: '' };
  const [auditBadgeContent, setAuditBadgeContent] = React.useState(0); 

  useEffect(() => {
    fetch('/getAuditBadgeContent', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: userId})})
      .then(res => res.json())
      .then(res => setAuditBadgeContent(res.length) & console.log("ABC: " + res.length))
  });
  

  return (
    <div>
    <ListItem button component={Link} to={{
      pathname: "/Admin/AuditCertificate",
      state: { userId: userId,userName: userName}
    }}>
      <ListItemIcon>
        <Badge badgeContent={auditBadgeContent} color="secondary"> 
          <DashboardIcon />
        </Badge>
      </ListItemIcon>      
      <ListItemText primary="Audit Certificate" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        
      </ListItemIcon>
      <ListItemText primary="" />
    </ListItem>   
    
  </div>
  );
}
