import fs from "node:fs";
import path from "node:path";

const reqHandler = (req, res) => {
  const { url, method } = req;
  if (url === "/file-upload" && method === "POST") {
    const contentType = req.headers["content-type"];
    if (contentType.startsWith("multipart/form-data")) {
      const contentDisposition = req.headers;
      console.log({ contentDisposition });
      const stream = fs.createWriteStream(makeFileName("temporaryFile"));
      stream.on("open", () => {
        console.log("Stream open ...  0.00%");
        req.pipe(stream);
      });
      stream.on("drain", () => {
        const written = +stream.bytesWritten;
        const total = parseInt(req.headers["content-length"]);
        const pWritten = ((written / total) * 100).toFixed(2);
        console.log(`Processing  ...  ${pWritten}% done`);
      });
      stream.on("close", () => {
        console.log("Processing  ...  100%");
        return res.end("File uploaded successfully.");
      });
      stream.on("error", (err) => {
        console.error(err);
      });
      // let formData = "";
      // req.on("data", (chunk) => {
      //   formData += chunk;
      // });

      // return req.on("end", () => {
      //   // Parse form data
      //   const boundary = req.headers["content-type"]
      //     .split("; ")[1]
      //     .split("=")[1];
      //   const sections = formData.split(`--${boundary}`);
      //   // Iterate through form sections
      //   sections.forEach((section) => {
      //     // Look for file section
      //     if (section.includes("filename")) {
      //       const filenameMatch = /filename="(.+?)"/.exec(section);
      //       if (filenameMatch) {
      //         const fileData = section.split("\r\n\r\n")[1];
      //         const fileName = makeFileName(filenameMatch[1]);
      //         // Write file using stream
      //         const writeStream = fs.createWriteStream(fileName);
      //         writeStream.write(fileData, "binary");
      //         writeStream.end();

      //         return res.end("File uploaded successfully.");
      //       }
      //     }
      //   });
      // });
    }
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

const makeFileName = (originalName: string) => {
  const name = originalName.trim();
  const lastIdxOfDot = name.lastIndexOf(".");
  const ext = name.slice(lastIdxOfDot) ?? "ext";
  const filenamePrefix = name.slice(0, lastIdxOfDot).split(" ")[0] ?? "file";
  return path.join("uploads", `${filenamePrefix}-${Date.now()}${ext}`);
};

export default reqHandler;
