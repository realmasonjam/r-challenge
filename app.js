const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)


const port = 3000

propertyList = []

app.get('/', (req, res) => {
  console.log('req.query: ', req.query)
  res.send(propertyList)
})

app.post('/', function (req, res) {
  // console.log('req.params: ', req.params)
  console.log('req.body: ', req.body)
  let newProperty = { ...req.body, priceRange: 'n/a', suburbAveragePrice: 0}
  newProperty.price = parseFloat(newProperty.price)
  propertyList.push(newProperty)
  updatePriceRange(propertyList, req.body.suburb)
  console.log('propertyList: ', propertyList)
  // console.log('req.headers: ', req.headers)
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function updatePriceRange(propertyList, suburb) {
  filteredPropertyList = propertyList.filter((element) => element.suburb === suburb )
  suburbAveragePrice = (filteredPropertyList.map((element) => element.price))
    .reduce((a, b) => a + b, 0) / filteredPropertyList.length
  filteredPropertyList.forEach(element => {
    element.suburbAveragePrice = suburbAveragePrice
    console.log('element.price: ', element.price)
    console.log('suburbAveragePrice: ', suburbAveragePrice)
    if(element.price === suburbAveragePrice)
      element.priceRange = 'Equal to average'
    else if (element.price > suburbAveragePrice)
      element.priceRange = 'Greater than average'
    else 
      element.priceRange = 'Lower than average'
  });
}