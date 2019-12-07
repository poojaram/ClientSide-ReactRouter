import React, { Component } from 'react'; //import React Component

import './SignUpForm.css'; //load module CSS

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle': undefined,
      'avatar': '' //default to blank value
    }; 
  }

  //update state for specific field
  handleChange(event) {
    let field = event.target.name; //which input
    let value = event.target.value; //what value

    let changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  //handle signUp button
  handleSignUp(event) {
    event.preventDefault(); //don't submit
    let avatar = this.state.avatar || 'img/no-user-pic.png'; //default to local pic
    this.props.signUpCallback(this.state.email, this.state.password, this.state.handle, avatar);
  }

  //handle signIn button
  handleSignIn(event) {
    event.preventDefault(); //don't submit
    this.props.signInCallback(this.state.email, this.state.password);
  }

  render() {
    return (
      <form>
        {/* email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" 
            id="email" 
            type="email" 
            name="email"
            onChange={(e) => this.handleChange(e)}
            />
        </div>
        
        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" 
            id="password" 
            type="password"
            name="password"
            onChange={(e) => this.handleChange(e)}
            />
        </div>

        {/* handle */}
        <div className="form-group">
          <label htmlFor="handle">Handle</label>
          <input className="form-control" 
            id="handle" 
            name="handle"
            onChange={(e) => this.handleChange(e)}
            />
        </div>

        {/* avatar */}
        <div className="form-group">
          <img className="avatar" src={this.state.avatar || 'img/no-user-pic.png'} alt="avatar preview" />
          <label htmlFor="avatar">Avatar Image URL</label>
          <input className="form-control" 
            id="avatar" 
            name="avatar" 
            placeholder="http://www.example.com/my-picture.jpg" 
            onChange={(e) => this.handleChange(e)} 
            />
        </div>

        {/* buttons */}
        <div className="form-group">
          <button className="btn btn-primary mr-2" 
            onClick={(e) => this.handleSignUp(e)}
          >
            Sign-up
          </button>
          <button className="btn btn-primary"
            onClick={(e) => this.handleSignIn(e)}
          >
            Sign-in
          </button>
        </div>
      </form>
    )
  }
}

export default SignUpForm