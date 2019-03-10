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
import AccountCircle from '@material-ui/icons/AccountCircle';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

import styled from 'styled-components';

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

const Title = styled(Link)`
  text-decoration: none;
  color: white;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

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
          <Typography variant="h6" className={classes.grow}>
            <Title to={ROUTES.HOME}>
              Home Automation
            </Title>
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
              <StyledLink to={ROUTES.ACCOUNT}>Account</StyledLink>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              {authUser.roles.includes(ROLES.ADMIN) && (
                <StyledLink to={ROUTES.ADMIN}>Admin</StyledLink>
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
  withFirebase
)(NavigationAuthBase)

const NavigationNonAuth = () => (
  <AppBar position="static">
    <Toolbar>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </Toolbar>
  </AppBar>
);

export default Navigation;