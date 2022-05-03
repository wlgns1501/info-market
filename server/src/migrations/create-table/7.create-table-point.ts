import Point from '../../models/point';

console.log('======Create Table======');
const create_table_point = async () => {
  await Point.sync({ force: true })
    .then(() => {
      console.log('✅Success Create Table');
    })
    .catch((err: Error) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_point();
