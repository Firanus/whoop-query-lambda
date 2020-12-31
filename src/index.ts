import { ScheduledHandler, Handler } from 'aws-lambda';

export const handler: Handler = async (event): Promise<any> => {
  console.log('Hello World!');
  const response = JSON.stringify(event, null, 2);
  return response;
}