const pg = require('pg');
const uuid = require('uuid');

const { Client } = pg;
const client = new Client('postgres://localhost/donuts');
client.connect();

const nodeId = uuid.v4();
const javaId = uuid.v4();
const cId = uuid.v4();

const SQL = `
    DROP TABLE IF EXISTS posts;

    CREATE TABLE posts(
        id UUID PRIMARY KEY, 
        name VARCHAR(255)
    );
    INSERT INTO posts(id, name) values('${nodeId}', 'Node');
    INSERT INTO posts(id, name) values('${javaId}', 'Java');
    INSERT INTO posts(id, name) values('${cId}', 'C#');   
`;

const syncAndSeed = async ()=>{
    return client.query(SQL);
};

const findAllPosts = ()=>{
    return client.query('SELECT * FROM posts')
        .then( response => response.rows);
    
}
//  syncAndSeed()
module.exports = {
    syncAndSeed, 
    findAllPosts
}