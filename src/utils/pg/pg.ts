import  db  from '../postgres/postgres'

const pgAll = async (SQL, ...values) => {
  const client = await db.base.connect();
  try {
    const data = await client.query(SQL, values);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

export default { pgAll};
