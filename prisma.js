import { PrismaClient } from '@prisma/client';

export const prisma =
  global.prisma || new PrismaClient()

global.prisma = prisma;