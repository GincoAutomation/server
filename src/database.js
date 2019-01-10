const MongoClient = require('mongodb').MongoClient

class Database{
  constructor(){
    this.connected = false;

    this._db = null;
    this._client = null;
  }

  async connect(url, name){
    if (this._db) return;
    try{
      this._client = new MongoClient(url, { useNewUrlParser: true });
      await this._client.connect();
      this._db = this._client.db(name);
      console.log(`Connected to database ${url}/${name}`);
      this.connected = true;

    } catch(err){
      this.connected = false;
      console.error('Database ', err);
    }
  }

  close(){
    if (this.connected && this._client){
      this._client.close();
      this.connected = false;
      this._db = null;
      this._client = null;
    }
  }

}

const db = new Database();
module.exports = db;