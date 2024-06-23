import express from "express";
import accountRoutes from "./account";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", accountRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
