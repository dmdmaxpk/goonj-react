import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import HomeIcon from '@material-ui/icons/Home';
import VideocamIcon from '@material-ui/icons/Videocam';
import LanguageIcon from '@material-ui/icons/Language';
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PersonIcon from '@material-ui/icons/Person';

import './Sidebar.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#14182a !important"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        anchor={"left"}
        variant="permanent"
        className={clsx(classes.drawer, {
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
        <List>
          {/* {['Home', 'Video', 'World', 'Cricket', 'All mail', 'User'].map((text, index) => ( */}
            <ListItem button key="home" style={{color:"white"}}>
                {/* <img className="activeTabImg" src={require('../../Assets/searchBg.png')} /> */}
                <ListItemIcon className="sibebarTabs activeTab"><HomeIcon /></ListItemIcon>
                <ListItemText className="sidebarTabsText" primary="Home" />
            </ListItem>
            <Divider />
            <ListItem button key="vods" style={{color:"white"}}>
                <ListItemIcon className="sibebarTabs"><VideocamIcon /></ListItemIcon>
                <ListItemText className="sidebarTabsText" primary="Video On Demand" />
            </ListItem>
            <Divider />
            <ListItem button key="world" style={{color:"white"}}>
                <ListItemIcon className="sibebarTabs"><LanguageIcon /></ListItemIcon>
                <ListItemText className="sidebarTabsText" primary="World" />
            </ListItem>
            <Divider />
            <ListItem button key="cricket" style={{color:"white"}}>
                <ListItemIcon className="sibebarTabs"><SportsCricketIcon /></ListItemIcon>
                <ListItemText className="sidebarTabsText" primary="Cricket" />
            </ListItem>
            <Divider />
            <ListItem button key="content" style={{color:"white"}}>
                <ListItemIcon className="sibebarTabs"><SupervisedUserCircleIcon /> </ListItemIcon>
                <ListItemText className="sidebarTabsText" primary="Unknown Section" />
            </ListItem>
            <Divider />
            <ListItem button key="profile" style={{color:"white"}}>
                <ListItemIcon className="sibebarTabs"><PersonIcon /></ListItemIcon>
                <ListItemText className="sidebarTabsText" primary="User Profile" />
            </ListItem>
          {/* ))} */}
        </List>
      </Drawer>
    </div>
  );
}
