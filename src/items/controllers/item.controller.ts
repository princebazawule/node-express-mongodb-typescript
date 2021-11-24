import { Request, Response } from 'express'
import { Item, IItem } from '../models/item.model'
import { ObjectId } from 'mongodb'

// create and save new item
export const create = async (req: Request, res: Response) => {
  try {
    const newItem = req.body as IItem
    const result = await Item.create(newItem)

    result
      ? res.status(201).send(result)
      : res.status(500).send("failed to create a new item.")
  } catch (error: unknown) {
    console.error(error)
    res.status(400).send(error)
  }
}

// find all tutorials from db
export const findAll = async (req: Request, res: Response) => {
    
    const { name, limit, offset, _order } = req.query
    let condition: any = name ? { name: { $regex: new RegExp(name as string), $options: "i" } } : {}
    
    const size: number = limit ? +limit : 10
    const page: number = Number(offset) ? Number(offset) * size : 1

    const options = {
      query: condition,
      page,
      limit: size,
      sort:{ 'price' : _order, 'createdAt': _order }
    }

    Item.paginate(options)
    .then((data: any): void => {
      res
        .status(200)
        .send(
          {
            totalItems: data.totalDocs,
            items: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
          }
        )
    })
    // .then(() => {
    //   console.log('query:', options.query, 'page:', options.page, 'limit:', options.limit, 'sort:', options.sort)
    // })
    .catch((err: Error) => {
      res
        .status(500)
        .send({message:err || "error occurred while retrieving items."})
    })
  
}

// find single item by id
export const findOne = async (req: Request, res: Response) => {
  const id = req?.params?.id

  try {
    const query = { _id: new ObjectId(id) }
    const item = await Item.findOne(query)

    if (!item) {
      res.status(404).send({ message: `item with id ${id} not found` })
    }
    res.status(200).send(item)
  } catch (error: unknown) {
    res.status(500).send({ message: `error retrieving item with id ${id}` })
  }
}

// update item by id
export const updateOne = async (req: Request, res: Response) => {
  const id = req?.params?.id

  try {
    const updatedItem = req.body as IItem
    const query = { _id: new ObjectId(id) }

    // $set adds or updates all fields
    const result = await Item.updateOne(query, { $set: updatedItem })

    result
      ? res
          .status(200)
          .send({ message: `successfully updated item with id ${id}` })
      : res.status(400).send({ message: `item with id: ${id} not updated` })
  } catch (error: unknown) {
    console.error(error)
    res.status(500).send(error)
  }
}

// delete item by id
export const deleteOne = async (req: Request, res: Response) => {
  const id = req?.params?.id

  try {
    const query = { _id: new ObjectId(id) }
    const result = await Item.deleteOne(query)

    if (!result) {
      res.status(400).send({ message: `failed to remove item with id ${id}` })
    }
    if (!result.deletedCount) {
      res.status(404).send({ message: `item with id ${id} does not exist` })
    }
    res.status(202).send({ message: `successfully removed item with id ${id}` })
  } catch (error: unknown) {
    console.error(error)
    res.status(400).send(error)
  }
}

// delete all tutorials from db
export const deleteAll = async (req: Request, res: Response) => {
  try {
    const result = await Item.deleteMany({})

    if (!result) {
      res.status(400).send({ message: `failed to remove items` })
    }

    res
      .status(202)
      .send({ message: `${result.deletedCount} item(s) deleted successfully` })
  } catch (error: unknown) {
    console.error(error)
    res.status(500).send(error)
  }
}
