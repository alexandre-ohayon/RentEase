import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class PaymentsConsumerService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  @EventPattern('payment-received')
  handlePayment(@Payload() message: { value: any }) {
    if (!message || typeof message.value === 'undefined') {
      console.error('Invalid message received:', message);
      return;
    }

    console.log('Received message from Kafka:', message.value);

    const pdfPath = `receipt-${Date.now()}.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(25).text('RentEase Receipt', 100, 100);
    doc.text(`Payment details: ${JSON.stringify(message.value)}`, 100, 150);
    doc.end();

    console.log(`PDF Receipt generated: ${pdfPath}`);
  }
}
