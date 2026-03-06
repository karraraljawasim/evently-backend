export const up = (pgm) => {
  pgm.sql(`
        ALTER TABLE events
        ALTER COLUMN date_happens TYPE TIMESTAMP
        USING date_happens::TIMESTAMP;
        
        `);
};

export const down = (pgm) => {
  pgm.sql(`
        ALTER TABLE events
        ALTER COLUMN date_happens TYPE  DATE
        USING date_happens::DATE;
        `);
};
