export const up = (pgm) => {
  pgm.sql(`
        
        BEGIN;
          CREATE INDEX events_organizer_id_idx ON events(organizer_id);
          CREATE INDEX events_date_happens_idx ON events(date_happens);
          CREATE INDEX events_title_idx ON events(title);
          
          CREATE INDEX registrations_attendee_id_idx ON registrations(attendee_id);
          CREATE INDEX registrations_event_id_idx ON registrations(event_id);

          CREATE UNIQUE INDEX unique_users_email_lowercase_idx ON users (LOWER(email));
        COMMIT;
          `);
};

export const down = (pgm) => {
  pgm.sql(`
        
        BEGIN;
          DROP INDEX events_organizer_id_idx;
          DROP INDEX events_date_happens_idx ;
          DROP INDEX events_title_idx ;
          
          DROP INDEX registrations_attendee_id_idx ;
          DROP INDEX registrations_event_id_idx;

          DROP INDEX unique_users_email_lowercase_idx 
        COMMIT;
          `);
};
