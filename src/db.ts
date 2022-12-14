import * as mysql from 'mysql2';

export default mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nestjs1214',
  })
  .promise();
