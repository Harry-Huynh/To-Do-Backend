const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = require("../schemas/User");

let mongoDBConnectionString = process.env.MONGO_URL;
let User;

function connect() {
  return new Promise((resolve, reject) => {
    let db = mongoose.createConnection(mongoDBConnectionString);

    db.on("error", (error) => {
      reject(error);
    });

    db.once("open", () => {
      User = db.model("users", userSchema);
      resolve();
    });
  });
}

function registerUser(userData) {
  return new Promise((resolve, reject) => {
    if (userData.password != userData.password2) {
      reject("Passwords do not match");
    } else {
      bcrypt
        .hash(userData.password, 15)
        .then((hash) => {
          userData.password = hash;

          let newUser = new User(userData);

          newUser
            .save()
            .then(() => {
              resolve("User " + userData.userName + " successfully registered");
            })
            .catch((err) => {
              if (err.code == 11000) {
                reject("User Name already taken");
              } else {
                reject("There was an error creating the user: " + err);
              }
            });
        })
        .catch((err) => reject(err));
    }
  });
}

function checkUser(userData) {
  return new Promise((resolve, reject) => {
    User.findOne({ userName: userData.userName })
      .exec()
      .then((user) => {
        bcrypt.compare(userData.password, user.password).then((res) => {
          if (res === true) {
            resolve(user);
          } else {
            reject("Incorrect password for user " + userData.userName);
          }
        });
      })
      .catch((err) => {
        reject("Unable to find user " + userData.userName);
      });
  });
}

function getTasks(id) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then((user) => {
        resolve(user.tasks);
      })
      .catch((err) => {
        reject(`Unable to get tasks for user with id: ${id}`);
      });
  });
}

function addTask(id, newTask) {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, { $push: { tasks: newTask } }, { new: true })
      .exec()
      .then((user) => {
        resolve(user.tasks);
      })
      .catch((err) => {
        reject(`Unable to update tasks for user with id: ${id}`);
      });
  });
}

function updateTask(id, taskId, task) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { _id: id, "tasks._id": taskId },
      {
        $set: {
          "tasks.$.name": task.name,
          "tasks.$.status": task.status,
          "tasks.$.edit": task.edit,
        },
      },
      { new: true }
    )
      .exec()
      .then((user) => {
        resolve(user.tasks);
      })
      .catch((err) => {
        reject(`Unable to update tasks for user with id: ${id}`);
      });
  });
}

function deleteTask(id, taskId) {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    )
      .exec()
      .then((user) => {
        resolve(user.tasks);
      })
      .catch((err) => {
        reject(`Unable to update tasks for user with id: ${id}`);
      });
  });
}

module.exports = {
  connect,
  registerUser,
  checkUser,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
