export const up = (pgm) => {
  pgm.sql(`
    BEGIN;
        ALTER TABLE events
        ALTER COLUMN organizer_id SET NOT NULL;
        ALTER TABLE events
        ALTER COLUMN remaining_seats SET NOT NULL;
      
        ALTER TABLE registrations
        ALTER COLUMN attendee_id SET NOT NULL;
        ALTER TABLE registrations
        ALTER COLUMN event_Id SET NOT NULL;
      COMMIT;
        `);
};
export const down = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE events
        ALTER COLUMN organizer_id DROP NOT NULL;
        ALTER TABLE events
        ALTER COLUMN remaining_seats DROP NOT NULL;
      
        ALTER TABLE registrations
        ALTER COLUMN attendee_id DROP NOT NULL;
        ALTER TABLE registrations
        ALTER COLUMN event_id DROP NOT NULL;
      COMMIT;
        `);
};
