import sqlite3 from "sqlite3";

const DB_PATH =
  "/Users/pierrickbrossat/Documents/ALL/Projet Perso/SimpleChat/server/DB_Simple_chat.db";

export function addUsers(user) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    const sql = `INSERT INTO Users (username, password, email, name, surname) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      user.username,
      user.password,
      user.email,
      user.name,
      user.surname,
    ];

    db.run(sql, values, (error) => {
      db.close(); // Close the database connection

      if (error) {
        console.error("Error adding user to the database:", error);
        reject(error);
      } else {
        resolve(); // If there is no error, resolve the promise
      }
    });
  });
}

export function getUser(username) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    const sql = `SELECT * FROM Users WHERE username = ?`;
    const values = [username];

    const user = {
      username: "",
      email: "",
      name: "",
      surname: "",
      password: "",
    };

    // Verify if the user exists in the database
    db.get(sql, values, (error, row) => {
      if (error) {
        console.error("Error getting user from the database:", error);
        reject(error);
      }

      if (row) {
        user.username = row.username;
        user.email = row.email;
        user.name = row.name;
        user.surname = row.surname;
        user.password = row.password;
      }

      resolve(user);
    });

    db.close();
  });
}
