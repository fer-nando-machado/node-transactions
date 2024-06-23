import express from "express";
import accountRouter from "./account";
import transactionRouter from "./transaction";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", accountRouter);
app.use("/", transactionRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
