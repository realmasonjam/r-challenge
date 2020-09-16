# Post a couple of properties
curl -d "address=57 Acland Street, St Kilda, Vic 3182&price=3000000&suburb=St Kilda&description=Private Sale" -X POST http://localhost:3000/
curl -d "address=908/333 Exhibition Street, Melbourne, Vic 3000&price=450000&suburb=Melbourne&description=Auction" -X POST http://localhost:3000/
curl -d "address=21 St Edmonds Road, Prahran, Vic 3181&price=600000&suburb=Prahran&description=Private Sale" -X POST http://localhost:3000/
curl -d "address=25 Murphy Street, Richmond, Vic 312&price=1000000&suburb=Richmond&description=Private Sale" -X POST http://localhost:3000/
curl -d "address=1/78-80 Commercial Road, Prahran, Vic 3181&price=700000&suburb=Prahran&description=Auction" -X POST http://localhost:3000/
curl -d "address=17 Carroll Street, Richmond, Vic 3121&price=1500000&suburb=Richmond&description=Private Sale" -X POST http://localhost:3000/
curl -d "address=8 Tennyson Street, St Kilda, Vic 3182&price=2500000&suburb=St Kilda&description=Auction" -X POST http://localhost:3000/
curl -d "address=70 / 70a Chapel Street, St Kilda, Vic 3182&price=3200000&suburb=St Kilda&description=Private" -X POST http://localhost:3000/
curl -d "address=8 Burnett Street, St Kilda, Vic 3182&price=2200000&suburb=St Kilda&description=Private" -X POST http://localhost:3000/
curl -d "address=1 Williams Road, Prahran, Vic 3181&price=4000000&suburb=Prahran&description=Auction" -X POST http://localhost:3000/


# Some queries to invoke API in different scenarios
# To get all property data
curl --request GET http://localhost:3000/ | json_pp

# get the properties in Richmond
curl --request GET http://localhost:3000/?suburb=Richmond | json_pp

# get the properties in Prahran
curl --request GET http://localhost:3000/?suburb=Prahran | json_pp

curl --request GET http://localhost:3000/?suburb=Melbourne | json_pp
