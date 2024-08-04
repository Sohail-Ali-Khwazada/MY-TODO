import 'dotenv/config'
import express from "express";
import cors from "cors";
import connectDb from "./db/db_connection.js";
import todoRoutes from "./routes/todoRoutes.js"


const app = express();
const port = process.env.PORT || 5000;
connectDb();

app.use(cors());
app.use(express.json());
app.use("/api/todos",todoRoutes);


app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
})

