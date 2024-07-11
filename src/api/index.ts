import express from "express";
import accountRouter from "./account";
import transactionRouter from "./transaction";

const API_PORT = process.env.API_PORT || 3000;

const app = express();
app.use(express.json());
app.use("/", accountRouter);
app.use("/", transactionRouter);

app.listen(API_PORT, () => {
  console.log(`Server is running at http://localhost:${API_PORT}`);
});
