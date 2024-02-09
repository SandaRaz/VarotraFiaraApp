import axios from 'axios';
import {MoteurTypeData} from '../Types.ts';
import {fetchBaseUrl} from './NetworkService.ts';

export const getAllTypeMoteurs = async (token: string) => {
  const baseUrl = await fetchBaseUrl();

  const url: string = `${baseUrl}/api/moteur/all`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const values: MoteurTypeData[] = [];
    const data = response.data;
    for (let i = 0; i < data.length; i++) {
      values.push({id: data[i].id, type: data[i].type});
    }

    console.log('Values: ', values);
    return values;
  } catch (error: any) {
    console.error('Erreur lors de la requete: ', error.message);
  }
};
