import type { Handler } from 'aws-lambda';
import { authenticateWithWhoop } from './whoop';

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event): Promise<any> => {
  // 1. Authenticate with Whoop
  await authenticateWithWhoop();

  // 2. Pull latest data from Whoop

  // 3. Store data in S3
};
