export const up = (pgm) => {
  pgm.sql(`
      BEGIN;
        CREATE OR REPLACE FUNCTION set_remaining_seats_initial_value()
        RETURNS TRIGGER AS $$
        BEGIN
        IF NEW.remaining_seats IS NULL THEN 
            NEW.remaining_seats:= NEW.max_capacity;
         END If;
        RETURN NEW;
        END;

        $$ LANGUAGE plpgsql;

        CREATE TRIGGER
        trigger_set_remaining_seats_initial_value
        BEFORE INSERT ON events
        FOR EACH ROW
        EXECUTE FUNCTION set_remaining_seats_initial_value();
      COMMIT;
        `);
};

export const down = (pgm) => {
  pgm.sql(`
      BEGIN;
        DROP TRIGGER IF EXISTS trigger_set_remaining_seats_initial_value
        ON events;

        DROP FUNCTION IF EXISTS 
        set_remaining_seats_initial_value();
      COMMIT;
        `);
};
