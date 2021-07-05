const DataAccess = require('./db');

class UserDataAccess extends DataAccess {
  constructor () {
    super('users');
  }

  async getUserByEmailAddress (emailAddress) {
    const user = await this.getByAny({
      propName: 'emailAddress',
      propValue: emailAddress
    });

    return user;
  }

  async getUserByUsername (username) {
    const user = await this.getByAny({
      propName: 'username',
      propValue: username
    });

    return user;
  }
}

module.exports = new UserDataAccess();
