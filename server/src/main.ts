import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Habilitar CORS para que el Front (3000) pueda hablar con el Back (3001)
    app.enableCors();

    await app.listen(3001, '0.0.0.0');
    console.log('✅ EL BACKEND ESTÁ VIVO EN: http://localhost:3001');
  } catch (error) {
    console.error('❌ EL BACKEND NO PUDO ARRANCAR:', error);
  }
}
bootstrap();