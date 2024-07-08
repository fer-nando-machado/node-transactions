import express from "express";
import accountRouter from "./account";
import transactionRouter from "./transaction";

const PORT_API = process.env.PORT_API || 6379;

const app = express();
app.use(express.json());
app.use("/", accountRouter);
app.use("/", transactionRouter);

app.listen(PORT_API, () => {
  console.log(`Server is running at http://localhost:${PORT_API}`);
});
