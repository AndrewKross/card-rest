import React from "react"
import PersonCard from "../person-card/person-card";
import "./cards-list.css"

const CardsList = ({ data }) => (
  <div className="cards-list">
    {data.length === 0 ? <h2>Загрузка...</h2>
      : data.map((card) => <PersonCard key={card.id.$oid} data={card} />
      )}
  </div>
)

export default CardsList
