const store = require("../store");

const usersService = {
  userExists(userName) {
    return store.users.map(user => user.userName).includes(userName);
  },
  getAllusers() {
    return store.users;
  },
  getUser(userName) {
    return store.users.find(user => user.userName === userName);
  }
};

module.exports = usersService;
