import http from "node:http";
import reqHandler from "./reqHandler";

const server = http.createServer();

server.on("request", reqHandler);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
