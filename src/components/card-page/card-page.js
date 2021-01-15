import React, { useEffect, useState } from 'react'
import { api } from "../../index";
import { Button } from "antd";
import { AppRoute } from "../../const";
import "./card-page.css"

const CardPage = ({ personId, history }) => {
  const [personData, setPersonData] = useState({})

  useEffect(() => {
    api.get(`/get/${personId}`).then((res) => setPersonData(res.data))
  }, [personId])

  const { firstName, lastName, email, gender, ip, country, avatar, job } = personData

  return (
    <div className="card-page">
      <h2>Details</h2>
      <div className="person-info">
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Gender: {gender}</p>
        <p>Email: {email}</p>
        <p>IP Address: {ip}</p>
        <p>Country: {country}</p>
        <p>Job: {job}</p>
        <p>Avatar: <img alt="avatar" src={avatar}/></p>
      </div>
      <Button className="button-back" onClick={() => history.push(AppRoute.MAIN)}>Go Back</Button>
    </div>
  )
}

export default CardPage
