import type { Handler } from 'aws-lambda';

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (event): Promise<any> => {
  // eslint-disable-next-line no-console
  console.log('Hello World!');
  const response = JSON.stringify(event, null, 2);
  return response;
};
