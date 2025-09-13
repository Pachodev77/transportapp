const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const usersFile = path.join(dataDir, "users.json");
const tripsFile = path.join(dataDir, "trips.json");
const sessionsFile = path.join(dataDir, "sessions.json");
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "[]");
if (!fs.existsSync(tripsFile)) fs.writeFileSync(tripsFile, "[]");
if (!fs.existsSync(sessionsFile)) fs.writeFileSync(sessionsFile, "[]");

function load(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
function save(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

app.get("/ping", (req,res)=> res.json({ok:true, time: new Date()}));

app.post("/api/register", (req, res) => {
  const { email, password, name, role } = req.body;
  const users = load(usersFile);
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "Usuario ya existe" });
  }
  const newUser = { id: uuidv4(), email, password, name: name||"", role };
  users.push(newUser);
  save(usersFile, users);
  res.json({ success: true, userId: newUser.id });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const users = load(usersFile);
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });
  const sessions = load(sessionsFile);
  const token = uuidv4();
  sessions.push({ token, userId: user.id, role: user.role, name: user.name, email: user.email });
  save(sessionsFile, sessions);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
});

// create trip (passenger)
app.post("/api/trips", (req, res) => {
  const { token, origin, destination } = req.body;
  const sessions = load(sessionsFile);
  const session = sessions.find((s) => s.token === token);
  if (!session) return res.status(401).json({ error: "No autenticado" });
  const trips = load(tripsFile);
  const newTrip = {
    id: uuidv4(),
    passengerId: session.userId,
    origin,
    destination,
    status: "pending",
    createdAt: new Date()
  };
  trips.push(newTrip);
  save(tripsFile, trips);
  res.json({ ok: true, trip: newTrip });
});

app.get("/api/trips/pending", (req, res) => {
  const trips = load(tripsFile).filter((t) => t.status === "pending");
  res.json({ ok: true, trips });
});

app.post("/api/trips/:id/accept", (req, res) => {
  const { token } = req.body;
  const sessions = load(sessionsFile);
  const session = sessions.find((s) => s.token === token);
  if (!session || session.role !== "driver") return res.status(403).json({ error: "Solo conductores" });
  const trips = load(tripsFile);
  const trip = trips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: "Viaje no encontrado" });
  trip.driverId = session.userId;
  trip.status = "accepted";
  trip.acceptedAt = new Date();
  save(tripsFile, trips);
  res.json({ ok: true, trip });
});

app.post("/api/trips/:id/complete", (req,res)=>{
  const { token } = req.body;
  const sessions = load(sessionsFile);
  const session = sessions.find((s) => s.token === token);
  if (!session) return res.status(401).json({ error: "No autenticado" });
  const trips = load(tripsFile);
  const trip = trips.find((t) => t.id === req.params.id);
  if(!trip) return res.status(404).json({ error: "Viaje no encontrado" });
  if(trip.driverId !== session.userId && trip.passengerId !== session.userId) return res.status(403).json({ error: "No autorizado" });
  trip.status = "completed";
  trip.completedAt = new Date();
  save(tripsFile, trips);
  res.json({ ok: true, trip });
});

app.get("/api/mytrips", (req, res) => {
  const token = req.query.token || req.headers['authorization'];
  const sessions = load(sessionsFile);
  const session = sessions.find((s) => s.token === token);
  if (!session) return res.status(401).json({ error: "No autenticado" });
  const trips = load(tripsFile).filter((t) => t.passengerId === session.userId || t.driverId === session.userId);
  res.json({ ok: true, trips });
});

app.listen(PORT, ()=> console.log("Server listening on", PORT));
