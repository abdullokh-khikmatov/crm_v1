import { Pool } from 'pg';

const base = new Pool({
  connectionString:
    'postgres://postgres:parolsiz@localhost:5432/yuniygeniy_crm',
});

export default { base };
