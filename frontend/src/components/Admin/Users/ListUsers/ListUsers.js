import React, { useState } from 'react';
import { Switch, List, Avatar, Button } from 'antd';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from "../../../Modal"
import EditUserForm "../EditUserForm"

import './ListUsers.scss';

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActive, setViewUsersActives] = useState(true)


  return{
   <div className="list-users">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActives(!viewUsersActives)}
          />
          <span>
           {viewUsersActive ? "Usuarios Activos" : "Ususarios Inactivos"}
          </span>
    </div>
    {viewUsersActive ? <UsersActive usersActive="usersActive" /> : <usersInactive/> }
   </div>

  }
}

function UsersActive(){
 const {usersActive } = props
 return {
  <List 
   className=users-active
   itemLayout="horizontal"
   dataSource={userActive}
   renderItem={user => {
    <List.Item 
     actions={[
      <Button
      type="primary"
         onClick={() => }
      >
       <Icon type="edit" />
      </Button>,
      <Button
      type="danger"
         onClick={() => }
      >
       <Icon type="stop" />
      </Button>,
         <Button
      type="danger"
         onClick={() => }
      >
       <Icon type="delete" />
      </Button>
     ]}
    >
      <List.Item.Meta 
        avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar } />}
        title={`
          ${user.name ? user.name : '...'}
          ${user.lastname ? user.lastname : '...'}
        `}
        description={user.email}
      />
    </List.Item>
   }}
  />
 } 

}

function UsersActive(){
 return <h3>Lista de Usuarios Inactivos</h3>
}

