import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser
          ? <NavigationAuth authUser={authUser} />
          : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div >
)

class NavigationAuthBase extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { authUser, classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to={ROUTES.HOME}>
              Home Automation
            </Link>
          </Typography>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              <Link to={ROUTES.ACCOUNT}>Account</Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              {authUser.roles.includes(ROLES.ADMIN) && (
                <Link to={ROUTES.ADMIN}>Admin</Link>
              )}
            </MenuItem>
            <MenuItem onClick={this.props.firebase.doSignOut}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }
}

const NavigationAuth = compose(
  withStyles(styles),
  withFirebase)
  (NavigationAuthBase)

const NavigationNonAuth = () => (
  <AppBar position="static">
    <Toolbar>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </Toolbar>
  </AppBar>
);

export default Navigation;