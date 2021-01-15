import React from "react"
import {Avatar, Card} from 'antd';
import "./person-card.css"
import { AppRoute } from "../../const";
import { withRouter } from "react-router-dom";

const PersonCard = ({data, history}) => {
  return (
    <div className="person-card" onClick={() => history.push(`${AppRoute.CARD + data.id.$oid}`)}>
      <Card.Meta
        style={{marginBottom: `25px`}}
        avatar={<Avatar src={data.avatar}/>}
        title={`${data.firstName} ${data.lastName}`}
        description={data.gender}
      />
      <p>Email: {data.email}</p>
    </div>
  )
}

export default withRouter(PersonCard)
