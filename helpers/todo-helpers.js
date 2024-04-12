const connectToDatabase = require("../config/connection");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");

module.exports = {
  addTodo: (todo) => {
    return new Promise((resolve, reject) => {
      connectToDatabase().then((db) => {
        db.collection(collection.TODO_COLLECTION)
          .insertOne(todo)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  },
  getTodo: () => {
    return new Promise((resolve, reject) => {
      connectToDatabase()
        .then((db) => {
          db.collection(collection.TODO_COLLECTION)
            .find()
            .toArray()
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteTodo: (todoId) => {
    return new Promise((resolve, reject) => {
      connectToDatabase().then((db) => {
        db.collection(collection.TODO_COLLECTION)
          .deleteOne({ _id: new ObjectId(todoId) })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  },
  editTodo:(todoId, todoDetail)=>{
    return new Promise((resolve, reject) => {
        connectToDatabase().then(db => {
            db.collection(collection.TODO_COLLECTION).updateOne(
                { _id: new ObjectId(todoId) },
                { $set: { todo: todoDetail.todo } }
            )
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
        .catch(error => {   
            reject(error);
        });
    });
  }
};
