import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginUser, baseUrl } from '../redux/actions'

class CreateAcc extends Component {
  state={
    fullname: '',
    username: '',
    email: '',
    picture: '',
    password: ''
  }

  createNewAcc = ()=>{
    return fetch(baseUrl + "/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        fullname: this.state.fullname,
        username: this.state.username,
        email: this.state.email,
        picture: this.state.picture,
        password: this.state.password
      })
    })
  }


  handleSubmit=e=>{
    e.preventDefault()
    this.createNewAcc()
    .then(r=> {
      this.props.loginUser({username: this.state.username, password: this.state.password})
    })
    .then(()=>{
      this.setState({
        fullname: '',
        username: '',
        email: '',
        picture: '',
        password: ''
      })
      this.props.updateUserLocation()
    })
    this.props.history.push('/')
  }

  handleChange= e=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return(
      <div className='ui card login'>
        <Form onSubmit={(e)=> this.handleSubmit(e)}>
          <Form.Field>
            <h1 style={{textAlign: 'center'}}> WGO </h1>
            <p style={{textAlign: 'center'}}>Sign up to see and create events all over the world in real time</p>
            <input value={this.state.fullname} onChange={this.handleChange} name='fullname' placeholder='Full Name' />
          </Form.Field>
          <Form.Field>
            <input value={this.state.username} onChange={this.handleChange} name='username' placeholder='Username' />
          </Form.Field>
          <Form.Field>
            <input value={this.state.email} onChange={this.handleChange} name='email' placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <input value={this.state.picture} onChange={this.handleChange} name='picture' placeholder='Picture URL' />
          </Form.Field>
          <Form.Field>
            <input value={this.state.password} onChange={this.handleChange} name='password' placeholder='Password' />
          </Form.Field>

          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}



export default connect(null, {loginUser})(CreateAcc);
