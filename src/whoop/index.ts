import axios from 'axios';
import { WhoopAuthenticationResponseData } from './types';

// eslint-disable-next-line import/prefer-default-export
export const authenticateWithWhoop = async () => {
  const postData = {
    username: process.env.WHOOP_USERNAME,
    password: process.env.WHOOP_PASSWORD,
    grant_type: 'password',
    issueRefresh: true,
  };

  try {
    const { data }: { data: WhoopAuthenticationResponseData } = await axios.post('https://api-7.whoop.com/oauth/token', postData);
    const { access_token: accessToken } = data;
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    throw new Error(`Experienced error while authenticating with Whoop: ${JSON.stringify(error)}`);
  }
};
