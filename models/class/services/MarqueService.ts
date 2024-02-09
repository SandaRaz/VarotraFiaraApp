import axios from 'axios';
import {MarqueData} from '../Types.ts';
import {fetchBaseUrl} from './NetworkService.ts';

export const getAllMarques = async (token: string) => {
  const baseUrl = await fetchBaseUrl();

  const url: string = `${baseUrl}/api/marque/all`;
  console.log('Api url: ' + url);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const values: MarqueData[] = [];
    const data = response.data;
    console.log('Values: ', values);
    console.log('Response Data: ', response.data);
    for (let i = 0; i < data.length; i++) {
      values.push({id: data[i].id, nom: data[i].nom});
    }

    return values;
  } catch (error: any) {
    console.error('Erreur lors de la requete: ', error.message);
  }
};
