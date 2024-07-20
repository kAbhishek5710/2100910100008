const express = require("express");
const app = express();
require("dotenv").config();

app.listen(8080, () => {
  console.log("App is listening to port 8080");
});

app.get("/categories/:categoryname/products", async (req, res) => {
  const categoryName = req.params.categoryname;
  const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryName}/products?top=n&minPrice=1&maxPrice=10000`;

  const accessToken = process.env.ACCESS_TOKEN;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const products = await response.json();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
