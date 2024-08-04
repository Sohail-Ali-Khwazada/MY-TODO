import mongoose from "mongoose";

const todosSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export const todos = mongoose.model("Todos", todosSchema);