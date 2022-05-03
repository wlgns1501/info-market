import Admin from '../../models/admin';

console.log('======Create Table======');
const create_table_admin = async () => {
  await Admin.sync({ force: true })
    .then(() => {
      console.log('✅Success Create Table');
    })
    .catch((err: Error) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_admin();
