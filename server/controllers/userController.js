import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

// Obtain the "pwd path" of the current file
const __filename = fileURLToPath(import.meta.url);

// Obtain the "pwd path" of the directory where the current file is located
const __dirname = dirname(__filename);

// Define the path to the database
const DB_PATH = path.resolve(__dirname, "../DB_Simple_chat.db");

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
      id: null,
      username: null,
      email: null,
      name: null,
      surname: null,
      password: null,
    };

    // Verify if the user exists in the database
    db.get(sql, values, (error, row) => {
      if (error) {
        console.error("Error getting user from the database:", error);
        reject(error);
      }

      if (row) {
        user.id = row.id;
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

export function getAllUsersContainingInput(username, name, surname, userId) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    // Get all users whose username contains the input (order by users with whom the user has already spoken and then by the others)
    const sql = `
      SELECT DISTINCT u.id, u.username, u.email, u.name, u.surname
      FROM Users u
      LEFT JOIN Participants p ON u.id = p.user_id
      LEFT JOIN Conversations c ON p.conversation_id = c.id
      WHERE u.username LIKE ? OR u.name LIKE ? OR u.surname LIKE ?
      ORDER BY 
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM Participants p1
            JOIN Participants p2 ON p1.conversation_id = p2.conversation_id
            WHERE p1.user_id = ? AND p2.user_id = u.id
          ) THEN 0
          ELSE 1
        END
    `;
    const values = [`%${username}%`, `%${name}%`, `%${surname}%`, userId];

    db.all(sql, values, (error, rows) => {
      db.close(); // Close the database connection

      if (error) {
        console.error("Error getting users from the database:", error);
        reject(error);
      } else {
        const users = rows.map((row) => {
          // Send an array of users to the client
          return {
            id: row.id,
            username: row.username,
            email: row.email,
            name: row.name,
            surname: row.surname,
            // don't send the password to the client
          };
        });
        resolve(users); // If there is no error, resolve the promise
      }
    });
  });
}
