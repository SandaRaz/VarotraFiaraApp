import { openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";

export const sqliteConnect = openDatabase({
  name: 'VarotraFiara',
  location: 'default',
});

export const checkTableExistence = async (
  db: any,
  nomTable: string,
  createTable: Promise<void>,
) => {
  const query_check: string =
    'SELECT name FROM sqlite_master WHERE type="table" AND name=' +
    nomTable +
    ';';

  try {
    const [results] = await db.executeSql(query_check);

    if (results.rows.length === 0) {
      createTable;
    }
  } catch (err) {
    console.log('Error checking table:', err);
  }
};
