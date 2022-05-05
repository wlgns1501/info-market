import Payment from '../models/payment';

export async function createPayment(
  userId: number,
  infoId: number,
  state: string,
  tid: number,
) {
  return await Payment.create({
    userId,
    infoId,
    state,
    tid,
  });
}

export async function getPayment(infoId: number) {
  return await Payment.findOne({
    where: {
      id: infoId,
    },
  });
}

export async function refundPayment(tid: number) {
  return await Payment.update(
    {
      state: 'refund',
    },
    {
      where: {
        tid,
      },
    },
  );
}
