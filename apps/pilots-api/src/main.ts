import express from "express";
import { postgraphile } from "postgraphile";
import cors from 'cors';
import jwt from 'jsonwebtoken';


const app = express();

app.use(express.json());
app.use(cors());

// function generateToken(email: string) {
//   const secretKey = process.env.ACCESS_TOKEN_SECRET; 
//   const token = jwt.sign({ email }, secretKey);
//   return token;
// }

app.use(
  postgraphile(
    process.env.DATABASE_URL,
    "control_tower_schema",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true
    }
  )
);

app.listen(process.env.PORT || 3000);