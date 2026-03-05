export const up = (pgm) => {
  pgm.sql(`
        CREATE TYPE users_role_type AS ENUM 
        ('Attendee', 'Organizer');

        ALTER TABLE users 
        ALTER COLUMN role TYPE 
        users_role_type
        USING role::users_role_type;
        `);
};

export const down = (pgm) => {
  pgm.sql(`
        ALTER TABLE users
        ALTER COLUMN role TYPE VARCHAR
        USING role::VARCHAR;

        DROP TYPE users_role_type;
        `);
};
