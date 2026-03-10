export const up = (pgm) => {
  pgm.sql(`
      BEGIN;
        CREATE TYPE users_role_type AS ENUM 
        ('Attendee', 'Organizer');

        ALTER TABLE users 
        ALTER COLUMN role TYPE 
        users_role_type
        USING role::users_role_type;
      COMMIT;
        `);
};

export const down = (pgm) => {
  pgm.sql(`
      BEGIN;
        ALTER TABLE users
        ALTER COLUMN role TYPE VARCHAR
        USING role::VARCHAR;

        DROP TYPE users_role_type;
      COMMIT;
        `);
};
