import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import {filterEvents} from '../redux/actions'
import {eventType, openTo, price} from './EventConstants'


class Filter extends Component {
  state = {
    eventType: 'All',
    openTo: 'All',
    price: 'All'
  }

  handleChangeComboBox = (e, { value }, name) => {
    this.setState({ [name]: value })
  }

  handleSubmit= e=>{
    e.preventDefault()
    let arr =[]
    this.props.events.forEach(event=>{
      let check = true

      if(this.state.eventType !== event.event_type && this.state.eventType !== 'All'){
        check = false
      }
      if(this.state.openTo !== event.open_to && this.state.openTo !== 'All'){
        check = false
      }
      if(this.state.price !== event.price && this.state.price !== 'All'){
        check = false
      }
      if(check === true){
        arr.push(event)
      }
    })
    if (arr.length > 0){
      this.props.filterEvents(arr)
    }else {
      this.props.filterEvents(['empty'])
      alert('No events found')
    }

  }

  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal' inline>
          <Form.Select onChange={(e, value)=>this.handleChangeComboBox(e, value, 'eventType')} fluid label='Type' options={eventType} placeholder='Type' />
          <Form.Select onChange={(e, value)=>this.handleChangeComboBox(e, value, 'openTo')} fluid label='Who is this event for?' options={openTo} placeholder='Who is this event for?' />
          <Form.Select onChange={(e, value)=>this.handleChangeComboBox(e, value, 'price')} fluid label='Price' options={price} placeholder='Price' />
          <Button type='submit'>Submit</Button>
          {}
        </Form.Group>
      </Form>
    )
  }
}

const mapStateToPros = state=>{
  return {events: state.events.all.filter(event=> event.active === true)}
}

export default connect(mapStateToPros, {filterEvents})(Filter)
