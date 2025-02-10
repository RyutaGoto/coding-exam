import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  switch (req.method) {
    case "GET":
      // res.status(400).json({ error: "test error /api/todos get" });
      // return;
      db.all("SELECT * FROM todos", [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(200).json(rows);
      });
      break;
    case "POST": {
      // res.status(400).json({ error: "test error /api/todos post" });
      // return;
      const { title } = req.body;
      if (!title) {
        res.status(400).json({ error: "Title is required" });
        return;
      }
      db.run(
        "INSERT INTO todos (title, completed) VALUES (?, ?)",
        [title, false],
        function (err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.status(201).json({ id: this.lastID, title, completed: false });
        }
      );
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
