import React, {Component, Fragment} from 'react'
import { Button, Form, Icon, Segment } from 'semantic-ui-react'
import { TimeInput } from 'semantic-ui-calendar-react';
import {fetchUpdateEvent, fetchDeleteEvent} from '../redux/actions'
import {connect} from 'react-redux'
import {eventType, openTo, price, dressCode} from './EventConstants'


class EditEvent extends Component{
  state={
    show: false,
    userEvents: [],
    id: '',
    title: '',
    description: '',
    picture: '',
    eventType: 'All',
    dressCode: 'none',
    price: 'Free',
    openTo: 'All',
    closingTime: '',
    pay: false
  }


  handleSubmit =(e)=> {
    e.preventDefault();
    this.props.fetchUpdateEvent(this.state)
    this.setState({
      show: false,
      userEvents: [],
      id: '',
      title: '',
      description: '',
      picture: '',
      eventType: 'All',
      dressCode: 'none',
      price: 'Free',
      openTo: 'All',
      closingTime: ''
    })
    this.props.history.push('/')
  }

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

  componentDidMount=()=>{
    let userEvents = []
    this.props.events.forEach(event=>{
      if(event.host.id === this.props.currentUser.id){
        userEvents.push({text: event.title, value: event})
      }
    })
    if (userEvents.length === 0){
      userEvents = [{text: 'YOU HAVE NO EVENTS YET', value: 'cw@6p57j[23vds!6%53ds@ve#]'}]
    }
    this.setState({userEvents})
  }

  handleEventChange=(e, { value }, name)=>{
    if(value !== 'cw@6p57j[23vds!6%53ds@ve#]'){
      this.setState({
        show: true,
        id: value.id,
        title: value.title,
        description: value.description,
        picture: value.picture,
        eventType: value.eventType,
        dressCode: value.dressCode,
        price: value.price,
        openTo: value.openTo,
        closingTime: value.closingTime
      })
    }
  }

  handleDeleteClick=()=>{
    this.props.fetchDeleteEvent(this.state.id)
    this.props.history.push('/')
  }

  render(){
    return (
      <Fragment>
      <div className='ui card event' style={{top: '30px', textAlign: 'center'}}>

      <Form>
        <Form.Select onChange={(e, value)=>this.handleEventChange(e, value, 'eventType')} fluid label='Events' options={this.state.userEvents} placeholder='Choose a Event' />
      </Form>

      {this.state.show ?
        <Fragment>
          <Button onClick={this.handleDeleteClick}>
            <Icon name='trash'/>
            DELETE EVENT
          </Button>
          <Form onSubmit={this.handleSubmit}>
            <h1 style={{textAlign: 'center'}}>Edit Event</h1>
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
                <Form.Select value={this.state.eventType} onChange={(e, value)=>this.handleChangeComboBox(e, value, 'eventType')} fluid label='Type' options={eventType} placeholder='Type' />
              </Segment>
              <Segment>
                <Form.Select value={this.state.dressCode} onChange={(e, value)=>this.handleChangeComboBox(e, value, 'dressCode')} fluid label='Dress Code' options={dressCode} placeholder='Dress Code' />
              </Segment>
              <Segment>
                <Form.Select value={this.state.openTo} onChange={(e, value)=>this.handleChangeComboBox(e, value, 'openTo')} fluid label='Who is this event for?' options={openTo} placeholder='Who is this event for?' />
              </Segment>
              <Segment>
                <Form.Select value={this.state.price} onChange={(e, value)=>this.handleChangeComboBox(e, value, 'price')} fluid label='Price' options={price} placeholder='Who is this event for?' />
              {this.state.pay === true ?
                <Form.Field>
                  <input value={this.state.price} onChange={this.handleChange} name='price' placeholder='Amount' />
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
        </Fragment>
      : null }
    </div>
    <br/>
    <br/>
  </Fragment>
    )
  }
}

const mapStateToProps = state=>{
  return {events: state.events.all.filter(event=> event.active === true),
    currentUser: state.user.current}
}

export default connect(mapStateToProps, {fetchUpdateEvent, fetchDeleteEvent})(EditEvent)
