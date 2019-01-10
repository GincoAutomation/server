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
      this._client.on('close', () => {
        console.log("Database disconnected");
        this.connected = false;
        this._db = null;
        this._client = null;
      })
      this._db = this._client.db(name);
      console.log(`Connected to database ${url}/${name}`);
      this.connected = true;

    } catch(err){
      this.connected = false;
      console.error(`Could not connect to Database ${url}/${name}`);
      if (err.name != 'MongoNetworkError') console.error(err);
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

  collection(name){
    if (this.connected == false) throw "Not connected to database.";
    return this._db.collection(name);
  }
}

const db = new Database();
module.exports = db;