import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "john doe" },
  { id: 2, name: "jane doe" },
  { id: 3, name: "jim doe" },
];

// logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// json middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
}

// route handles for GET api/users


const server = createServer((req, res) => {
  logger(req, res, () => {
    res.setHeader("Content-Type", "application/json");
    if (req.url === "/api/users" && req.method === "GET") {
      res.write(JSON.stringify(users));
      res.end();
    } else if (
      req.url.match(/\/api\/users\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      const user = users.find((user) => user.id === parseInt(id));
      if (user) {
        res.write(JSON.stringify(user));
        res.end();
      } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "user not found" }));
        res.end();
      }
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify({ message: "Route not found" }));
      res.end();
    }
  });
});

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
