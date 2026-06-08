import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const database = !isWeb ? SQLite.openDatabaseSync('snackfood.db') : null;

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

const usersTable: User[] = [];
let cartTable: CartItem[] = [];
let nextUserId = 1;
let nextCartId = 1;

export function initDatabase() {
  if (isWeb) return;

  database?.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  database?.execSync(`
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

export function createUser({ name, email, password }: User) {
  if (isWeb) {
    usersTable.push({ id: nextUserId++, name, email, password });
    return;
  }
  database?.runSync(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?);',
    [name, email, password],
  );
}

export function loginUser(email: string, password: string): User | null {
  if (isWeb) {
    return (
      usersTable.find((u) => u.email === email && u.password === password) ??
      null
    );
  }
  return (
    database?.getFirstSync<User>(
      'SELECT * FROM users WHERE email = ? AND password = ?;',
      [email, password],
    ) ?? null
  );
}

export function checkEmailExists(email: string): boolean {
  if (isWeb) {
    return usersTable.some((u) => u.email === email);
  }
  const user = database?.getFirstSync<User>(
    'SELECT id FROM users WHERE email = ?;',
    [email],
  );
  return !!user;
}

export function addProductToCart(item: CartItem) {
  if (isWeb) {
    const existing = cartTable.find(
      (c) => c.userId === item.userId && c.productId === item.productId,
    );
    if (existing) existing.quantity += 1;
    else cartTable.push({ ...item, id: nextCartId++ });
    return;
  }

  const existing = database?.getFirstSync<CartItem>(
    'SELECT * FROM cart WHERE userId = ? AND productId = ?;',
    [item.userId, item.productId],
  );

  if (existing) {
    database?.runSync(
      'UPDATE cart SET quantity = quantity + 1 WHERE userId = ? AND productId = ?;',
      [item.userId, item.productId],
    );
  } else {
    database?.runSync(
      'INSERT INTO cart (userId, productId, name, category, image, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?);',
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

export function increaseItemQuantity(userId: number, productId: string) {
  if (isWeb) {
    const item = cartTable.find(
      (c) => c.userId === userId && c.productId === productId,
    );
    if (item) item.quantity += 1;
    return;
  }
  database?.runSync(
    'UPDATE cart SET quantity = quantity + 1 WHERE userId = ? AND productId = ?;',
    [userId, productId],
  );
}

export function decreaseItemQuantity(userId: number, productId: string) {
  if (isWeb) {
    const index = cartTable.findIndex(
      (c) => c.userId === userId && c.productId === productId,
    );
    if (index !== -1) {
      if (cartTable[index].quantity <= 1) cartTable.splice(index, 1);
      else cartTable[index].quantity -= 1;
    }
    return;
  }

  const item = database?.getFirstSync<CartItem>(
    'SELECT * FROM cart WHERE userId = ? AND productId = ?;',
    [userId, productId],
  );

  if (!item) return;

  if (item.quantity <= 1) {
    database?.runSync('DELETE FROM cart WHERE userId = ? AND productId = ?;', [
      userId,
      productId,
    ]);
  } else {
    database?.runSync(
      'UPDATE cart SET quantity = quantity - 1 WHERE userId = ? AND productId = ?;',
      [userId, productId],
    );
  }
}

export function removeItem(userId: number, productId: string) {
  if (isWeb) {
    cartTable = cartTable.filter(
      (c) => !(c.userId === userId && c.productId === productId),
    );
    return;
  }
  database?.runSync('DELETE FROM cart WHERE userId = ? AND productId = ?;', [
    userId,
    productId,
  ]);
}

export function getCartByUser(userId: number): CartItem[] {
  if (isWeb) {
    return cartTable.filter((c) => c.userId === userId);
  }
  return (
    database?.getAllSync<CartItem>('SELECT * FROM cart WHERE userId = ?;', [
      userId,
    ]) ?? []
  );
}
