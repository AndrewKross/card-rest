import React, {useEffect, useState} from "react";
import PersonCard from "./components/person-card/person-card"
import { api } from "./index";
import {Row} from "antd";

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    api.get('/').then((res) => setData(res.data))
  }, [])

  return (
    <div className="App">
      <h1>Card-rest App</h1>
      <Row gutter={9}>
      {data.length === 0 ? <h2>Загрузка...</h2>
        : data.map((card) => <PersonCard key={card.id.$oid} data={card} />)}
      </Row>
    </div>
  );
}

export default App;
