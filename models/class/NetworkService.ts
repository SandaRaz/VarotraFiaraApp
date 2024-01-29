import axios from 'axios';
import {CategorieData, MarqueData, MoteurTypeData, PaysData} from './Types.ts';
import ConfigManager, {ConfigData} from './db/ConfigManager.ts';
import {useEffect, useState} from 'react';

const configManager: ConfigManager = new ConfigManager();
const idConfig = 'CFG7001';

const baseUrl = configManager
  .findById(idConfig)
  .then((value: ConfigData | null) => {
    if (value != null) {
      return value.baseUrl;
    }
  })
  .catch((reason: any) => {
    console.error('There is an error: ', reason);
  });

function useBaseUrl(idConfig: string): string {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await configManager.findById(idConfig);
        if (result != null) {
          setUrl(result.baseUrl);
        }
      } catch (error) {
        console.error('Error fetching base url in NetworkService', error);
      }
    };
    fetchData();
  }, [idConfig]);

  return url;
}

export const getAllCategories = async () => {
  const baseUrl = useBaseUrl(idConfig);

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
