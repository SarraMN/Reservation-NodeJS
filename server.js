import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import userrouter from './routes/Auth.routes.js';
import salleReunionRouter from './routes/SalleReunion.routes.js';
import reservationRouter from './routes/Reservation.routes.js';
import authMiddleware from './middelware/authMiddleware.js';

const app = express();
process.env.TZ = 'Europe/Paris'; // Set to 'Europe/Paris' for Central European Standard Time

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const URL = process.env.URL || 'mongodb://localhost:27017/Meeting'; // Fallback to localhost if URL isn't set

//"mongodb://localhost:27017/Meeting";


mongoose
  .connect(URL, {family: 4})
  .then(() => {
    console.log(`Succefully connected to Meeting`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(express.static("public"));

app.use('/user', userrouter );
// TODO: Appliquer le middleware d'authentification à toutes les routes du reservationRouter
app.use('/reservation',authMiddleware, reservationRouter);
// Appliquer le middleware d'authentification à toutes les routes du reservationRouter
app.use('/salle', authMiddleware,salleReunionRouter);



const PORT = process.env.PORT || 9090;
const hostname = process.env.hostname || 'localhost';

//localhost:hostname
//port:9090
app.listen(PORT, hostname, ()=>{
    console.log(`server running on http://${hostname}:${PORT}`);
})

