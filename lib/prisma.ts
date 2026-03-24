import { PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL!

const prismaClientSingleton = () => {
  // 1. Create a pg connection pool
  const pool = new Pool({ connectionString });
  // 2. Wrap it in the Prisma adapter
  const adapter = new PrismaPg(pool);
  // 3. Pass the adapter to Prisma
  return new PrismaClient({ adapter });
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prismaClient = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prismaClient

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prismaClient