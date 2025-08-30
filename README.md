# FinalNodeJS

## Giới thiệu

Dự án gồm hai phần: **client** (React + Vite) và **server** (Node.js + Express).

---

## Yêu cầu

- Node.js >= 18
- npm >= 9

---

## Cài đặt

### 1. Cài đặt dependencies cho client

```sh
cd client
npm install
```

### 2. Cài đặt dependencies cho server

```sh
cd ../server
npm install
```

### 3. Chạy server

```sh
cd server
npm start
```
# Lưu ý: Nếu chưa có script start, chạy:

```sh
node index.js
```
### 4. Chạy client (ở cửa sổ terminal khác)

```sh
cd client
npm run dev
```

### 5. Truy cập ứng dụng
Giao diện client: http://localhost:5173 (mặc định của Vite)

API server: http://localhost:3000 (nếu server chạy cổng 3000)

FinalNodeJS/
│
├── client/   # React + Vite frontend
└── server/   # Node.js + Express backend