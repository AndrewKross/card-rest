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
  const [isError, setIsError] = useState(false)

  const getData = useCallback(() => {
    let url = Routes.MAIN + Routes.GET_BY_PAGE + currentPage
    if (searchValue) {
      url += Routes.SEARCH + searchValue
    }
    api.get(url).then((res) => {
      setData(res.data.cards)
      setTotalCards(res.data.total)
      setIsLoading(false)
    }).catch(() => {
      setIsError(true)
      setIsLoading(false)
    })
  }, [currentPage, searchValue])

  useEffect(() => {
    getData()
  }, [getData])

  const changePageSizeHandler = (size) => {
    api.post(Routes.PAGE_SIZE, ({ pageSize: size })).then(() => getData())
  }

  return isError ? <h2>Can't connect to server, please try again later.</h2> : (
    <div className="main-page">
      <h1 className="header">Card-rest App</h1>
      <div className="search-wrapper">
        <Input style={{ width: '50%', maxWidth: '500px' }} size="large" loading={isLoading.toString()}
               placeholder="Enter part of the first or last name"
               onChange={(evt) => setSearchValue(evt.target.value)} value={searchValue}/>
        <button onClick={() => setSearchValue('')} className="button-reset">Reset</button>
      </div>
      {isLoading ? <Spin size="large" style={{ marginTop: 40 }}/> : <CardsList data={data}/>}
      <div className="pagination-wrapper">
        <Pagination current={currentPage} disabled={totalCards === 0} total={totalCards}
                    onChange={(page) => setCurrentPage(page)}
                    onShowSizeChange={(page, size) => changePageSizeHandler(size)}/>
      </div>
    </div>
  );
}

export default MainPage;
