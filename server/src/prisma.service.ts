import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super(); // En la v5, esto leerá el .env sin problemas
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ DATABASE CONNECTED (v5)');
    } catch (error) {
      console.error('❌ CONNECTION ERROR:', error.message);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}