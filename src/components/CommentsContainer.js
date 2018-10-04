import React, {Component, Fragment} from 'react'
import { Comment, Header, Form, Button } from 'semantic-ui-react'
import EventComment from './EventComment'
import {connect} from 'react-redux'
import {fetchNewComment, fetchDeleteComment} from '../redux/actions'


class CommentsContainer extends Component{
  state={
    comment: '',
    show: false,
    disabled: true
  }

  handleClick= ()=>{
    this.setState({show: true})
  }

  handleChange= (e)=>{
    // this.handleClick()
    if(this.props.currentUser){
      this.setState({
        comment: e.target.value
      }, ()=>{
        if(this.state.comment === ''){
          this.setState({disabled: true})
        }else {
          this.setState({disabled: false})
        }
      })
    }else{
      alert('You need to Log in to like or comment on events')
    }
  }

  handleSubmit =(e)=> {
    if(this.props.currentUser){
      e.preventDefault();
      this.props.fetchNewComment(this.state.comment, this.props.currentEvent.id)
      this.setState({comment: '', disabled: true})

    }else{
      alert('You need to Log in to like or comment on events')
    }
  }

  displayComments=()=>{
    return this.props.comments.map(comment=>{
      if(this.props.currentUser && comment.guest_id === this.props.currentUser.id){
        return <EventComment deleteComment={this.props.fetchDeleteComment} key={comment.id} comment={comment}/>
      }else{
        return <EventComment key={comment.id} comment={comment}/>
      }
    })
  }


  render(){

    const {currentEvent}= this.props
    return(
      <Fragment>
      <Comment.Group size='mini'>
        <Header as='h3' dividing>
          Comments
        </Header>
        <Comment>
          <Comment.Content>
            <Comment.Author as='a'>Admin</Comment.Author>
            <Comment.Text>{currentEvent.description}</Comment.Text>
            <Comment.Metadata>
              <span onClick={this.handleClick}>Look at all the comments</span>
            </Comment.Metadata>
            {this.state.show ?
              this.displayComments()
          : null}
          </Comment.Content>
        </Comment>
        <Form reply onSubmit={this.handleSubmit}>
          <Form.TextArea onChange={this.handleChange} value={this.state.comment} name='comment' placeholder='Write a comment' />
          <Button disabled={this.state.disabled} content='Submit' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
      </Fragment>
    )
  }
}

const mapStateToProps= state=>{
  return {
    currentEvent: state.events.selected,
    comments: state.events.commentsOfSelected,
    currentUser: state.user.current
  }
}

export default connect(mapStateToProps, {fetchNewComment, fetchDeleteComment})(CommentsContainer)
