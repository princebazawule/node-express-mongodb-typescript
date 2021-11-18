import { Request, Response } from 'express'
import { ItemModel, IItem } from '../models/item.model'
import { ObjectId } from 'mongodb'

// create and save new item
export const create = async (req: Request, res: Response) => {
  try {
    const newItem = req.body as IItem
    const result = await ItemModel.create(newItem)

    result
      ? res.status(201).send(result)
      : res.status(500).send("failed to create a new item.")
  } catch (error:any) {
    console.error(error)
    res.status(400).send(error.message)
  }
}

// find all tutorials from db
export const findAll = async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.find({})

    res.status(200).send(items)
  } catch (error:any) {
    res
      .status(500)
      .send(error.message || "error occurred while retrieving items.")
  }
}

// find single item by id
export const findOne = async (req: Request, res: Response) => {
  const id = req?.params?.id

  try {
    const query = { _id: new ObjectId(id) }
    const item = await ItemModel.findOne(query)

    if (!item) {
      res.status(404).send({ message: `item with id ${id} not found` })
    }
    res.status(200).send(item)
  } catch (error:any) {
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
    const result = await ItemModel.updateOne(query, { $set: updatedItem })

    result
      ? res
          .status(200)
          .send({ message: `successfully updated item with id ${id}` })
      : res.status(400).send({ message: `item with id: ${id} not updated` })
  } catch (error:any) {
    console.error(error.message)
    res.status(500).send(error.message)
  }
}

// delete item by id
export const deleteOne = async (req: Request, res: Response) => {
  const id = req?.params?.id

  try {
    const query = { _id: new ObjectId(id) }
    const result = await ItemModel.deleteOne(query)

    if (!result) {
      res.status(400).send({ message: `failed to remove item with id ${id}` })
    }
    if (!result.deletedCount) {
      res.status(404).send({ message: `item with id ${id} does not exist` })
    }
    res.status(202).send({ message: `successfully removed item with id ${id}` })
  } catch (error:any) {
    console.error(error.message)
    res.status(400).send(error.message)
  }
}

// delete all tutorials from db
export const deleteAll = async (req: Request, res: Response) => {
  try {
    const result = await ItemModel.deleteMany({})

    if (!result) {
      res.status(400).send({ message: `failed to remove items` })
    }

    res
      .status(202)
      .send({ message: `${result.deletedCount} item(s) deleted successfully` })
  } catch (error:any) {
    console.error(error.message)
    res.status(500).send(error.message)
  }
}
