import axios from 'axios';
import {PaysData} from '../Types.ts';
import {fetchBaseUrl} from './NetworkService.ts';

export const getAllPays = async (token: string) => {
  const baseUrl = await fetchBaseUrl();

  const url: string = `${baseUrl}/api/pays/all`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const values: PaysData[] = [];
    const data = response.data;
    for (let i = 0; i < data.length; i++) {
      values.push({id: data[i].id, nom: data[i].nom});
    }

    console.log('Values: ', values);
    return values;
  } catch (error: any) {
    console.error('Erreur lors de la requete: ', error.message);
  }
};
