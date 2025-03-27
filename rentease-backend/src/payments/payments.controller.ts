import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  createPayment(@Body() body: any) {
    this.paymentsService.emitPaymentReceived(body);
    return { message: 'Payment event emitted to Kafka!' };
  }
}
