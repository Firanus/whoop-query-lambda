import axios from 'axios';
import { formatISO, parseISO, startOfDay } from 'date-fns';
import { WhoopAuthenticationResponseData, WhoopCyclesResponseData } from './types';

// eslint-disable-next-line import/prefer-default-export
interface AuthenticationResponseData {
  accessToken: string,
  userID: number,
  userCreateDate: string, // TODO: remove this once we've got baseline data
}

const whoopURL = 'https://api-7.whoop.com/';
const authenticateEndPoint = 'oauth/token';
const cyclesEndpoint = (userID: number, startDate: Date, endDate: Date) => `users/${userID}/cycles?start=${formatISO(startDate)}&end=${formatISO(endDate)}`;

export const authenticateWithWhoop = async (): Promise<AuthenticationResponseData> => {
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
      userCreateDate: data.user.createdAt,
    };
  } catch (error) {
    throw new Error(`Experienced error while authenticating with Whoop: ${JSON.stringify(error)}`);
  }
};

export const pullDataFromWhoopForLastDay = async (): Promise<WhoopCyclesResponseData> => {
  const { accessToken, userID, userCreateDate } = await authenticateWithWhoop();

  const currentDate = new Date();

  const startDate = startOfDay(parseISO(userCreateDate));
  const endDate = startOfDay(currentDate);

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
