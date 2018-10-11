const promClient = require("../promclient");
const sql = require("mssql");

class PRequest extends sql.Request {
  constructor(...args) {
    super(...args);
  }

  execute() {
    return new Promise((resolve, reject) => {
      let startTime = new Date();
      super
        .execute(...arguments)
        .then(s => {
          promClient.endDbRequestTimer(arguments[0], startTime);
          resolve(s);
        })
        .catch(c => reject(c));
    });
  }
}

// export default {
//   ...sql,
//   Request: PRequest
// };

module.exports = {
  ...sql,
  Request: PRequest
};
