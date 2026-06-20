import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class JsonModel {
  constructor(collectionName) {
    this.filePath = path.join(DATA_DIR, `${collectionName}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  async find(query = {}) {
    const items = this.read();
    return items.filter(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  }

  async findOne(query = {}) {
    const items = await this.find(query);
    return items[0] || null;
  }

  async findById(id) {
    const items = this.read();
    return items.find(item => item._id === id || item.id === id) || null;
  }

  async create(doc) {
    const items = this.read();
    
    // Hash password if it is the User collection and password is not yet hashed
    if (doc.password && !doc.password.startsWith('$2a$') && !doc.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSaltSync(10);
      doc.password = await bcrypt.hashSync(doc.password, salt);
    }

    const newDoc = {
      _id: new mongoose.Types.ObjectId().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...doc
    };
    items.push(newDoc);
    this.write(items);
    return newDoc;
  }

  async findByIdAndUpdate(id, updates, options = {}) {
    const items = this.read();
    const idx = items.findIndex(item => item._id === id || item.id === id);
    if (idx === -1) return null;
    
    items[idx] = {
      ...items[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.write(items);
    return items[idx];
  }

  async findByIdAndDelete(id) {
    const items = this.read();
    const idx = items.findIndex(item => item._id === id || item.id === id);
    if (idx === -1) return null;
    const deleted = items.splice(idx, 1)[0];
    this.write(items);
    return deleted;
  }

  writeAll(data) {
    this.write(data);
  }
}

function wrapDoc(doc, jsonModel) {
  if (!doc) return null;
  if (jsonModel.filePath.endsWith('users.json')) {
    if (doc.role === undefined) doc.role = 'admin';
    if (doc.isBlocked === undefined) doc.isBlocked = false;
  }
  return {
    ...doc,
    async comparePassword(candidatePassword) {
      if (doc.password.startsWith('$2a$') || doc.password.startsWith('$2b$')) {
        return bcrypt.compare(candidatePassword, doc.password);
      }
      return candidatePassword === doc.password;
    },
    async save() {
      // Hash password if needed
      if (this.password && !this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
        const salt = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hashSync(this.password, salt);
      }
      if (this._id) {
        await jsonModel.findByIdAndUpdate(this._id, this);
      } else {
        const newDoc = await jsonModel.create(this);
        Object.assign(this, newDoc);
      }
      return this;
    }
  };
}

export function wrapModel(modelName, mongooseModel) {
  const collectionName = modelName.toLowerCase() + 's';
  const jsonModel = new JsonModel(collectionName);
  
  function ModelInstance(data) {
    if (mongoose.connection.readyState === 1) {
      return new mongooseModel(data);
    }
    this.data = data;
    this.save = async function() {
      const doc = await jsonModel.create(this.data);
      Object.assign(this, doc);
      return wrapDoc(this, jsonModel);
    };
  }

  ModelInstance.find = function(query) {
    if (mongoose.connection.readyState === 1) {
      const q = mongooseModel.find(query);
      return q;
    }
    const promise = jsonModel.find(query).then(items => items.map(d => wrapDoc(d, jsonModel)));
    promise.sort = function() {
      return this.then(items => items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    };
    return promise;
  };

  ModelInstance.findOne = function(query) {
    if (mongoose.connection.readyState === 1) return mongooseModel.findOne(query);
    return jsonModel.findOne(query).then(item => wrapDoc(item, jsonModel));
  };

  ModelInstance.findById = function(id) {
    if (mongoose.connection.readyState === 1) {
      const q = mongooseModel.findById(id);
      return q;
    }
    const promise = jsonModel.findById(id).then(item => wrapDoc(item, jsonModel));
    promise.select = function() { return this; };
    return promise;
  };

  ModelInstance.findByIdAndUpdate = function(id, updates, options) {
    if (mongoose.connection.readyState === 1) return mongooseModel.findByIdAndUpdate(id, updates, options);
    return jsonModel.findByIdAndUpdate(id, updates, options).then(item => wrapDoc(item, jsonModel));
  };

  ModelInstance.findByIdAndDelete = function(id) {
    if (mongoose.connection.readyState === 1) return mongooseModel.findByIdAndDelete(id);
    return jsonModel.findByIdAndDelete(id).then(item => wrapDoc(item, jsonModel));
  };

  ModelInstance.deleteMany = function(query) {
    if (mongoose.connection.readyState === 1) return mongooseModel.deleteMany(query);
    jsonModel.writeAll([]);
    return Promise.resolve({ deletedCount: 0 });
  };

  ModelInstance.insertMany = function(docs) {
    if (mongoose.connection.readyState === 1) return mongooseModel.insertMany(docs);
    const items = jsonModel.read();
    const newDocs = docs.map(doc => {
      // Hash password if needed
      if (doc.password && !doc.password.startsWith('$2a$') && !doc.password.startsWith('$2b$')) {
        const salt = bcrypt.genSaltSync(10);
        doc.password = bcrypt.hashSync(doc.password, salt);
      }
      return {
        _id: new mongoose.Types.ObjectId().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...doc
      };
    });
    items.push(...newDocs);
    jsonModel.writeAll(items);
    return Promise.resolve(newDocs.map(d => wrapDoc(d, jsonModel)));
  };

  return ModelInstance;
}
