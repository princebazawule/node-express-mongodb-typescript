import { model, Schema, ObjectId } from 'mongoose'

export interface IItem {
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

ItemSchema.pre('save', function (next) {
  this.set({ createdAt: new Date() });
  next()
})

ItemSchema.pre('updateOne', function(next) {
  this.set({ modifiedAt: new Date() });
  next()
});

export const ItemModel = model<IItem>("Item", ItemSchema)
