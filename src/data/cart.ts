import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('snackfood.db');

export type CartItem = {
  userId: number;
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export function createCartTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      productId TEXT,
      name TEXT,
      price REAL,
      quantity INTEGER
    );
  `);
}
