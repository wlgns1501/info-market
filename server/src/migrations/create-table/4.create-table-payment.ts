import Payment from '../../models/payment';

console.log('======Create Table======');
const create_table_payment = async () => {
  await Payment.sync({ force: true })
    .then(() => {
      console.log('✅Success Create Table');
    })
    .catch((err: Error) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_payment();
