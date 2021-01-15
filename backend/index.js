const express = require("express")
const DATA = require("./mock.json")

const app = express()
const PORT = 4000

const Routes = {
  MAIN: '/',
  GET_BY_ID: '/get/:id/',
  PAGE_SIZE: '/page_size',
}

let pageSize = 10

const simpleData = DATA.map((card) => ({
  id: card.id,
  firstName: card.firstName,
  lastName: card.lastName,
  gender: card.gender,
  email: card.email,
  avatar: card.avatar,
}))

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get(Routes.GET_BY_ID, (req, res) => {
  res.status(200).json(DATA.find(it => it.id.$oid === req.params.id))
})

app.get(Routes.MAIN, (req, res) => {
  let responseData = {
    cards: [...simpleData.slice(0, pageSize)],
    total: simpleData.length,
  }

  if (req.query.page) {
    responseData.cards = simpleData.slice(pageSize * (req.query.page - 1),
      (pageSize * (req.query.page - 1)) + pageSize)
  }

  if (req.query.search) {
    const filteredData = simpleData.filter((card) => {
      return card.firstName.toLowerCase().includes(req.query.search.toLowerCase()) ||
        card.lastName.toLowerCase().includes(req.query.search.toLowerCase())
    })
    responseData.cards = filteredData.slice(pageSize * (req.query.page - 1),
      (pageSize * (req.query.page - 1)) + pageSize)
    responseData.total = filteredData.length
  }

  res.status(200).json(responseData)
})

app.post(Routes.PAGE_SIZE, (req, res) => {
  if (Number.isInteger(req.body.pageSize)) {
    pageSize = req.body.pageSize
    res.status(200).send(`Размер страницы был успешно изменен на ${req.body.pageSize}`)
  }
})

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
