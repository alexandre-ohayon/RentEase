import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentsConsumerService } from './payments-consumer.service';
import { PaymentsModule } from '../payments/payments.module';
import { Partitioners } from 'kafkajs'; // Import nécessaire pour le partitionneur

@Module({
  imports: [
    forwardRef(() => PaymentsModule),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['localhost:9092'] },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
  ],
  providers: [PaymentsConsumerService],
  exports: [PaymentsConsumerService],
})
export class PaymentsConsumerModule {}
