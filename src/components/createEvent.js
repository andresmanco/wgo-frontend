import React, {Component} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react';
import {fetchNewEvent} from '../redux/actions'
import {connect} from 'react-redux'
import {eventType, openTo, price, dressCode} from './EventConstants'


class CreateEvent extends Component{
  state={
    title: '',
    description: '',
    picture: '',
    eventType: '',
    dressCode: '',
    price: '',
    openTo: '',
    location: '',
    closingTime: '',
    pay: false
  }



  handleSubmit =(e)=> {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(p=>{
    this.setState({ location: `${p.coords.longitude} ${p.coords.latitude}`})
    this.props.fetchNewEvent(this.state)
    this.setState({
    title: '',
    description: '',
    picture: '',
    eventType: '',
    dressCode: '',
    price: '',
    openTo: '',
    location: '',
    closingTime: ''})
    this.props.history.push('/')
  })}

  handleChangeTime = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleChangeComboBox = (e, { value }, name) => {
    if(value === 'amount'){
      this.setState({pay: true, price: ''})
    }else{
      this.setState({pay: false})
    }
    this.setState({ [name]: value })
  }

  handleChange= (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return (
      <div className='ui card event' style={{top: '30px', textAlign:'center'}}>
      <Form onSubmit={this.handleSubmit}>
        <h1 style={{textAlign: 'center'}}>New Event</h1>
        <p style={{textAlign: 'center'}}>Create your own event!<br/>What are you about to do?</p>
        <Form.Field>
          <input onChange={this.handleChange} value={this.state.title} name='title' label='Title' placeholder='Title' />
        </Form.Field>
        <Form.Field>
          <input onChange={this.handleChange} value={this.state.picture} name='picture' label='Picture' placeholder='Picture URL' />
        </Form.Field>
        <Form.Field>
          <Form.TextArea onChange={this.handleChange} value={this.state.description} label='Description' name='description' placeholder='Tell us more about your the event...' />
        </Form.Field>
        <Form.Group widths='equal'>
          <Segment>
            <Form.Select onChange={(e, value)=>this.handleChangeComboBox(e, value, 'eventType')} fluid label='Type' options={eventType} placeholder='Type' />
          </Segment>
          <Segment>
            <Form.Select onChange={(e, value)=>this.handleChangeComboBox(e, value, 'dressCode')} fluid label='Dress Code' options={dressCode} placeholder='Dress Code' />
        </Segment>
        <Segment>
          <Form.Select onChange={(e, value)=>this.handleChangeComboBox(e, value, 'openTo')} fluid label='Who is this event for?' options={openTo} placeholder='Who is this event for?' />
        </Segment>
        <Segment>
          <Form.Select onChange={(e, value)=>this.handleChangeComboBox(e, value, 'price')} fluid label='Price' options={price} placeholder='Who is this event for?' />
            {this.state.pay === true ?
              <Form.Field>
                <input onChange={this.handleChange} name='price' placeholder='Amount' />
              </Form.Field>
              : null
            }
        </Segment>
        <Segment>
          <TimeInput name="closingTime" placeholder="Ending time" value={this.state.closingTime} label='Closing Time' iconPosition="left" onChange={this.handleChangeTime} />
        </Segment>
        <Button type='submit'>Submit</Button>
        </Form.Group>
      </Form>
    </div>
    )
  }
}

export default connect(null, {fetchNewEvent})(CreateEvent)
