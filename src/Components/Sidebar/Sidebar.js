import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';
import PersonIcon from '@material-ui/icons/Person';

import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import './Sidebar.scss';
import { ClickAwayListener, Tooltip } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#14182a !important"
  },
  mobileRoot: {
    backgroundColor: "#14182a !important"
  },
  menuButton: {
    marginLeft: 5,
    marginRight: 18,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: "#14182a !important"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  hidePaper:  {
    height: "60px",
    backgroundColor: "transparent !important",
    border: "none",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  }
}));

export default function MiniDrawer(props) {
  console.log(props);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isActive = (value) => (
    window.location.pathname.startsWith(value) ? 'sidebarTabs activeTab' : 'sidebarTabs'
    )
  const ListComponent = () => {
    return(
      <List key="sidebar" onClick={handleDrawerClose}>
        <ListItem component={Link} to="/home" button key="home" style={{color:"white"}}>
            <Tooltip title="Home" placement="right">
              <ListItemIcon className={isActive('/home')}><HomeIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText className="sidebarTabsText" primary="Home" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/live-tv" button key="Live TV" style={{color:"white"}}>
            <Tooltip title="Live TV" placement="right">
              <ListItemIcon className={isActive('/live-tv')}><LanguageIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText className="sidebarTabsText" primary="Live TV" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/binjee" button key="vods" style={{color:"white"}}>
          <Tooltip title="Binjee" placement="right">  
            <ListItemIcon className={isActive('/binjee')}><img style={{width:"25px", borderRadius: "8px"}} src={require('../../Assets/binjee.png')} /></ListItemIcon>
          </Tooltip>
          <ListItemText className="sidebarTabsText" primary="Binjee" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/category/comedy/page/1" button key="comedyPortal" style={{color:"white"}}>
          <Tooltip title="Comedy Portal" placement="right">
            <ListItemIcon className={isActive('/category/comedy')}><img style={{width:"25px"}} src={require('../../Assets/cp.png')} /></ListItemIcon>
          </Tooltip>
          <ListItemText className="sidebarTabsText" primary="Comedy Portal" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/profile" button key="profile" style={{color:"white"}}>
          <Tooltip title="User Profile" placement="right">  
            <ListItemIcon className={isActive('/profile')}><PersonIcon /></ListItemIcon>
          </Tooltip>
          <ListItemText className="sidebarTabsText" primary="User Profile" />
        </ListItem>
        {/* <Hidden smUp>
          <Divider />
          <ListItem button key="searchbar">
              <ListItemText>
                <SearchBar currentRoute={window.location.pathname} />
              </ListItemText>
          </ListItem>
        </Hidden> */}
    </List>       
    )
  }
  console.log("currentRouteSidebar",window.location.pathname);
  return (
    <div>
    <div className={classes.root}>
      <Hidden mdDown>
        <CssBaseline />
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <Drawer
            anchor="left"
            variant="permanent"
            className={clsx(`${classes.drawer} drawer`, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className="">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <img src={require("../../Assets/menu.png")} />
              </IconButton>
              <IconButton onClick={handleDrawerClose}>
                <img src={require("../../Assets/menu.png")} />
              </IconButton>
            </div>
            <ListComponent />
          </Drawer>
        </ClickAwayListener>
      </Hidden>
    </div>
    <div>
      <Hidden mdUp>
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <Drawer
            anchor="right"
            variant="permanent"
            style={{display: "inline"}}
            className={clsx(`${classes.drawer} drawerMobile`, {
              [classes.drawerOpen]: open,
              [classes.hidePaper]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.hidePaper]: !open,
              }),
            }}
          >
            <div className="sidebarSMdiv">
              <IconButton
                style={{position:"relative", right:"10px"}}
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <img src={require("../../Assets/menu.png")} />
              </IconButton>
              <IconButton onClick={handleDrawerClose}>
                <img src={require("../../Assets/menu.png")} />
              </IconButton>
            </div>
            <ListComponent />
          </Drawer>
        </ClickAwayListener>
      </Hidden>
    </div>
    </div>
  );
}
