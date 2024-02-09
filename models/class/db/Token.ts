import {ResultSet} from 'react-native-sqlite-storage';
import {sqliteConnect} from './Connex.ts';
import axios from 'axios';
import {fetchBaseUrl} from '../services/NetworkService.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface TokenData {
  id: string | number;
  value: string;
}

class Token {
  private db: any;

  constructor() {
    this.db = sqliteConnect;
  }

  private createTable = async () => {
    const sql: string =
      'CREATE TABLE IF NOT EXISTS token(id TEXT PRIMARY KEY NOT NULL, value TEXT);';

    try {
      await this.db.executeSql(sql);
    } catch (err) {
      console.error('Error creating table TOKEN: ' + err);
    }
  };

  public getToken = async (idToFind: string): Promise<string | null> => {
    const sql: string = 'SELECT * FROM token WHERE id = ?';
    const params: any[] = [idToFind];
    return new Promise((resolve, reject) => {
      try {
        this.db.executeSql(sql, params, (res: ResultSet) => {
          const len = res.rows.length;
          if (len > 0) {
            const token: string = res.rows.item(0).value;
            resolve(token);
          }
        });
      } catch (error) {
        console.error('Error getting Token by key: ', error);
        reject(error);
      }
    });
  };

  public exist = async (idToFind: string): Promise<boolean | null> => {
    const sql: string = 'SELECT * FROM token WHERE id = ?';
    const params: any[] = [idToFind];
    return new Promise((resolve, reject) => {
      try {
        this.db.executeSql(sql, params, (res: ResultSet) => {
          const len = res.rows.length;
          if (len > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } catch (error) {
        console.error('Error getting Token by key: ', error);
        reject(error);
      }
    });
  };

  public setToken = async (key: string, value: string) => {
    try {
      const exist = await this.exist(key);
      if (exist) {
        await this.update(key, value);
      } else {
        await this.save(key, value);
      }
      console.log('Token saved successfully');
    } catch (error) {
      console.error('Error setting Token: ' + error);
    }
  };

  public save = async (id: string, value: string) => {
    const sql = 'INSERT INTO token(id, value) VALUES(?, ?);';
    const params: any[] = [id, value];

    try {
      await this.db.executeSql(sql, params);
      console.log('Token saved successfuly');
    } catch (error) {
      console.error('Saving token ERROR: ', error);
    }
  };

  public update = async (id: string, value: string) => {
    const sql = 'UPDATE token SET value = ? WHERE id = ?;';
    const params: any[] = [value, id];

    try {
      await this.db.executeSql(sql, params);
      console.log('Token updated successfuly');
    } catch (error) {
      console.error('Saving token ERROR: ', error);
    }
  };
}

export const checkTokenValidity = async (token: string) => {
  const baseUrl = await fetchBaseUrl();
  const marqueUrl: string = `${baseUrl}/api/marque/all`;
  try {
    const response = await axios.get(marqueUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const status = response.status;
    console.log('Voici la status du response: ' + status);

    return status === 200;
  } catch (error) {
    console.log('Il y a une erreur dans checkTokenValidity donc false');
    return false;
  }
};

type RootStackParamList = {
  CompteStack: {screen: string};
};

export const useLoginToken = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('CompteStack', {screen: 'Login'});
      } else {
        const isValid = await checkTokenValidity(token);
        if (!isValid) {
          navigation.navigate('CompteStack', {screen: 'Login'});
        }
      }
    } catch (error) {
      console.log('   Erreur dans checkToken: ' + error);
    }
  };
};
