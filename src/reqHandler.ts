const reqHandler = (req, res) => {
  const { url, method } = req;
  if (url === "/file-upload" && method === "POST") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    return req.on("end", () => {
      try {
        body = JSON.parse(body);
      } catch (e) {}
      console.log(body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: "Hello World!",
        })
      );
      return res;
    });
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Server is running",
      })
    );
    return res;
  }
};

export default reqHandler;
