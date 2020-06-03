import React, {Component} from 'react'

import logo from '../assets/bookshelf.png'

class Button extends Component {
  constructor(props){
    super(props)
    console.log("this is constructor");
  }
  componentDidMount(){
    console.log("Component Rendered");
  }
  render(){
    return(
    <>
      <button className="right">Login</button>
    </>
  )}
}

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      fullName: '',
      email: '',
      password: '',
      hello: true,
    }
  }
  register = (input) => {
    input.preventDefault()

    console.log(this.state.username);
    console.log(this.state.fullName);
    console.log(this.state.email);
    console.log(this.state.password);

  }

  render(){
    return(
      <>
      <div className="content">
      <div className="form-wrapper">
        <div className="library-background"> 
          <div className="darken">
            <div className="titles">
              <div className="quote">
                Book is a window <br/> to the world 
                <small>, katanya</small> 
              </div>
              <div className="photo-watermark">
                Photo by Mark Pan4ratte on Unsplash
              </div>
            </div>
          </div>
        </div>
        <div className="form">
          <div className="logo">
            <img src={logo}alt=""/>
          </div>
          <div className="form-detail">
            <p className="form-header">Register</p>
            <p className="form-header-subtitle"><small>Welcome Back, Please Register <br/>to your account</small></p>
            <form action="" onSubmit={(e) => this.register(e)} >
              <div className="form-input">
                <ul>
                  <li>
                    <label for="userName">Username</label>
                    <input type="text" onChange={input => this.setState({username: input.target.value})}/>
                  </li>
                  <li>
                    <label for="fullName">Full Name</label>
                    <input type="text" onChange={input => this.setState({fullName: input.target.value})}/>
                  </li>
                  <li>
                    <label for="email">Email Address</label>
                    <input type="email" onChange={input => this.setState({email: input.target.value})}/>
                  </li>
                  <li>
                    <label for="password">Password</label>
                    <input type="password" onChange={input => this.setState({password: input.target.value})}/>
                  </li>
                </ul>
              </div>
              <div className="button">
                <button className="left" type="submit">Sign Up</button>
                <Button />
              </div>
            </form>
          </div>
          <div className="terms">
            <p>By signing up, you agree to Book’s <br/><a>Terms and Conditions </a>&<a> Privacy Policy</a></p>
          </div>
        </div>
      </div>
    </div>

    </>
  )}
}

export default Register