import {
  openDatabase,
  ResultSet,
  Transaction,
} from 'react-native-sqlite-storage';
import { sqliteConnect } from "./Connex.ts";

export interface ConfigData {
  id: string;
  baseUrl: string;
}

class ConfigManager {
  private db: any;

  constructor() {
    this.db = sqliteConnect;

    this.createTable();
  }

  private createTable = async () => {
    const query_create: string = `CREATE TABLE IF NOT EXISTS config (
      id TEXT PRIMARY KEY NOT NULL,
      baseurl TEXT NOT NULL
    );`;

    try {
      await this.db.executeSql(query_create);
    } catch (err) {
      console.log('Error creating table:', err);
    }
  };

  public findById = async (idToFind: string): Promise<ConfigData | null> => {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (txn: Transaction) => {
          txn.executeSql(
            'SELECT * FROM config WHERE id = ?',
            [idToFind],
            (tx: Transaction, res: ResultSet) => {
              const len = res.rows.length;
              console.log(`Len >>> ${len}`);

              if (len > 0) {
                const obj: ConfigData = {
                  id: res.rows.item(0).id,
                  baseUrl: res.rows.item(0).baseurl,
                };

                console.log(`Obj >>> ${res.rows.item(0).id}`);
                resolve(obj);
              } else {
                resolve(null);
              }
            },
          );
        },
        (error: any) => {
          console.error('Transaction error: ', error);
          reject(error);
        },
      );
    });
  };

  public exist = async (idToFind: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        this.db.executeSql(
          'SELECT * FROM config WHERE id = ?',
          [idToFind],
          (res: ResultSet) => {
            const len = res.rows.length;
            if (len > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
        );
      } catch (error) {
        console.error('Testing Existence error: ', error);
        reject(error);
      }
    });
  };

  public insertData = async (id: string, baseUrl: string) => {
    const query_insert: string =
      'INSERT INTO config (id, baseurl) VALUES (?, ?);';
    const params = [id, baseUrl];

    try {
      await this.db.executeSql(query_insert, params);
      console.log('Config inserted successfully.');
    } catch (err) {
      console.log('Error inserting data:', err);
    }
  };

  public updateData = async (id: string, baseUrl: string) => {
    const query_update: string = 'UPDATE config SET baseurl = ? WHERE id = ?;';
    const params = [baseUrl, id];

    try {
      await this.db.executeSql(query_update, params);
      console.log('Config updated successfully.');
    } catch (err) {
      console.log('Error updating data:', err);
    }
  };

  // ... autres méthodes CRUD
}
export default ConfigManager;
