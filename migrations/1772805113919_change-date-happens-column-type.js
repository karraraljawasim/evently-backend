export const up = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE events
        ALTER COLUMN date_happens TYPE TIMESTAMP
        USING date_happens::TIMESTAMP;
      COMMIT;
        `);
};

export const down = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE events
        ALTER COLUMN date_happens TYPE  DATE
        USING date_happens::DATE;
      COMMIT;
        `);
};
