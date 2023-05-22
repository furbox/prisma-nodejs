import express from "express";
import productsRouter from "./routes/products.route.js";
import categoriesRouter from "./routes/categories.route.js";

const app = express();

app.use(express.json());

app.use('/api', productsRouter);
app.use('/api', categoriesRouter);

app.listen(3000, () => {
    console.log("Server started at port 3000");
});