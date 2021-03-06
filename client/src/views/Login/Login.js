import React, { Component } from 'react';
import Layout from 'components/layout/layout';

class Login extends Component {
  render() {
    return (
      <div className='wrapper--vertical'>
        <h1>Login with Spotify</h1>
        <form>
          <button
            className="pill"
            title='Log in'
            formAction="http://localhost:5100/api/v1/login/new">
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default Layout(Login);
