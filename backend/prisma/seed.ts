import { PrismaPg } from '@prisma/adapter-pg'
import { OrderStatus, PrismaClient, order } from 'generated/prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

const orders = [
  {
    id: ulid(),
    sender_name: 'Budi Santoso',
    recipient_name: 'Andi Wijaya',
    origin: 'Jakarta',
    destination: 'Bandung',
    status: 'PENDING',
    tracking_number: 'FH000001',
  },
  {
    id: ulid(),
    sender_name: 'Siti Aminah',
    recipient_name: 'Rina Putri',
    origin: 'Surabaya',
    destination: 'Malang',
    status: 'IN_TRANSIT',
    tracking_number: 'FH000002',
  },
  {
    id: ulid(),
    sender_name: 'Dedi Kurniawan',
    recipient_name: 'Ahmad Fauzi',
    origin: 'Bandung',
    destination: 'Jakarta',
    status: 'CANCELLED',
    tracking_number: 'FH000003',
  },
  {
    id: ulid(),
    sender_name: 'Rudi Hartono',
    recipient_name: 'Maya Sari',
    origin: 'Semarang',
    destination: 'Yogyakarta',
    status: 'DELIVERED',
    tracking_number: 'FH000004',
  },
  {
    id: ulid(),
    sender_name: 'Lina Marlina',
    recipient_name: 'Tono Saputra',
    origin: 'Bekasi',
    destination: 'Depok',
    status: 'PENDING',
    tracking_number: 'FH000005',
  },
  {
    id: ulid(),
    sender_name: 'Agus Salim',
    recipient_name: 'Fitri Handayani',
    origin: 'Bogor',
    destination: 'Jakarta',
    status: 'IN_TRANSIT',
    tracking_number: 'FH000006',
  },
  {
    id: ulid(),
    sender_name: 'Yuni Astuti',
    recipient_name: 'Eko Prasetyo',
    origin: 'Solo',
    destination: 'Semarang',
    status: 'CANCELLED',
    tracking_number: 'FH000007',
  },
  {
    id: ulid(),
    sender_name: 'Rina Lestari',
    recipient_name: 'Dian Nugraha',
    origin: 'Cirebon',
    destination: 'Bandung',
    status: 'DELIVERED',
    tracking_number: 'FH000008',
  },
  {
    id: ulid(),
    sender_name: 'Hendra Saputra',
    recipient_name: 'Salsa Putri',
    origin: 'Tangerang',
    destination: 'Jakarta',
    status: 'PENDING',
    tracking_number: 'FH000009',
  },
  {
    id: ulid(),
    sender_name: 'Nina Kartika',
    recipient_name: 'Fajar Ramadhan',
    origin: 'Makassar',
    destination: 'Balikpapan',
    status: 'IN_TRANSIT',
    tracking_number: 'FH000010',
  },
  {
    id: ulid(),
    sender_name: 'Asep Ridwan',
    recipient_name: 'Indah Permata',
    origin: 'Bandung',
    destination: 'Garut',
    status: 'CANCELLED',
    tracking_number: 'FH000011',
  },
  {
    id: ulid(),
    sender_name: 'Wawan Setiawan',
    recipient_name: 'Nadia Putri',
    origin: 'Tasikmalaya',
    destination: 'Bandung',
    status: 'DELIVERED',
    tracking_number: 'FH000012',
  },
  {
    id: ulid(),
    sender_name: 'Joko Susilo',
    recipient_name: 'Rahmawati',
    origin: 'Medan',
    destination: 'Pekanbaru',
    status: 'PENDING',
    tracking_number: 'FH000013',
  },
  {
    id: ulid(),
    sender_name: 'Farhan Akbar',
    recipient_name: 'Putra Mahesa',
    origin: 'Palembang',
    destination: 'Lampung',
    status: 'IN_TRANSIT',
    tracking_number: 'FH000014',
  },
  {
    id: ulid(),
    sender_name: 'Dian Anggraini',
    recipient_name: 'Sarah Aulia',
    origin: 'Denpasar',
    destination: 'Mataram',
    status: 'CANCELLED',
    tracking_number: 'FH000015',
  },
  {
    id: ulid(),
    sender_name: 'Rizky Maulana',
    recipient_name: 'Bayu Saputra',
    origin: 'Pontianak',
    destination: 'Samarinda',
    status: 'DELIVERED',
    tracking_number: 'FH000016',
  },
  {
    id: ulid(),
    sender_name: 'Putri Ayu',
    recipient_name: 'Galih Pratama',
    origin: 'Serang',
    destination: 'Tangerang',
    status: 'PENDING',
    tracking_number: 'FH000017',
  },
  {
    id: ulid(),
    sender_name: 'Yoga Prasetya',
    recipient_name: 'Melati Sari',
    origin: 'Kediri',
    destination: 'Surabaya',
    status: 'IN_TRANSIT',
    tracking_number: 'FH000018',
  },
  {
    id: ulid(),
    sender_name: 'Anisa Rahma',
    recipient_name: 'Rafi Hidayat',
    origin: 'Banjarmasin',
    destination: 'Banjarbaru',
    status: 'CANCELLED',
    tracking_number: 'FH000019',
  },
  {
    id: ulid(),
    sender_name: 'Ilham Fauzan',
    recipient_name: 'Dewi Kartika',
    origin: 'Padang',
    destination: 'Bukittinggi',
    status: 'DELIVERED',
    tracking_number: 'FH000020',
  },
]

async function main() {
  console.log('🌱 Seeding...')

  await prisma.order.createMany({
    data: orders.map((i) => ({
      id: i.id,
      sender_name: i.sender_name,
      recipient_name: i.recipient_name,
      origin: i.origin,
      destination: i.destination,
      status: i.status as OrderStatus,
      tracking_number: i.tracking_number,
    })),
  })

  console.log('Done seeding')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
