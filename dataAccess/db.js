const lowdb = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const path = require('path');
const dbAsync = lowdb(new FileAsync(path.join(__dirname, 'db.json')));
const { v4: uuid } = require('uuid');

class DataAccess {
    constructor (tableName) {
      this.tableName = tableName;
      this.dbContext = dbAsync.then(db => {
        db.defaults({ [tableName]: [] }).write();
  
        return db;
      });
    }

    async getAll () {
        const dbContext = await this.dbContext;
        return dbContext.get(this.tableName).value();
    }

    async getByAny ({ propName, propValue }) {
        const dbContext = await this.dbContext;
    
        return dbContext
          .get(this.tableName)
          .find({ [propName]: propValue})
        //   .filter(x => x[propName].toLowerCase() === propValue.toLowerCase())
          .value();
    }

    async getById (id) {
        const dbContext = await this.dbContext;
    
        return dbContext
          .get(this.tableName)
          .find({ id })
          .value();
    }

    async delete (username) {
        const dbContext = await this.dbContext;

        dbContext
            .get(this.tableName)
            .remove({ username })
            .write();
    }

    async update (username, data) {
        const dbContext = await this.dbContext;

        dbContext.get(this.tableName)
            .find({ "username" : username })
            .assign(data)
            .write();
    }

    async insert (data) {
        const dbContext = await this.dbContext;
        const id = uuid();
    
        dbContext.get(this.tableName)
          .push({
            id,
            ...data
          })
          .write();
    
        return this.getById(id);
    }
}

module.exports = DataAccess;