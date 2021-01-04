import type { Handler } from 'aws-lambda';
import { uploadFileToS3Bucket } from './s3';
import { pullDataFromWhoopForLastDay, processWhoopDataForUpload } from './whoop';

// eslint-disable-next-line import/prefer-default-export
export const handler: Handler = async (): Promise<any> => {
  console.log('This guy got hit! (Notification to check CD pipeline)')

  // Get Data
  const whoopResponseData = await pullDataFromWhoopForLastDay();

  // Process and Upload
  const dataToUpload = processWhoopDataForUpload(whoopResponseData);
  await Promise.all(
    dataToUpload.map((dataPoint) => uploadFileToS3Bucket(dataPoint.fileName, dataPoint.file)),
  );

  // eslint-disable-next-line no-console
  console.log(`Successfully uploaded the following files: ${
    dataToUpload.reduce((acc, curr) => `${acc},${curr.fileName}`, '').substring(1)
  }`);
};
