import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) {}

  async getHello() {
    const message = this.client.send({ cmd: 'greeting' }, 'Just a hello world');
    return message;
  }

  async getHelloAsync() {
    const message = await this.client.send(
      { cmd: 'greeting-async' },
      'Just a hello world',
    );
    return message;
  }

  async publishEvent() {
    this.client.emit('book-created', {
      bookName: 'Just a hello world',
      author: 'Harshit Chhipa',
    });
  }
}
