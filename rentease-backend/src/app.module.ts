import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PropertiesModule } from './properties/properties.module';
import { TenantsModule } from './tenants/tenants.module';
import { LeasesModule } from './leases/leases.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsConsumerModule } from './payments-consumer/payments-consumer.module';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    forwardRef(() => PaymentsModule),
    forwardRef(() => PaymentsConsumerModule),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/default-db',
    ),
    PropertiesModule,
    TenantsModule,
    LeasesModule,
    PaymentsModule,
    PaymentsConsumerModule,
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: ['localhost:9092'],
            },
            consumer: {
              groupId: 'rentease-group',
              allowAutoTopicCreation: true,
            },
            producer: {
              createPartitioner: Partitioners.LegacyPartitioner,
            },
          },
        }),
      },
    ]),
    AuthModule,
  ],
  exports: [ClientsModule],
})
export class AppModule {}
