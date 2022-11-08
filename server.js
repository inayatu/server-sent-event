const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

const PORT = 3000;

let clients = [];
let info = [];

const eventsHandler = (req, res, next) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  const data = `data: ${JSON.stringify(info)}\n\n`;

  res.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
    sendEventsToAll(clients);
  });
};

const sendEventsToAll = (newFact) => {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newFact)}\n\n`)
  );
};

const addInfo = (req, res, next) => {
  const newFact = req.body;
  info.push(newFact);
  res.json(newFact);
  return sendEventsToAll(newFact);
};

app.post("/info", addInfo);
app.get("/events", eventsHandler);
app.get("/status", (req, res) => res.json({ clients: clients.length }));

app.listen(PORT, () => {
  console.log(`Info Events service listening at http://localhost:${PORT}`);
});
