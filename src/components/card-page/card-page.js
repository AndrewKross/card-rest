import React, {useEffect, useState} from 'react'
import {api} from "../../index";
import {Button} from "antd";
import {AppRoute} from "../../const";

const CardPage = ({personId, history}) => {
  const [personData, setPersonData] = useState({})

  useEffect(() => {
    api.get(`/get/${personId}`).then((res) => setPersonData(res.data))
  }, [personId])

  const {firstName, lastName, email, gender, ip, country, avatar, job} = personData

  return (
    <div className="card-page">
      <div className="person-info">
        <h2>Details</h2>
        <div>First Name: {firstName}</div>
        <div>Last Name: {lastName}</div>
        <div>Last Name: {gender}</div>
        <div>Email: {email}</div>
        <div>IP Address: {ip}</div>
        <div>Country: {country}</div>
        <div>Job: {job}</div>
        <div>Avatar: <img alt="avatar" src={avatar}/></div>
      </div>
      <Button onClick={() => history.push(AppRoute.MAIN)}>Go Back</Button>
    </div>
  )
}

export default CardPage
