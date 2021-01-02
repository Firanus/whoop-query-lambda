import { S3, Credentials } from 'aws-sdk';

const bucketName = 'personal-data-lake-ivan';
const uploadDirectory = 'whoop/';

// eslint-disable-next-line import/prefer-default-export
export const uploadFileToS3Bucket = async (fileName: string, file: any) => {
  const s3Client = makeS3Client();
  const params = { Bucket: bucketName, Key: `${uploadDirectory}${fileName}`, Body: JSON.stringify(file) };

  try {
    await s3Client.putObject(params).promise();
  } catch (error) {
    throw new Error(`There was a problem uploading file ${fileName} to S3. Error: ${JSON.stringify(error)}, File: ${JSON.stringify(file)}`);
  }
};

const makeS3Client = () => {
  if (process.env.IS_LOCAL_DEVELOPMENT === 'true') {
    const credentials = new Credentials({
      accessKeyId: process.env.AWS_LOCAL_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_LOCAL_SECRET_ACCESS_KEY || '',
    });
    return new S3({ region: 'eu-west-1', credentials });
  }

  return new S3({ region: 'eu-west-1' });
};
