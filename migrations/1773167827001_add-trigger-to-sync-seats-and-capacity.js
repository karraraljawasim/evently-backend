export const up = (pgm) => {
  pgm.sql(`
      BEGIN;
        CREATE OR REPLACE FUNCTION sync_seats_and_capacity_func()
        RETURNS TRIGGER AS $$
        BEGIN
          IF NEW.max_capacity <> OLD.max_capacity  AND NEW.remaining_seats = OLD.remaining_seats THEN
            NEW.remaining_seats := OLD.remaining_seats + (NEW.max_capacity - OLD.max_capacity);
          END IF;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER sync_seats_and_capacity
        BEFORE UPDATE ON events
        FOR EACH ROW
        EXECUTE FUNCTiON sync_seats_and_capacity_func();
      COMMIT;
        `);
};

export const down = (pgm) => {
  pgm.sql(`
      BEGIN;
        DROP TRIGGER IF EXISTS sync_seats_and_capacity
        ON events;

        DROP FUNCTION IF EXISTS 
        sync_seats_and_capacity_func();
      COMMIT;
        `);
};
