import Server from '../server';
import api from '../api';
class loginApi extends Server {
  login(data, successFunc) {
    this.Post(api.account.login, data, successFunc);
  }
}
export default new loginApi();
