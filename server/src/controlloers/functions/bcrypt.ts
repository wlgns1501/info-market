const bcrypt = require('bcrypt');
import { config } from '../../config';

module.exports = {
  hash: async (password: string): Promise<void> => {
    return await bcrypt.hash(password, parseInt(config.bcrypt.saltRounds));
  },
  comparePw: async (password: string, hashPw: string): Promise<void> => {
    return await bcrypt.compare(password, hashPw);
  },
};
