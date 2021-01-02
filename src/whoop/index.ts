import axios from 'axios';
import { formatISO, subDays, startOfDay, endOfDay } from 'date-fns';
import { WhoopAuthenticationResponseData, WhoopCyclesResponseData } from './types';

interface AuthenticationResponseData {
  accessToken: string,
  userID: number,
}

const whoopURL = 'https://api-7.whoop.com/';
const authenticateEndPoint = 'oauth/token';
const cyclesEndpoint = (userID: number, startDate: Date, endDate: Date) => `users/${userID}/cycles?start=${formatISO(startDate)}&end=${formatISO(endDate)}`;

const authenticateWithWhoop = async (): Promise<AuthenticationResponseData> => {
  const postData = {
    username: process.env.WHOOP_USERNAME,
    password: process.env.WHOOP_PASSWORD,
    grant_type: 'password',
    issueRefresh: true,
  };

  try {
    const { data }: { data: WhoopAuthenticationResponseData } = await axios.post(`${whoopURL}${authenticateEndPoint}`, postData);
    return {
      accessToken: data.access_token,
      userID: data.user.id,
    };
  } catch (error) {
    throw new Error(`Experienced error while authenticating with Whoop: ${JSON.stringify(error)}`);
  }
};

export const pullDataFromWhoopForLastDay = async (): Promise<WhoopCyclesResponseData> => {
  const { accessToken, userID } = await authenticateWithWhoop();

  const currentDate = new Date();

  const startDate = startOfDay(subDays(currentDate, 1));
  const endDate = endOfDay(startDate);

  const url = `${whoopURL}${cyclesEndpoint(userID, startDate, endDate)}`;
  const headers = {
    authorization: `bearer ${accessToken}`,
  };

  try {
    const result = await axios.get(url, { headers });
    return result.data as WhoopCyclesResponseData;
  } catch (error) {
    throw new Error(`Experienced error while getting data from Whoop: ${JSON.stringify(error)}`);
  }
};

interface S3UploadData {
  fileName: string;
  file: any;
}

export const processWhoopDataForUpload = (
  cyclesData: WhoopCyclesResponseData,
): S3UploadData[] => cyclesData.map((datum) => {
  if (!datum.days || datum.days.length !== 1) {
    throw new Error('This data did not have an easily accessible date stamp');
  }

  const fileName = `${datum.days[0]}.json`;
  return {
    fileName,
    file: JSON.stringify(datum),
  };
});
