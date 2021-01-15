import React, {useEffect, useState} from "react";
import {api} from "../../index";
import {Input, Pagination} from "antd";
import "./main-page.css"
import CardsList from "../cards-list/cards-list";

const MainPage = () => {
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
    api.post('/page_size/', ({pageSize: size})).then(() => {
      api.get('/').then((res) => setData(res.data))
      api.get('/total').then((res) => setTotalCards(res.data))
    })
  }

  return (
    <div className="main-page">
      <h1>Card-rest App</h1>
      <Input.Search placeholder="input search text" enterButton="Search" size="large" loading/>
      <CardsList data={data}/>
      <Pagination current={currentPage} disabled={totalCards === 0} total={totalCards} style={{marginTop: 25}}
                  onChange={(page) => loadPageHandler(page)}
                  onShowSizeChange={(page, size) => changePageSizeHandler(size)}/>
    </div>
  );
}

export default MainPage;
