const app = require('./server')
const supertest = require('supertest')
const request = supertest(app)

it('gets the list of the properties when there is no property in DB', async done => {
  const response = await request.get('/')
  expect(response.status).toBe(200)
  expect(response.body).toEqual([])
  done()
})

it('Posts a property and get the same property', async done => {
  const postResponse = await request.post('/').send({
    "description": "Private Sale",
    "address": "17 Carroll Street, Richmond, Vic 3121",
    "price": 1500000,
    "suburb": "Richmond"
  })
  expect(postResponse.status).toBe(200)
  const getResponse = await request.get('/')
  expect(getResponse.status).toBe(200)
  expect(getResponse.body).toMatchSnapshot()
  done()
})

it('Adds 3 different properties and get all of them', async done => {
  const postResponse = await request.post('/').send(
    {
      "price": 4000000,
      "description": "Auction",
      "address": "1 Williams Road, Prahran, Vic 3181",
      "suburb": "Prahran"
    })
  expect(postResponse.status).toBe(200)
  await request.post('/').send({
      "price": 700000,
      "suburb": "Prahran",
      "address": "1/78-80 Commercial Road, Prahran, Vic 3181",
      "description": "Auction",
    })
  await request.post('/').send({
      "address": "21 St Edmonds Road, Prahran, Vic 3181",
      "description": "Private Sale",
      "suburb": "Prahran",
      "price": 600000,
    })
  const getResponse = await request.get('/?suburb=Prahran')
  expect(getResponse.status).toBe(200)
  expect(getResponse.body).toMatchSnapshot()
  done()
})


