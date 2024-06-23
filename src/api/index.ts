import express from "express";
import accountRouter from "./account";
import transactionRouter from "./transaction";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/", accountRouter);
app.use("/", transactionRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
