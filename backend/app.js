import "dotenv/config";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
