import Like from '../../models/like';

console.log('======Create Table======');
const create_table_like = async () => {
  await Like.sync({ force: true })
    .then(() => {
      console.log('✅Success Create Table');
    })
    .catch((err: Error) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_like();
