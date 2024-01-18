import express from "express";
import { postgraphile } from "postgraphile";
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());


app.use(
  postgraphile(
    process.env.DATABASE_URL,
    "control_tower_schema",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      jwtSecret: process.env.ACCESS_TOKEN_SECRET,
      jwtPgTypeIdentifier: "control_tower_schema.jwt_token",
      pgDefaultRole: "write_only_role",
    }
  )
);

app.listen(process.env.PORT || 3000);