import axios from 'axios';
import {CategorieData, MarqueData, MoteurTypeData, PaysData} from './Types.ts';

const baseUrl: string = 'http://192.168.56.1:8080';

export const getAllCategories = async () => {
  const url: string = `${baseUrl}/api/categorie/all`;
  try {
    const response = await axios.get(url);
    const values: CategorieData[] = [];
    const data = response.data;
    for (let i = 0; i < data.length; i++) {
      values.push({id: data[i].id, nom: data[i].nom});
    }

    console.log('Values: ', values);
    return values;
  } catch (error: unknown) {
    // @ts-ignore
    console.error('Erreur lors de la requete: ', error.message);
  }
};

export const getAllMarques = async () => {
  const url: string = `${baseUrl}/api/marque/all`;
  try {
    const response = await axios.get(url);
    const values: MarqueData[] = [];
    const data = response.data;
    for (let i = 0; i < data.length; i++) {
      values.push({id: data[i].id, nom: data[i].nom});
    }

    console.log('Values: ', values);
    return values;
  } catch (error: unknown) {
    // @ts-ignore
    console.error('Erreur lors de la requete: ', error.message);
  }
};

export const getAllTypeMoteurs = async () => {
  const url: string = `${baseUrl}/api/typemoteur/all`;
  try {
    const response = await axios.get(url);
    const values: MoteurTypeData[] = [];
    const data = response.data;
    for (let i = 0; i < data.length; i++) {
      values.push({id: data[i].id, type: data[i].type});
    }

    console.log('Values: ', values);
    return values;
  } catch (error: unknown) {
    // @ts-ignore
    console.error('Erreur lors de la requete: ', error.message);
  }
};

export const getAllPays = async () => {
  const url: string = `${baseUrl}/api/pays/all`;
  try {
    const response = await axios.get(url);
    const values: PaysData[] = [];
    const data = response.data;
    for (let i = 0; i < data.length; i++) {
      values.push({id: data[i].id, nom: data[i].nom});
    }

    console.log('Values: ', values);
    return values;
  } catch (error: unknown) {
    // @ts-ignore
    console.error('Erreur lors de la requete: ', error.message);
  }
};
