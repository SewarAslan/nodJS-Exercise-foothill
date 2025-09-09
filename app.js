const express = require("express");
const connectDB = require("./config/db");
const notesRouter = require("./routes/notesroute");
const app = express();
const port = 3000;
app.use(express.json());
connectDB()
  .then(() => {
    console.log("data base connected successfully");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
