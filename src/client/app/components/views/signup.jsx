'use strict';

import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      text: ''
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleChange(e) {
    if(e.target.name === 'firstname') {
      this.setState({ first_name: e.target.value });
    } else if(e.target.name === 'lastname') {
      this.setState({ last_name: e.target.value });
    } else if(e.target.name === 'email') {
      this.setState({ email: e.target.value });
    } else {
      this.setState({ password: e.target.value });
    }
  }

  _handleClick() {
    axios.post('/api/signup', this.state)
    .then((res) => {
      console.log('response', res);
      if(typeof res.data === 'string') {
        this.setState({ 
          text: res.data,  
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        });
      } else {
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('token', res.data.token);
        this.props.router.push('/subjects');
      }
    })
    .catch((err) => {
      return console.log('err', err);
    });
  }

  render() {
    return (
      <div className='register-main-container'>
        <div className='register-container' >
          <div className='register-heading-container'>
            <div className='register-heading'>Sign up</div>
          </div>
          <div className='register-form-container'>
            <form className='register-form'>
              <div className='register-input-container'>
                <i className='fa fa-pencil register-input-icon' aria-hidden='true'></i>
                <input className='register-input' value={ this.state.first_name } type='text' name='firstname' placeholder='first name' onChange={ this._handleChange } />
              </div>
              <div className='register-input-container'>
                <i className='fa fa-pencil register-input-icon' aria-hidden='true'></i>
                <input className='register-input' value={ this.state.last_name } type='text' name='lastname' placeholder='last name' onChange={ this._handleChange } />
              </div>
              <div className='register-input-container'>
                <i className='fa fa-envelope register-input-icon' aria-hidden='true'></i>
                <input className='register-input' value={ this.state.email } type='text' name='email' placeholder='email' onChange={ this._handleChange } />
              </div>
              <div className='register-input-container'>
                <i className='fa fa-lock register-input-icon' aria-hidden='true'></i> 
                <input className='register-input' value={ this.state.password } type='password' name='password' placeholder='password' onChange={ this._handleChange } />
              </div>
              <div className='register-btn' type="submit" value="Submit" onClick={ this._handleClick }>Sign up</div>
            </form>
            { this.state.text ? <div className='register-res-text'> { this.state.text } </div> : null }
          </div> 
          <div className='register-footer signup'>
            <div className='register-footer-text'>Already have an account? <a href='/login' className='footer-link'>Log in!</a></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;