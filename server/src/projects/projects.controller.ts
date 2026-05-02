import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Asegúrate de que la ruta sea la correcta

@Controller('projects')
export class ProjectsController {
  // Inyectamos el servicio de Prisma directamente aquí
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll() {
    // Llamamos a la base de datos directamente
    return await this.prisma.project.findMany();
  }
}