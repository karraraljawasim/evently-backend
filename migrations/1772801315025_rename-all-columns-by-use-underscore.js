export const up = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE users
        RENAME COLUMN  userId TO  user_id;
        ALTER TABLE users
        RENAME COLUMN  firstName TO first_name  ;
        ALTER TABLE users
        RENAME COLUMN lastName TO last_name  ;

        ALTER TABLE events
        RENAME COLUMN organizerId  TO organizer_id ;
        ALTER TABLE events
        RENAME COLUMN maxCapacity TO  max_capacity; 
        ALTER TABLE events
        RENAME COLUMN  dateHappens TO date_happens ;
        ALTER TABLE events
        RENAME COLUMN  eventId TO event_id ;

        ALTER TABLE registrations
        RENAME COLUMN  registrationId TO registration_id  ;
        ALTER TABLE registrations
        RENAME COLUMN  attendeeId TO attendee_id  ;
        ALTER TABLE registrations
        RENAME COLUMN  registerAt TO register_at  ;
        ALTER TABLE registrations
        RENAME COLUMN  eventId TO event_id  ;
      COMMIT;
        `);
};

export const down = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE users
        RENAME COLUMN  user_id TO  userId;
        ALTER TABLE users
        RENAME COLUMN  first_name TO firstName  ;
        ALTER TABLE users
        RENAME COLUMN last_name TO lastName  ;

        ALTER TABLE events
        RENAME COLUMN organizer_id  TO organizerId ;
        ALTER TABLE events
        RENAME COLUMN max_capacity TO  maxCapacity; 
        ALTER TABLE events
        RENAME COLUMN  date_happens TO dateHappens ;
        ALTER TABLE events
        RENAME COLUMN  event_id TO eventId ;

        ALTER TABLE registrations
        RENAME COLUMN  registration_id TO registrationId  ;
        ALTER TABLE registrations
        RENAME COLUMN  attendee_id TO attendeeId  ;
        ALTER TABLE registrations
        RENAME COLUMN  register_at TO registerAt  ;
        ALTER TABLE registrations
        RENAME COLUMN  event_id TO eventId  ;
      COMMIT;
        `);
};
