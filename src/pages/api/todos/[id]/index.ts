import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  switch (req.method) {
    case "PUT": {
      const { title, completed } = req.body;

      // res.status(400).json({ error: "test error" });
      // return;
      if (!title && completed === undefined) {
        res.status(400).json({
          error: "At least one of title or completed must be provided",
        });
        return;
      }

      const data = [];
      let sql = "UPDATE todos SET ";

      if (title !== undefined) {
        sql += "title = ?, ";
        data.push(title);
      }
      if (completed !== undefined) {
        sql += "completed = ?, ";
        data.push(completed ? 1 : 0); // SQLite does not support boolean, so convert to 0 or 1.
      }

      sql = sql.slice(0, -2); // Remove the last comma and space.
      sql += " WHERE id = ?";
      data.push(id);

      db.run(sql, data, function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (this.changes === 0) {
          res.status(404).json({ error: "Todo not found" });
          return;
        }
        res
          .status(200)
          .json({ message: "Todo updated", id, changes: this.changes });
      });
      break;
    }
    case "DELETE": {
      // res.status(400).json({ error: "test error" });
      // return;
      if (!id) {
        res.status(400).json({ error: "ID is required" });
        return;
      }

      db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (this.changes === 0) {
          res.status(404).json({ message: "No todo found with that ID" });
        }
        res.status(200).json({ message: "Todo deleted" });
      });
      break;
    }
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
