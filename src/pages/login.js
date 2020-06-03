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
  componentWillUnmount(){
    console.log("Component Deleted");
  }
  render(){
    return(
    <>
      <button className="right" >Sign Up</button>
    </>
  )}
}

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      hello: true
    }
  }

  login = (input) => {
    input.preventDefault()

    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.hello);
    
  }

  toggleButton = () => {
    const answer = prompt("are you sure?")
    switch (answer){
      case 'YES': {
        this.setState({hello: !this.state.hello})
        break;
      }
    }
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
                <img src={logo} alt=""/>
              </div>
          <div className="form-detail">
            <p className="form-header">Login</p>
            <p className="form-header-subtitle"><small>Welcome Back, Please Login <br/>to your account</small></p>
            <form action="" onSubmit={(e) => this.login(e)}>
              <div className="form-input">
                <ul>
                  <li>
                    <label >Email Address</label>
                    <input type="text" onChange={input => this.setState({email: input.target.value})}/>
                  </li>
                  <li>
                    <label>Password</label>
                    <input type="password" onChange={input => this.setState({password: input.target.value})}/>
                  </li>
                </ul>
              </div>
              <div className="options">
                <ul>
                  <li>
                    <input type="checkbox" name="" id=""/>
                    <label >Remember me</label>
                  </li>
                  <li>
                    <a >Forgot Password</a>
                  </li>
                </ul>
              </div>
              <div className="button">
                <button className="left" type="Submit" onClick={this.toggleButton}>Login</button>
                {this.state.hello && <Button />}
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
    )
  }
}

export default Login