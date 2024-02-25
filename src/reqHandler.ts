import { RequestListener } from "node:http";

const reqHandler = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
  return res;
};
export default reqHandler;
