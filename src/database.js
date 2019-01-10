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

      this._client.on('close', () => {
        console.log("Database disconnected");
        this.connected = false;
        this._db = null;
      })

      this._client.on('reconnect', () => {
        console.log("Database reconnected");
        this.connected = true;
        this._db = this._client.db(name);
      })

      await this._client.connect();
      console.log(`Connected to database ${url}/${name}`);
      this.connected = true;
      this._db = this._client.db(name);

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
    }
  }

  collection(name){
    if (this.connected == false) throw "Not connected to database.";
    return this._db.collection(name);
  }
}

const db = new Database();
module.exports = db;