import PointRefund from '../../models/pointRefund';

console.log('======Create Table======');
const create_table_pointRefund = async () => {
  await PointRefund.sync({ force: true })
    .then(() => {
      console.log('✅Success Create Table');
    })
    .catch((err: Error) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_pointRefund();
