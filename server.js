const http = require("http");
const mongoose = require("mongoose");
const router = require("./routes/blogRoutes");

const PORT = process.env.PORT || 6000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Server successfully connected to database");
});

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
