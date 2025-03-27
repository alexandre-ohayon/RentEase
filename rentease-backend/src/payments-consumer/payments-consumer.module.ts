import { Module } from '@nestjs/common';
import { PaymentsConsumerService } from './payments-consumer.service';

@Module({
  providers: [PaymentsConsumerService]
})
export class PaymentsConsumerModule {}
