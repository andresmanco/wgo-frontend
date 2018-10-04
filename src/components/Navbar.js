import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'

const NavBar = props =>{

  return (

    <div className={`ui inverted green menu fixed`}>
      <Button className="ui item">
          <Icon size='large' color='black' name='content' onClick={props.handleButtonClick} />
      </Button>
      <NavLink activeClassName="ui active item" style={{float: 'centered'}} className="ui item" exact to="/">
        <h3 className="ui header">
          <Icon color='black' name='map' />
          <div className="content">WGO</div>
        </h3>
      </NavLink>
      {props.user ? (
          <span className="ui item" style={{float: 'right', paddingTop: '18px'}}>{`Logged in as: ${props.user.username}`}</span>
      ) : null}
    </div>
  )
}

const mapStateToPros= state=>{
  return{user: state.user.current}
}
export default connect(mapStateToPros)(NavBar);
