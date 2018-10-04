import React from 'react'
import {Comment, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'

const EventComment = props =>{

  function user() {
    return props.users.find(user=> user.id === props.comment.guest_id)
  }

  function convertDate(){
    let d = new Date(props.comment.created_at)
    let newDate = [d.toString().split(' ')[0], d.toString().split(' ')[1], d.toString().split(' ')[2], d.toString().split(' ')[4]]
    return newDate.join(' ')
  }


  return(
    <Comment>
      <Comment.Content>
        <Comment.Author>{user().username}</Comment.Author>
        <Comment.Metadata>
          <div>{convertDate()}</div>
        </Comment.Metadata>
        <Comment.Text>
          {props.comment.content}
        </Comment.Text>
        {props.deleteComment ?
          <Icon name="trash" onClick={()=>props.deleteComment(props.comment.id)}/>
        :null}
      </Comment.Content>
    </Comment>
  )
}

const mapStateToProps = state=>{
  return {users: state.user.all}
}

export default connect(mapStateToProps)(EventComment)
