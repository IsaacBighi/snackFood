import * as SQLite from 'expo-sqlite';

export const database = SQLite.openDatabaseSync('snackfood.db');

export function initDatabase() {
  createTables();
  createCartTable();
}

// ==========================
// USERS
// ==========================

export function createTables() {
  database.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
}

// ==========================
// CART (CORRIGIDO - COMPLETO)
// ==========================

export function createCartTable() {
  database.execSync(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      productId TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      UNIQUE(userId, productId)
    );
  `);
}

// ==========================
// TYPES
// ==========================

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export type CartItem = {
  id?: number;
  userId: number;
  productId: string;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
};

// ==========================
// USERS
// ==========================

export function createUser({ name, email, password }: User) {
  database.runSync(
    `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?);
    `,
    [name, email, password],
  );
}

export function loginUser(email: string, password: string): User | null {
  const user = database.getFirstSync<User>(
    `
      SELECT * FROM users
      WHERE email = ? AND password = ?;
    `,
    [email, password],
  );

  return user ?? null;
}

// ==========================
// CART - ADD
// ==========================

export function addProductToCart(item: CartItem) {
  const existing = database.getFirstSync<CartItem>(
    `
      SELECT * FROM cart
      WHERE userId = ? AND productId = ?;
    `,
    [item.userId, item.productId],
  );

  if (existing) {
    database.runSync(
      `
        UPDATE cart
        SET quantity = quantity + 1
        WHERE userId = ? AND productId = ?;
      `,
      [item.userId, item.productId],
    );
  } else {
    database.runSync(
      `
        INSERT INTO cart (
          userId,
          productId,
          name,
          category,
          image,
          price,
          quantity
        )
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        item.userId,
        item.productId,
        item.name,
        item.category,
        item.image,
        item.price,
        item.quantity,
      ],
    );
  }
}

// ==========================
// CART - INCREASE
// ==========================

export function increaseItemQuantity(userId: number, productId: string) {
  database.runSync(
    `
      UPDATE cart
      SET quantity = quantity + 1
      WHERE userId = ? AND productId = ?;
    `,
    [userId, productId],
  );
}

// ==========================
// CART - DECREASE
// ==========================

export function decreaseItemQuantity(userId: number, productId: string) {
  const item = database.getFirstSync<CartItem>(
    `
      SELECT * FROM cart
      WHERE userId = ? AND productId = ?;
    `,
    [userId, productId],
  );

  if (!item) return;

  if (item.quantity <= 1) {
    database.runSync(
      `
        DELETE FROM cart
        WHERE userId = ? AND productId = ?;
      `,
      [userId, productId],
    );
    return;
  }

  database.runSync(
    `
      UPDATE cart
      SET quantity = quantity - 1
      WHERE userId = ? AND productId = ?;
    `,
    [userId, productId],
  );
}

// ==========================
// CART - REMOVE
// ==========================

export function removeItem(userId: number, productId: string) {
  database.runSync(
    `
      DELETE FROM cart
      WHERE userId = ? AND productId = ?;
    `,
    [userId, productId],
  );
}

// ==========================
// CART - GET
// ==========================

export function getCartByUser(userId: number) {
  return database.getAllSync<CartItem>(
    `
      SELECT * FROM cart
      WHERE userId = ?;
    `,
    [userId],
  );
}
