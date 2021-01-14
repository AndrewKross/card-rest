import React, {useEffect, useState} from "react";
import PersonCard from "../person-card/person-card"
import { api } from "../../index";
import { Row, Pagination } from "antd";
import {withRouter} from "react-router-dom";
import {AppRoute} from "../../const";

const MainPage = ({ history }) => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCards, setTotalCards] = useState(0)

  useEffect(() => {
    api.get('/').then((res) => setData(res.data))
    api.get('/total').then((res) => setTotalCards(res.data))
  }, [])

  const loadPageHandler = (page) => {
    api.get(`/?page=${page}`).then((res) => setData(res.data))
    setCurrentPage(page)
  }

  const changePageSizeHandler = (size) => {
    api.post('/page_size/', ({ pageSize: size })).then(() => {
      api.get('/').then((res) => setData(res.data))
      api.get('/total').then((res) => setTotalCards(res.data))
    })
  }

  return (
        <div className="App">
          <h1>Card-rest App</h1>
          <Row gutter={16} align={'middle'} justify={'space-between'}>
            {data.length === 0 ? <h2>Загрузка...</h2>
              : data.map((card) => {
                return (
                  <div key={card.id.$oid} className="person-card-wrapper"
                       onClick={() => history.push(`${AppRoute.CARD + card.id.$oid}`)}>
                    <PersonCard data={card} />
                  </div>
                  )
              })}
          </Row>
          <Pagination current={currentPage} disabled={totalCards === 0} total={totalCards}
                      onChange={(page) => loadPageHandler(page)}
                      onShowSizeChange={(page, size) => changePageSizeHandler(size)}/>,
        </div>
  );
}

export default withRouter(MainPage);
