import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import qs from "qs";

import AuthHelperMethods from 'components/authHelperMethods';

/*
  A higher order component is frequently written as a function that returns
  a class.
*/
export default function withAuth(AuthComponent) {
  const Auth = new AuthHelperMethods();

  return withRouter(
    class extends Component {
      constructor(props) {
        super(props);

        this.state = {
          confirm: null
        };

        // Set the login token, if it's in the URL path
        const tokenParam = this.props.location.search
        if(tokenParam !== null && tokenParam !== ''){
          Auth.setToken(
            qs.parse(tokenParam, {
              ignoreQueryPrefix: true
            }).token
          )
        }
      }

      /*
        In the componentDidMount, we would want to do a couple of
        important tasks in order to verify the current users authentication status
        prior to granting them enterance into the app.
      */
      componentDidMount() {
        // Is it a route that should be authenticated?
        if(this.props.authenticate === true){
          if (!Auth.loggedIn()) {
            this.props.history.replace("/login");
          } else {
            /* Try to get confirmation message from the Auth helper. */
            try {
              const confirm = Auth.getConfirm();
              console.log("confirmation is:", confirm);
              this.setState({
                confirm: confirm
              });
            } catch (err) {
              /*
                Oh snap! Looks like there's an error so we'll print it out
                and log the user out for security reasons.
              */
              console.log(err);
              Auth.logout();
              this.props.history.replace("/login");
            }
          }
        }
      }

      render() {
        return (
          /* component that is currently being wrapper(App.js) */
          <AuthComponent confirm={this.state.confirm} />
        );
      }
    }
  );
}
