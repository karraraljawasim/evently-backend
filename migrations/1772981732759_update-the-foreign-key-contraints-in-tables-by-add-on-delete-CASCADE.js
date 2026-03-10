export const up = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE events
        DROP CONSTRAINT IF EXISTS FK_usersEnvets;
        ALTER TABLE events
        ADD CONSTRAINT FK_usersEnvets
        FOREIGN KEY (organizer_id) REFERENCES users(user_id)
        ON DELETE CASCADE;
        
        ALTER TABLE registrations
        DROP CONSTRAINT IF EXISTS FK_usersRegistrations;
        ALTER TABLE registrations
        ADD CONSTRAINT FK_usersRegistrations
        FOREIGN KEY (attendee_id) REFERENCES users(user_id)
        ON DELETE CASCADE;

        ALTER TABLE registrations
        DROP CONSTRAINT IF EXISTS FK_eventsRegistrations;
        ALTER TABLE registrations
        ADD CONSTRAINT FK_eventsRegistrations
        FOREIGN KEY (event_id) REFERENCES events(event_id)
        ON DELETE CASCADE;
      COMMIT;
        `);
};

export const down = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE events
        DROP CONSTRAINT IF EXISTS FK_usersEnvets;
        ALTER TABLE events
        ADD CONSTRAINT FK_usersEnvets
        FOREIGN KEY (organizer_id) REFERENCES users(user_id);
        ALTER TABLE registrations

        DROP CONSTRAINT IF EXISTS FK_usersRegistrations;
        ALTER TABLE registrations
        ADD CONSTRAINT  FK_usersRegistrations
        FOREIGN KEY (attendee_id) REFERENCES users(user_id);

        ALTER TABLE registrations
        DROP CONSTRAINT IF EXISTS FK_eventsRegistrations;
        ALTER TABLE registrations
        ADD CONSTRAINT FK_eventsRegistrations
        FOREIGN KEY (event_id) REFERENCES events(event_id);
      COMMIT;
        `);
};
