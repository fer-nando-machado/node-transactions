import express from "express";
import accountRouter from "./account";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", accountRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
