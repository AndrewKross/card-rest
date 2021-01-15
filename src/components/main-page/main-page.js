import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../index";
import { Input, Pagination, Spin } from "antd";
import "./main-page.css"
import CardsList from "../cards-list/cards-list";
import { Routes } from "../../const";

const MainPage = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCards, setTotalCards] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const getData = useCallback(() => {
    let url = Routes.MAIN + Routes.GET_BY_PAGE + currentPage
    if (searchValue) {
      url += Routes.SEARCH + searchValue
    }
    api.get(url).then((res) => {
      setData(res.data.cards)
      setTotalCards(res.data.total)
      setIsLoading(false)
    })
  }, [currentPage, searchValue])

  useEffect(() => {
    getData()
  }, [getData])

  const changePageSizeHandler = (size) => {
    api.post(Routes.PAGE_SIZE, ({ pageSize: size })).then(() => getData())
  }

  return (
    <div className="main-page">
      <h1>Card-rest App</h1>
      <div className="search-wrapper">
        <Input style={{ width: '50%' }} size="large" loading={isLoading}
               placeholder="Enter part of the first or last name"
               onChange={(evt) => setSearchValue(evt.target.value)} value={searchValue}/>
        <button onClick={() => setSearchValue('')} className="button-reset">Reset</button>
      </div>
      {isLoading ? <Spin size="large" style={{ marginTop: 40 }}/> : <CardsList data={data}/>}
      <Pagination current={currentPage} disabled={totalCards === 0} total={totalCards} style={{ marginTop: 25 }}
                  onChange={(page) => setCurrentPage(page)}
                  onShowSizeChange={(page, size) => changePageSizeHandler(size)}/>
    </div>
  );
}

export default MainPage;
