import { model, Schema, ObjectId, Document, HookNextFunction } from 'mongoose'
import { mongoosePagination, Pagination } from "mongoose-paginate-ts"

export interface IItem extends Document {
  id?: ObjectId
  name: string
  price: number
  description: string
  image: string
  createdAt: Date
  modifiedAt: Date
  createdBy?: string
  updatedBy?: string
}

const ItemSchema = new Schema<IItem>({
  id: { type: Object, required: false },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false },
  createdBy: { type: String, required: false },
  updatedBy: { type: String, required: false },
})

ItemSchema.pre('save', function (next: HookNextFunction) {
  this.set({ createdAt: new Date() })
  next()
})

ItemSchema.pre('updateOne', function(next: HookNextFunction) {
  this.set({ modifiedAt: new Date() })
  next()
})

ItemSchema.plugin(mongoosePagination)

export const Item: Pagination<IItem> = model<IItem, Pagination<IItem>>("Item", ItemSchema)
