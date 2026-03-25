import express from "express";
import path from "path";

const server = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
const publicPath = path.join(__dirname, "../../public");
server.use(express.static(publicPath));

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(port, () => {
  console.log("testing server ts");
});
