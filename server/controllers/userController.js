import sqlite3 from "sqlite3";

const DB_PATH = "../DB_Simple_Chat.db";

export function addUsers(user) {
  const db = new sqlite3.Database(DB_PATH);
  console.log(db);

  const sql = `INSERT INTO Users (username, password, email, name, surname) VALUES (?, ?, ?, ?, ?)`;
  const values = [user.username, user.password, user.email, "", ""];

  db.run(sql, values, (error) => {
    if (error) {
      console.error("Error adding user to the database:", error);
    }
  });

  db.close();
}
