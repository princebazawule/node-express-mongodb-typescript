import express from 'express'
import * as items from '../controllers/item.controller'

const itemsRoutes = express.Router()

// create item
itemsRoutes.post('/', items.create)

// get all items
itemsRoutes.get('/', items.findAll)

// get item by id
itemsRoutes.get('/:id', items.findOne)

// update item by id
itemsRoutes.put('/:id', items.updateOne)

// delete item by id
itemsRoutes.delete('/:id', items.deleteOne)

// delete all items
itemsRoutes.delete('/', items.deleteAll)

export default itemsRoutes