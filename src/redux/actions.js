import {
  LOGOUT_USER, LOGIN_USER, LOAD_USERS, GET_USERS, SELECT_USER,
  CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, CURRENT_EVENTS, EVENT_FILTER, SELECT_EVENT, UNSELECT_EVENT,
  ADD_COMMENT, DELETE_COMMENT,
  ADD_LIKE, DELETE_LIKE
 } from './types'

const baseUrl = "http://localhost:3001"

//LOGIN THE USER IN THE LOGIN FORM AND ALSO AFTER CREATE THE ACC
export function loginUser(user){
  return function(dispatch){
    return fetch(baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    })
      .then(res => {
        if (res.status === 204) {
          alert("login failed");
        } else {
          return res.json();
        }
      })
      .then(json => {
        if(json !== undefined){
          dispatch({type: LOGIN_USER, user: json.user})
          localStorage.setItem("token", json.token);
        }
      }
    )
  }
};

//THIS FUNCTION IS GONNA LOG OUT THE USER
export function logoutUser(){
  return {type: LOGOUT_USER, user: null}
}

//AFTER CHECK IF THERE IS A TOKEN, WE SEND THE INFO FROM IT TO KEEP THE USER LOGGED
export function checkUserLoged(){
  return function(dispatch){
    fetch(baseUrl + "/account", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => {
      if (res.status === 401) {
        // alert("login failed");
      } else {
        return res.json();
      }
    }).then(json =>{
      if(json!== undefined){
        dispatch({type: LOGIN_USER, user: json})
      }
    })
  }
}

export function selectUser(user) {
  return {type: SELECT_USER, user}
}

// ADD NEW EVENT IN THE DATABASE
export function fetchNewEvent(newEvent) {
  return function(dispatch) {
    fetch(baseUrl + '/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        event: newEvent
      })
    }).then(r=> r.json())
    .then(event=>{
      if(event!== undefined){
        dispatch({type: CREATE_EVENT, event})
      }
    })
  }
}


export function fetchUpdateEvent(event){
  return function(dispatch) {
    fetch(baseUrl + '/events/' + event.id, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        event: event
      })
    }).then(r=> r.json())
    .then(event=>{
      if(event!== undefined){
        dispatch({type: UPDATE_EVENT, event})
      }
    })
  }
}


export function fetchDeleteEvent(id) {
  return function(dispatch) {
    fetch(baseUrl + '/events/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(r=> r.json())
    .then(event=> {
      dispatch({type: DELETE_EVENT, id: event.id})
    })
  }
}


// GET ALL THE EVENTS AND FILTER JUST THE ONES ACTIVE!
export function getCurrentEvents(){
  return function(dispatch){
    fetch(baseUrl + '/events')
    .then(r=> r.json())
    .then(allEvents=>{
      dispatch({type: CURRENT_EVENTS, events: allEvents})
    })
  }
}


export function getActiveUsers(){
  return function(dispatch){
    fetch(baseUrl + '/active-users')
    .then(r=> r.json())
    .then(users=>{
      dispatch({type: LOAD_USERS, users})
    })
  }
}

export function getAllUsers(){
  return function(dispatch){
    fetch(baseUrl + '/users')
    .then(r=> r.json())
    .then(users=>{
      dispatch({type: GET_USERS, users})
    })
  }
}


export function filterEvents(events) {
  return {type: EVENT_FILTER, events}
}

export function selectEvent(id){
  return {type: SELECT_EVENT, id}
}

export function unselectEvent(){
  return {type: UNSELECT_EVENT}
}

export function fetchNewComment(comment, eventId) {
  return function(dispatch){
    fetch(baseUrl + '/comments', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        content: comment,
        event_id: eventId
      })
    }).then(r=> r.json())
    .then(comment=>{
      if(comment!== undefined){
        dispatch({type: ADD_COMMENT, comment})
      }
    })
  }
}

export function fetchDeleteComment(commentId){
  return function(dispatch){
    fetch(baseUrl + '/comments/' + commentId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(()=>{
      dispatch({type: DELETE_COMMENT, id: commentId})
    })
  }
}

export function fetchNewLike(eventId) {
  return function(dispatch){
    fetch(baseUrl + '/likes', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        event_id: eventId
      })
    }).then(r=> r.json())
    .then(like=>{
      if(like!== undefined){
        dispatch({type: ADD_LIKE, like})
      }
    })
  }
}


export function fetchDeleteLike(likeId){
  return function(dispatch){
    fetch(baseUrl + '/likes/' + likeId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(()=>{
      dispatch({type: DELETE_LIKE, id: likeId})
    })
  }
}
