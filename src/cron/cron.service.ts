import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as https from 'https';

@Injectable()
export class CronService {
  @Cron('*/1 * * * *')
  handleCron() {
    console.log('Waking up server...');
    https.get(`${process.env.SERVER_URL}/api/houses`, (res) => {
      res.statusCode === 200
        ? console.log("Server woke up successfully.")
        : console.error(`Failed to wake up server with status code ${res.statusCode}.`);
    }).on('error', (err) => {
      console.error('Error while waking server up:', err.message);
    });
  }
}
