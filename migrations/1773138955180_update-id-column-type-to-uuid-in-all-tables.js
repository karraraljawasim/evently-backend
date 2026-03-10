export const up = (pgm) => {
  pgm.sql(`
BEGIN;

    TRUNCATE TABLE registrations, events, users CASCADE;

    ALTER TABLE events DROP CONSTRAINT IF EXISTS FK_usersEnvets;
    ALTER TABLE registrations DROP CONSTRAINT IF EXISTS FK_usersRegistrations;
    ALTER TABLE registrations DROP CONSTRAINT IF EXISTS FK_eventsRegistrations;

    ALTER TABLE users ALTER COLUMN user_id DROP IDENTITY IF EXISTS; 
    ALTER TABLE users ALTER COLUMN user_id DROP DEFAULT;             
    ALTER TABLE users ALTER COLUMN user_id TYPE UUID USING NULL; 

    ALTER TABLE events ALTER COLUMN event_id DROP IDENTITY IF EXISTS;
    ALTER TABLE events ALTER COLUMN event_id DROP DEFAULT;
    ALTER TABLE events ALTER COLUMN event_id TYPE UUID USING NULL;
    ALTER TABLE events ALTER COLUMN organizer_id TYPE UUID USING NULL;

    ALTER TABLE registrations ALTER COLUMN registration_id DROP IDENTITY IF EXISTS;
    ALTER TABLE registrations ALTER COLUMN registration_id DROP DEFAULT;
    ALTER TABLE registrations ALTER COLUMN registration_id TYPE UUID USING NULL;
    ALTER TABLE registrations ALTER COLUMN attendee_id TYPE UUID USING NULL;
    ALTER TABLE registrations ALTER COLUMN event_id TYPE UUID USING NULL;

    ALTER TABLE events
    ADD CONSTRAINT FK_usersEnvets
    FOREIGN KEY (organizer_id) REFERENCES users(user_id)
    ON DELETE CASCADE;

    ALTER TABLE registrations
    ADD CONSTRAINT FK_usersRegistrations
    FOREIGN KEY (attendee_id) REFERENCES users(user_id)
    ON DELETE CASCADE;

    ALTER TABLE registrations
    ADD CONSTRAINT FK_eventsRegistrations
    FOREIGN KEY (event_id) REFERENCES events(event_id)
    ON DELETE CASCADE;

COMMIT;`);
};

export const down = (pgm) => {
  pgm.sql(`
BEGIN;

    TRUNCATE TABLE registrations, events, users CASCADE;

    ALTER TABLE events DROP CONSTRAINT IF EXISTS FK_usersEnvets;
    ALTER TABLE registrations DROP CONSTRAINT IF EXISTS FK_usersRegistrations;
    ALTER TABLE registrations DROP CONSTRAINT IF EXISTS FK_eventsRegistrations;

    ALTER TABLE users ALTER COLUMN user_id TYPE INTEGER USING NULL; 
    ALTER TABLE users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY; 

    ALTER TABLE events ALTER COLUMN event_id TYPE INTEGER USING NULL;
    ALTER TABLE events ALTER COLUMN event_id ADD GENERATED ALWAYS AS IDENTITY;
    ALTER TABLE events ALTER COLUMN organizer_id TYPE INTEGER USING NULL;

    ALTER TABLE registrations ALTER COLUMN registration_id TYPE INTEGER USING NULL;
    ALTER TABLE registrations ALTER COLUMN registration_id ADD GENERATED ALWAYS AS IDENTITY;
    ALTER TABLE registrations ALTER COLUMN attendee_id TYPE INTEGER USING NULL;
    ALTER TABLE registrations ALTER COLUMN event_id TYPE INTEGER USING NULL;

    ALTER TABLE events
    ADD CONSTRAINT FK_usersEnvets
    FOREIGN KEY (organizer_id) REFERENCES users(user_id)
    ON DELETE CASCADE;

    ALTER TABLE registrations
    ADD CONSTRAINT FK_usersRegistrations
    FOREIGN KEY (attendee_id) REFERENCES users(user_id)
    ON DELETE CASCADE;

    ALTER TABLE registrations
    ADD CONSTRAINT FK_eventsRegistrations
    FOREIGN KEY (event_id) REFERENCES events(event_id)
    ON DELETE CASCADE;

COMMIT;
  `);
};
