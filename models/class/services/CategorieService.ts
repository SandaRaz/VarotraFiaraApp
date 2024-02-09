import {fetchBaseUrl} from './NetworkService.ts';
import axios from 'axios';
import {CategorieData} from '../Types.ts';

export const getAllCategories = async (token: string) => {
  const baseUrl = await fetchBaseUrl();
  console.log('Base Url: ' + baseUrl);

  const url: string = `${baseUrl}/api/categorie/all`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const values: CategorieData[] = [];
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
