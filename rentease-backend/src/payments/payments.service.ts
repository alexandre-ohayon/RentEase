import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('payment-received');
    await this.kafkaClient.connect();
  }

  emitPaymentReceived(data: any) {
    this.kafkaClient.emit('payment-received', data);
  }
}
