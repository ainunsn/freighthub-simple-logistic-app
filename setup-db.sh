#!/bin/bash

echo "Creating database..."

psql postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'logistic_app'" \
| grep -q 1 || psql postgres -c "CREATE DATABASE logistic_app;"

echo "Setting up backend..."

cd backend || exit

if [ ! -f .env ]; then
cat <<EOF > .env
DATABASE_URL="postgresql://user:password@localhost:5432/logistic_app?schema=public"
EOF
fi

cd ../frontend || exit

echo "Setting up frontend..."

if [ ! -f .env ]; then
cat <<EOF > .env
VITE_API_URL=http://localhost:3000
EOF
fi