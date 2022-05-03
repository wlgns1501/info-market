import Reply from '../../models/reply';

console.log('======Create Table======');
const create_table_reply = async () => {
  await Reply.sync({ force: true })
    .then(() => {
      console.log('✅Success Create Table');
    })
    .catch((err: Error) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_reply();
