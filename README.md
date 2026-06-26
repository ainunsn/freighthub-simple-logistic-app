# Logistic App

Panduan singkat untuk menjalankan service di mesin lokal.

## Prerequisites

Pastikan sudah menginstall:

* Node.js
* Yarn
* PostgreSQL

## Installation

Jalankan script berikut dari root project:

```bash
sh run.sh
```

Script tersebut akan:

* Membuat database `logistic_app`
* Membuat file `.env` default

## Backend Configuration

Perbarui file:

```bash
backend/.env
```

Contoh:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/logistic_app?schema=public"
```

Sesuaikan:

* `user`
* `password`
* `host`
* `port`

dengan konfigurasi PostgreSQL lokal.

## Data Seeding
Jalankan perintah
```
npx prisma db seed
```

## Frontend Configuration

Perbarui file:

```bash
frontend/.env
```

Contoh:

```env
VITE_API_URL=http://localhost:3000
```

Sesuaikan URL dengan alamat backend yang digunakan.

## Running the Application

Backend:

```bash
cd backend
yarn start
```

Frontend:

```bash
cd frontend
yarn dev
```

## Access

* Frontend: http://localhost:5173
* Backend: http://localhost:3000
* Swagger: http://localhost:3000/api
