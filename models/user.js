const users = [];

module.exports = class User {
  constructor(login, pass, role) {
  this.login = login;
  this.pass = pass;
  this.role = role;
  }
  save() {
    users.push(this);
  }
  static getAll() {
    return users;
  }
}
