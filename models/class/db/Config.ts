import {openDatabase} from 'react-native-sqlite-storage';

interface ConfigData {
  id: string | number;
  baseUrl: string;
}

class Config {
  private db: any;
  constructor() {
    this.db = openDatabase({
      name: 'VarotraFiara',
      location: 'default',
    });

    this.checkTable();
  }

  checkTable = async () => {
    const query_check: string =
      'SELECT name FROM sqlite_master WHERE type="table" AND name="config";';

    try {
      const [results] = await this.db.executeSql(query_check);

      if (results.rows.length === 0) {
        this.createTable();
      }
    } catch (err) {
      console.log('Error checking table:', err);
    }
  };

  createTable = async () => {
    const query_create: string = `CREATE TABLE IF NOT EXISTS config(
      id TEXT PRIMARY KEY,baseurl TEXT NOT NULL,
  );`;
    try {
      await this.db.executeSql(query_create);
    } catch (err) {
      console.log({err});
    }
  };

  insertData = async (id: string, baseUrl: string) => {
    const query_insert: string =
      'INSERT INTO config (id, baseurl) VALUES (?, ?)';
    const params = [baseUrl];

    try {
      await this.db.executeSql(query_insert, params);
    } catch (err) {
      console.log('err', err);
    }
  };

  updateData = async (id: string, baseUrl: string) => {
    const query_update: string = 'UPDATE config SET baseurl = ? WHERE id = ?';
    const params = [baseUrl, id];

    try {
      await this.db.executeSql(query_update, params);
    } catch (err) {
      console.log('err', err);
    }
  };

  deleteData = async (id: string) => {
    const query_delete = 'DELETE FROM config WHERE id = ?';
    const params = [id];

    try {
      await this.db.executeSql(query_delete, params);
    } catch (err) {
      console.log('err', err);
    }
  };

  findById = async (id: string): Promise<ConfigData | null> => {
    const query_select: string = 'SELECT * FROM config WHERE id = ?';
    const params = [id];

    try {
      const [results] = await this.db.executeSql(query_select, params);

      if (results.rows.length > 0) {
        const row = results.rows.item(0);
        return {id: row.id, baseUrl: row.baseurl};
      }

      return null;
    } catch (err) {
      console.log('err', err);
      return null;
    }
  };

  exist = async (id: string): Promise<boolean> => {
    const query_exist: string =
      'SELECT COUNT(*) as count FROM config WHERE id = ?';
    const params = [id];

    try {
      const [results] = await this.db.executeSql(query_exist, params);

      if (results.rows.length > 0) {
        const row = results.rows.item(0);
        return row.count > 0;
      }

      return false;
    } catch (err) {
      console.log('err', err);
      return false;
    }
  };
}
