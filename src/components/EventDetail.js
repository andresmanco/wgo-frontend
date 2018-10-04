import React, {Component, Fragment} from 'react'
import { Image, Modal, Button, Icon, Label, Grid } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {unselectEvent, fetchNewLike, fetchDeleteLike, selectUser} from '../redux/actions'
import CommentsContainer from './CommentsContainer'
import {NavLink} from 'react-router-dom'

class EventDetail extends Component{
  state={
    show: true,
    likeButton: false
  }

  componentDidMount=()=>{
    if(this.props.currentUser){

      if(this.props.likes.find(like=> like.guest_id === this.props.currentUser.id)){
        this.setState({likeButton: true})
      }
    }
  }

  handleClose=()=>{
    this.setState({show: false})
    this.props.unselectEvent()
  }

  handleClick=(e)=>{
    e.stopPropagation()
    if(this.props.currentUser){
      if(this.state.likeButton){
        let id = this.props.likes.find(like=> like.guest_id === this.props.currentUser.id).id
        this.props.fetchDeleteLike(id)
      }else{
        this.props.fetchNewLike(this.props.currentEvent.id)
      }
      this.setState({likeButton: !this.state.likeButton})
    }
    else{
      alert('You need to Log in to like or comment on events')
    }
  }

  handleClickUser=(e)=>{
    e.stopPropagation()
    this.props.selectUser(this.props.currentEvent.host)
    this.handleClose()
  }


  convertDate=()=>{
    let d = new Date(this.props.currentEvent.closing_time)
    let newDate = [d.toString().split(' ')[0], d.toString().split(' ')[1], d.toString().split(' ')[2], d.toString().split(' ')[4]]
    return newDate.join(' ')
  }


  render(){
    const {currentEvent}= this.props

    return(
      <Fragment>
      <Modal
      open={this.state.show}
      closeOnEscape={true}
      closeOnDimmerClick={true}
      onClose={this.handleClose}
      centered={false}>
        <Modal.Header>
          <Grid>
            <Grid.Column width={7}>
              <NavLink onClick={this.handleClickUser} activeClassName="ui active item" className="ui item" exact to="/profile">
                <h2>
                  <Icon name='user'/>
                  {currentEvent.host.username}
                </h2>
              </NavLink>
            </Grid.Column>
            <Grid.Column width={8}>
              <h1>
                {currentEvent.title}
              </h1>
            </Grid.Column>
          </Grid>
        </Modal.Header>
        <Modal.Content image scrolling>
          <Image wrapped size='medium' src={currentEvent.picture} />
          <Modal.Description>
            <table className='ui very basic celled table'>
              <tbody>
                <tr>
                  <td className="collapsing">Type of Event</td>
                  <td>{currentEvent.event_type}</td>
                </tr>
                <tr>
                  <td>Dress code</td>
                  <td>{currentEvent.dress_code}</td>
                </tr>
                <tr>
                  <td>Target Group</td>
                  <td>{currentEvent.open_to}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{currentEvent.price}</td>
                </tr>
                <tr>
                  <td>Ending Time</td>
                  <td>{this.convertDate()}</td>
                </tr>
              </tbody>
            </table>
          </Modal.Description>
        </Modal.Content>
            {this.state.likeButton ?
              <div style={{textAlign:'center'}} >
                <Button onClick={this.handleClick} color='red'>
                  <Icon name='heart outline' />
                </Button>
                <Label as='a' basic color='red' pointing='left'>
                  {this.props.likes.length}
                </Label>
              </div>
              :
              <div style={{textAlign:'center'}} >
                <Button onClick={this.handleClick} color='red'>
                  <Icon name='heart' />
                </Button>
                <Label as='a' basic color='red' pointing='left'>
                  {this.props.likes.length}
                </Label>
              </div>
            }
        <Modal.Content>
          <CommentsContainer />
        </Modal.Content>
      </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps= state=>{
  return {
    currentEvent: state.events.selected,
    likes: state.events.likesOfSelected,
    currentUser: state.user.current
  }
}

export default connect(mapStateToProps, {unselectEvent, fetchNewLike, fetchDeleteLike, selectUser})(EventDetail)
