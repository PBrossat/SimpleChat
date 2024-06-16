import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

// Obtain the "pwd path" of the current file
const __filename = fileURLToPath(import.meta.url);

// Obtain the "pwd path" of the directory where the current file is located
const __dirname = dirname(__filename);

// Define the path to the database
const DB_PATH = path.resolve(__dirname, "../DB_Simple_chat.db");

export function addDiscussion(discussion) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    // created_at is a field in the database that is automatically filled with the current date and time
    const sql = `INSERT INTO Conversations (name, type, creator_id) VALUES (?, ?, ?)`;
    const values = [discussion.name, discussion.type, discussion.creator_id];

    db.run(sql, values, function (error) {
      if (error) {
        console.error("Error adding discussion to the database:", error);
        reject(error);
      } else {
        resolve(this.lastID); // If there is no error, resolve the promise and send the discussion
      }
      db.close(); // Close the database connection
    });
  });
}

export function addMessage(conversationId, senderId, content, is_read) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    const time = new Date().toISOString().slice(0, 19).replace("T", " ");

    // created_at is a field in the database that is automatically filled with the current date and time
    const sql = `INSERT INTO Messages (conversation_id, sender_id, content, timestamp, is_read) VALUES (?, ?, ?,?,?)`;
    const values = [conversationId, senderId, content, time, is_read];

    db.run(sql, values, function (error) {
      if (error) {
        console.error("Error adding new message to the database:", error);
        reject(error);
      } else {
        resolve(this.lastID); // If there is no error, resolve the promise and send the message
      }
      db.close(); // Close the database connection
    });
  });
}

export function getActiveDiscussions(userId) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    const sql = `
        SELECT c.id, c.name, c.type, c.creator_id, c.created_at
        FROM Conversations c
        JOIN Participants p ON c.id = p.conversation_id
        WHERE p.user_id = ?; 
      `;
    const values = [userId];

    db.all(sql, values, (error, rows) => {
      db.close(); // Close the database connection

      if (error) {
        console.error(
          "Error getting active discussions from the database:",
          error
        );
        reject(error);
      } else {
        const activeDiscussions = rows.map((row) => {
          return {
            id: row.id,
            name: row.name,
            type: row.type,
            created_at: row.created_at,
            creator_id: row.creator_id,
          };
        });
        resolve(activeDiscussions); // If there is no error, resolve the promise and send the active discussions
      }
    });
  });
}

// Function to get the participants of a conversation
export function getParticipants(conversationId) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    const sql = `
        SELECT Users.id, Users.username, Users.email, Users.name, Users.surname
        FROM Users
        INNER JOIN Participants ON Users.id = Participants.user_id
        WHERE Participants.conversation_id = ?
      `;
    const values = [conversationId];

    db.all(sql, values, (error, rows) => {
      db.close(); // Close the database connection

      if (error) {
        console.error(
          "Erreur lors de la récupération des participants depuis la base de données :",
          error
        );
        reject(error);
      } else {
        const participants = rows.map((row) => {
          return {
            id: row.id,
            username: row.username,
            email: row.email,
            name: row.name,
            surname: row.surname,
          };
        });
        resolve(participants); // If there is no error, resolve the promise
      }
    });
  });
}

export function addParticipantToDiscussion(participant, discussionId) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    const sql = `INSERT INTO Participants (user_id, conversation_id) VALUES (?, ?)`;
    const values = [participant.id, discussionId];

    db.run(sql, values, function (error) {
      if (error) {
        console.error(
          "Error adding participant to the discussion in the database:",
          error
        );
        reject(error);
      } else {
        resolve(); // If there is no error, resolve the promise
      }
      db.close(); // Close the database connection
    });
  });
}
