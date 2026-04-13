import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('tasks.db');

export function initDB() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT
    );
  `);
}

export default db;