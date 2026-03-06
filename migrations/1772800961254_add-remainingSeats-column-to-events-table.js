export const up = (pgm) => {
  pgm.sql(`
        ALTER TABLE events
        ADD COLUMN remainingSeats INT ;`);
};

export const down = (pgm) => {
  pgm.sql(`
        ALTER TABLE events
        DROP COLUMN remainingSeats ;`);
};
