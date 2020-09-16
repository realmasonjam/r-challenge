const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)

propertyList = []

app.get('/', (req, res) => {
  if(req.query.suburb)
    res.send(propertyList.filter((element) => element.suburb === req.query.suburb ))
  else
    res.send(propertyList)
})

app.post('/', function (req, res) {
  let newProperty = { ...req.body, priceRange: 'n/a', suburbAveragePrice: 0}
  newProperty.price = parseFloat(newProperty.price)
  propertyList.push(newProperty)
  updatePriceRange(propertyList, req.body.suburb)
  res.send('Got a POST request')
})

function updatePriceRange(propertyList, suburb) {
  filteredPropertyList = propertyList.filter((element) => element.suburb === suburb )
  suburbAveragePrice = (filteredPropertyList.map((element) => element.price))
    .reduce((a, b) => a + b, 0) / filteredPropertyList.length
  filteredPropertyList.forEach(element => {
    element.suburbAveragePrice = suburbAveragePrice
    if(element.price === suburbAveragePrice)
      element.priceRange = 'Equal to average'
    else if (element.price > suburbAveragePrice)
      element.priceRange = 'Greater than average'
    else 
      element.priceRange = 'Lower than average'
  });
}

module.exports = app
