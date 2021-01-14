import React from "react"
import {Avatar, Card, Col} from 'antd';

const PersonCard = ({data}) => {
  return (
      <Col span={5}>
        <Card
          hoverable
          style={{width: 300, marginTop: 25}}
        >
          <Card.Meta
            style={{marginBottom: `25px`}}
            avatar={ <Avatar src={data.avatar}/> }
            title={`${data.firstName} ${data.lastName}`}
            description={data.gender}
          />

          <p>Email: {data.email}</p>
        </Card>
      </Col>
  )
}

export default PersonCard
