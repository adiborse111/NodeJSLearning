import http from "http";
import fs from 'fs/promises';
import url from 'url';
import path from "path";
import { error } from "console";
const PORT = process.env.PORT;

const _filename = url.fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
console.log(_filename, _dirname);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(_dirname,'public','index.html')
      } else if (req.url === "/about") {
        filePath = path.join(_dirname,'public','about.html')
      } else {
        throw new error('not found')
      }

      const data = await fs.readFile(filePath)
      res.setHeader('Content-Type', 'text/html')
      res.write(data)
      res.end()
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
