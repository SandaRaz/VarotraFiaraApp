import {fetchBaseUrl} from './NetworkService.ts';
import axios from 'axios';
import {UtilisateurData} from '../Types.ts';

export const loginUser = async (email: string, password: string) => {
  const baseUrl = await fetchBaseUrl();

  const url: string = `${baseUrl}/api/public/login`;
  console.log('Url: ' + url);
  try {
    const response = await axios.post(url, {
      mail: email,
      password: password,
    });
    console.log('Status >>>' + response.status);
    console.log('Token >>> ' + response.data.accessToken);

    return response.data.accessToken;
  } catch (error: any) {
    throw new Error('Erreur lors de la connexion: ' + error.message);
  }
};

export const newUser = async (newuser: UtilisateurData) => {
  const baseUrl = fetchBaseUrl();
  const url: string = `${baseUrl}/api/public/register`;

  console.log('Url: ' + url);
  try {
    const response = await axios.post(url, newuser);
    console.log('Response Status: ' + response.status);
  } catch (error: any) {
    throw new Error("Erreur lors de l'inscription" + error.message);
  }
};
