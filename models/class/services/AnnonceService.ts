import {fetchBaseUrl} from './NetworkService.ts';
import { AnnonceData, PostAnnonceData } from "../Types.ts";
import axios from 'axios';

export const publierAnnonce = async (
  token: string,
  newAnnonce: PostAnnonceData,
) => {
  const baseUrl = await fetchBaseUrl();
  const url = `${baseUrl}/api/annonce/save`;
  try {
    const response = await axios.post(
      url,
      {newAnnonce},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('Status >>>' + response.status);
  } catch (error) {}
};
