import React, {useEffect, useState} from "react";
import PersonCard from "./components/person-card/person-card"
import { api } from "./index";
import { Row, Pagination } from "antd";

const App = () => {
  const [data, setData] = useState([])
  const [totalCards, setTotalCards] = useState(0)

  useEffect(() => {
    api.get('/').then((res) => setData(res.data))
    api.get('/total').then((res) => setTotalCards(res.data))
  }, [])

  const loadPageHandler = (page) => {
    api.get(`/?page=${page}`).then((res) => setData(res.data))
  }

  return (
    <div className="App">
      <h1>Card-rest App</h1>
      <Row>
      {data.length === 0 ? <h2>Загрузка...</h2>
        : data.map((card) => <PersonCard key={card.id.$oid} data={card} />)}
      </Row>
      <Pagination disabled={totalCards === 0} onChange={(page) => loadPageHandler(page)} total={totalCards} />,
    </div>
  );
}

export default App;
