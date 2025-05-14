const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
dotenv.config();
const userService = require("./services/user-service");
const { RegisterRoute, LoginRoute } = require("./routes/User");
const { GetTasks, AddTask, UpdateTask, DeleteTask } = require("./routes/Task");

const HTTP_PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.JWT_SECRET,
};

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);

  if (jwt_payload) {
    next(null, {
      _id: jwt_payload._id,
      userName: jwt_payload.userName,
    });
  } else {
    next(null, false);
  }
});

passport.use(strategy);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post(RegisterRoute, (req, res) => {
  userService
    .registerUser(req.body)
    .then((msg) => {
      res.json({ message: msg });
    })
    .catch((error) => {
      res.status(422).json({ message: error });
    });
});

app.post(LoginRoute, (req, res) => {
  userService
    .checkUser(req.body)
    .then((user) => {
      let pay_load = {
        _id: user._id,
        userName: user.userName,
      };

      let token = jwt.sign(pay_load, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({ message: "Login successful", token: token });
    })
    .catch((error) => {
      res.status(422).json({ message: error });
    });
});

app.get(
  GetTasks,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .getTasks(req.user._id)
      .then((tasks) => {
        res.json(tasks);
      })
      .catch((error) => {
        res.status(422).json({ message: error });
      });
  }
);

app.post(
  AddTask,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .addTask(req.user._id, req.body)
      .then((tasks) => {
        res.json(tasks);
      })
      .catch((error) => {
        res.status(422).json({ message: error });
      });
  }
);

app.put(
  UpdateTask,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .updateTask(req.user._id, req.params.id, req.body)
      .then((tasks) => {
        res.json(tasks);
      })
      .catch((error) => {
        res.status(422).json({ message: error });
      });
  }
);

app.delete(
  DeleteTask,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .deleteTask(req.user._id, req.params.id)
      .then((tasks) => {
        res.json(tasks);
      })
      .catch((error) => {
        res.status(422).json({ message: error });
      });
  }
);

app.use((req, res) => {
  res.status(404).send("Not Found");
});

userService
  .connect()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server running on port ${HTTP_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit();
  });
