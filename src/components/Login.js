import React, {Component} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions'
// import { withRouter } from 'react-router-dom'

class Login extends Component{
  state={
    username: '',
    password: ''
  }


  handleSubmit =(e)=> {
    e.preventDefault();
    this.props.loginUser(this.state)
    .then(()=> this.props.updateUserLocation())
    this.setState({username: '', password: ''})
    this.props.history.push('/')
  };

  handleChange= (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render(){

    return (
      <div className='ui card login'>
      <Form onSubmit={this.handleSubmit}>
        <h1 style={{textAlign: 'center'}}> WGO </h1>
        <Form.Field>
          <input onChange={this.handleChange} value={this.state.username} name='username' placeholder='User' />
        </Form.Field>
        <Form.Field>
          <input onChange={this.handleChange} value={this.state.password} name='password' placeholder='Password' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
    );
  }
}


export default connect(null, {loginUser})(Login)
