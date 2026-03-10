export const up = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE events
        ADD COLUMN IF NOT EXISTS remaining_seats INTEGER;
      COMMIT;`);
};

export const down = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE events
        DROP COLUMN IF EXISTS remaining_seats ;
      COMMIT; `);
};
