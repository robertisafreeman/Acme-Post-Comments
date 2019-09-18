const pg = require('pg');
const uuid = require('uuid');

const { Client } = pg;
const client = new Client('postgres://localhost/posts');
client.connect();

const nodeId = uuid.v4();
const javaId = uuid.v4();
const cId = uuid.v4();
const tagId = uuid.v4();

const SQL = `
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS tags;

    CREATE TABLE posts(
        id UUID PRIMARY KEY, 
        name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE tags(
        id UUID PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
    );

    INSERT INTO posts(id, name) VALUES('${nodeId}', 'Node');
    INSERT INTO posts(id, name) VALUES('${javaId}', 'Java');
    INSERT INTO posts(id, name) VALUES('${cId}', 'C#');   

    INSERT INTO tags(id, name) VALUES('${tagId}', 'Tag')
`;

const syncAndSeed = async ()=>{
    await client.query(SQL);
    console.log('success');
};

const findAllPosts = async ()=>{
    const response = await client.query('SELECT * FROM posts');
    return response;
};
const findAllTags = async ()=>{
    const response = await client.query('SELECT * FROM tags');
    return response;
}
//  syncAndSeed()
module.exports = {
    syncAndSeed, 
    findAllPosts,
    findAllTags
}