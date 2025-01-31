import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import {Link} from 'react-router-dom';
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
      <List className="sidebarList" key="sidebar" onClick={handleDrawerClose}>
        <ListItem component={Link} to="/home" button key="home" style={{color:"white"}}>
            <Tooltip title="Home" placement="right">
              <ListItemIcon className={isActive('/home')}><HomeOutlinedIcon  /></ListItemIcon>
            </Tooltip>
            <ListItemText className="sidebarTabsText" primary="Home" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/live-tv" button key="Live TV" style={{color:"white"}}>
            <Tooltip title="Live TV" placement="right">
              <ListItemIcon className={isActive('/live-tv')}><LiveTvIcon style={{fontSize:'23px'}} /></ListItemIcon>
            </Tooltip>
            <ListItemText className="sidebarTabsText" primary="Live TV" />
        </ListItem>
        <Divider />
        <ListItem button key="vods" style={{color:"white"}}>
          <a href="https://goonj.binjee.com/">
            <Tooltip title="Binjee" placement="right">  
              <ListItemIcon className={isActive('/binjee')}><img style={{width:"25px", height:"25px", borderRadius: "8px"}} src={require('../../Assets/binjee.png')} alt="Binjee" /></ListItemIcon>
            </Tooltip>
          </a>
          <a href="https://goonj.binjee.com/" style={{color:"white"}}>
            <ListItemText className="sidebarTabsText" primary="Binjee" />
          </a>
        </ListItem>
        <Divider />
        {/* <ListItem component={Link} to="/channel/hbl-psl" button key="vods" style={{color:"white"}}>
            <Tooltip title="HBL PSL" placement="right">  
              <ListItemIcon className={isActive('/channel/hbl-psl')}><img style={{width:"25px", height:"25px", borderRadius: "8px"}} src={require('../../Assets/PopularAssets/hblpsl.jpg')} alt="HBLPSL" /></ListItemIcon>
            </Tooltip>
            <ListItemText className="sidebarTabsText" primary="HBL PSL" />
        </ListItem>
        <Divider /> */}
        <ListItem button key="comedyPortal">
          <a href="http://comedy.goonj.pk/" style={{color:"white"}}>
            <Tooltip title="Comedy Portal" placement="right">
              <ListItemIcon className={isActive('/category/comedy')}><img style={{width:"25px"}} src={require('../../Assets/cp.png')} alt="Comedy Portal" /></ListItemIcon>
            </Tooltip>
          </a>
          <a href="http://comedy.goonj.pk/" style={{color:"white"}}>
            <ListItemText className="sidebarTabsText" primary="Comedy Portal" />
          </a>
        </ListItem>
        <Divider />
        <a href={`${window.location.origin}/profile`} style={{textDecoration: "none"}}>
          <ListItem button key="profile" style={{color:"white"}}>
              <Tooltip title="User Profile" placement="right">  
                <ListItemIcon className={isActive('/profile')}><PersonOutlineOutlinedIcon /></ListItemIcon>
              </Tooltip>
              <ListItemText className="sidebarTabsText" primary="User Profile" />
          </ListItem>
        </a>
    </List>       
    )
  }
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
                style={{cursor: "default"}}
                color="inherit"
                aria-label="open drawer"
                // onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <img 
                  src={require("../../Assets/menu.png")} style={{visibility: "hidden"}} alt="menu icon" 
                />
              </IconButton>
              <IconButton 
              // onClick={handleDrawerClose}
              >
                <img 
                  src={require("../../Assets/menu.png")} style={{visibility: "hidden"}} alt="menu icon" 
                />
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
                <img src={require("../../Assets/menu.png")} alt="menu icon" />
              </IconButton>
              <IconButton onClick={handleDrawerClose}>
                <img src={require("../../Assets/menu.png")} alt="menu icon" />
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
