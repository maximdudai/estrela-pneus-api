
import dbConnection from '../connection.js';

export default function sendQuery (query) {
    dbConnection.query(query);
}
