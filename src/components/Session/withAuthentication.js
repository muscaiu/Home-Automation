import React from 'react';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

const withAuthentication = Component => {
  class WithWuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser'))
      };
    }
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        },
      );
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      console.log(this.state.authUser)
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }
  return withFirebase(WithWuthentication);
}

export default withAuthentication;
