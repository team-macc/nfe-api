# order
Microsserviço de Pedidos - NodeJs, Mongodb

# OrderModel:
`{
        "status": "Waiting",        
        "userEmail": "felipe@gmail.com",
        "date": "2020-12-17T00:00:00.000Z",
        "items": [
            {
                "quantity": 2,                
                "idProduto": "1",
                "description": "Camisa polo",
                "price": 50
            },
            {
                "quantity": 1,                
                "idProduto": "3",
                "description": "Calça jeans",
                "price": 100
            }
        ],
    }`

# API

get('/orders',[this.findByEmail, this.findAll])
get('/orders/:id', [this.validateId, this.findById])
post('/orders', this.save)
put('/orders/:id', [this.validateId,this.replace])
patch('/orders/:id', [this.validateId,this.update])
del('/orders/:id', [this.validateId,this.delete])
get('/orders/:id/items', [this.validateId,this.findItems])
put('/orders/:id/items', [this.validateId, this.replaceItems])