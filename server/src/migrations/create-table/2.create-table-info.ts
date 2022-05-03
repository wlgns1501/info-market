import Info from '../../models/info';

console.log('======Create Table======');
const create_table_info = async () => {
  await Info.sync({ force: true })
    .then(() => {
      console.log('✅Success Create Table');
    })
    .catch((err: Error) => {
      console.log('❗️Error in Create info Table : ', err);
    });
};

create_table_info();
