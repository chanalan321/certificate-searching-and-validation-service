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


export default function Worker_lowerlistItems() {
  const location = useLocation();
  const { userId } = location.state || { userId: '' };
  const { userName } = location.state || { userName: '' };
  const [modifiedBadgeContent, setModifiedBadgeContent] = React.useState(0); 

  useEffect(() => {
    fetch('/getModifiedBadgeContent', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: userId})})
      .then(res => res.json())
      .then(res => setModifiedBadgeContent(res.length) & console.log("ABC: " + res.length))
  });

  return (
    <div>
    <ListItem button component={Link} to={{
      pathname: "/Admin/ModifiedCertificate",
      state: { userId: userId,userName: userName}
    }}>
      <ListItemIcon>
        <Badge badgeContent={modifiedBadgeContent} color="secondary"> 
          <ShoppingCartIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Modified Certificate" />
    </ListItem>
    <ListItem button component={Link} to={{
      pathname: "/Admin/PublishedCertificate",
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
