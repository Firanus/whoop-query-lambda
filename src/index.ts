import type { Handler } from 'aws-lambda';
import { pullDataFromWhoopForLastDay } from './whoop';

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event): Promise<any> => {
  // 1. Pull latest data from Whoop
  await pullDataFromWhoopForLastDay();

  // 2. Store data in S3
};
