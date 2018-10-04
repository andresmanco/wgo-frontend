import React, {Component, Fragment} from 'react'
import { Segment, Grid, Image, Button, Card } from 'semantic-ui-react'
import {selectEvent, selectUser} from '../redux/actions'
import EventDetail from './EventDetail'
import {connect} from 'react-redux'

class Profile extends Component{


  componentDidMount= ()=>{
    if(!this.props.selectedUser){
      if(this.props.currentUser){
        this.props.selectUser(this.props.currentUser)
      }
    }
  }

  handleClick= id=>{
    this.props.selectEvent(id)
  }

  displayAllEvents=()=>{
    let userEvents = this.props.events.filter(event=>event.host.id === this.props.selectedUser.id)
    return userEvents.map(event=>{
      return (
        <Card onClick={()=>this.handleClick(event.id)} key={event.id}>
          <Card.Header style={{textAlign: 'center'}}>{event.title}</Card.Header>
          <Image size='small' src={event.picture}/>
        </Card>
      )
    })
  }

  render(){
    return(
      <Fragment>
        {this.props.selectedUser ?
          <Segment style={{top: '30px'}}>
            <Grid >
              <Grid.Column width={7}>
              <Image size='medium' src={this.props.selectedUser.picture} />
              </Grid.Column>
              <Grid.Column width={6}>
              <h2 style={{textAlign: 'center'}}>{this.props.selectedUser.username}</h2>
              {this.props.selectedUser.fullname}
              <br/>
              {this.props.selectedUser.email}
              <br/>
              {this.props.selectedUser.about}
              </Grid.Column>
            </Grid>
            <Card.Group itemsPerRow={3}>
              {this.displayAllEvents()}
            </Card.Group>
            {this.props.currentEvent !== null ?
            <EventDetail />
            : null }
          </Segment>
        : null}

      </Fragment>
    )
  }
}

const mapStateToProps = state=>{
  return {
    currentUser: state.user.current,
    selectedUser: state.user.selected,
    events: state.events.all,
    currentEvent: state.events.selected
   }
}

export default connect(mapStateToProps, {selectEvent, selectUser})(Profile)
