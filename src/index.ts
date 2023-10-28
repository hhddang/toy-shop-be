import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
