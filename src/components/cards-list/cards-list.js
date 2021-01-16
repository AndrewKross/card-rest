import React from "react"
import PersonCard from "../person-card/person-card";
import "./cards-list.css"

const CardsList = ({ data }) => (
  data.length === 0 ? <h2 className="search-error">По вашему запросу ничего не найдено</h2>
    : <div className="cards-list">
         {data.map((card) => <PersonCard key={card.id.$oid} data={card}/>)}
      </div>
)

export default CardsList
