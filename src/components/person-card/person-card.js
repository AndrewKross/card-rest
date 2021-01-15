import React from "react"
import { Avatar, Card } from 'antd';
import "./person-card.css"
import { AppRoute } from "../../const";
import { withRouter } from "react-router-dom";

const PersonCard = ({ data, history }) => {
  const pushToCard = () => history.push(`${AppRoute.CARD + data.id.$oid}`)
  return (
    <div className="person-card" tabIndex={0} onClick={pushToCard} onKeyPress={pushToCard}>
      <Card.Meta
        style={{ marginBottom: `25px` }}
        avatar={<Avatar src={data.avatar}/>}
        title={`${data.firstName} ${data.lastName}`}
        description={data.gender}
      />
      <p>Email: {data.email}</p>
    </div>
  )
}

export default withRouter(PersonCard)
