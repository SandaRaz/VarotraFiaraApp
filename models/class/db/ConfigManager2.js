import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({
  name: 'VarotraFiara',
  location: 'default',
});

export function findConfigById(id) {
  db.transaction(function (txn) {
    txn.executeSql(
      'SELECT * FROM config WHERE id = ?', //Query to execute as prepared statement
      [id], //Argument to pass for the prepared statement
      function (tx, res) {
        const len = res.rows.length;
        console.log(`Len >>> ${len}`);
      }, //Callback function to handle the result
    );
  });
}
