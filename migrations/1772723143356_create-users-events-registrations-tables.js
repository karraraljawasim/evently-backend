export const up = (pgm) => {
  pgm.sql(`
        CREATE TABLE IF NOT EXISTS users (
        userId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY ,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        role VARCHAR(40) NOT NULL,
        password TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS events (
        eventId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        location VARCHAR(300) NOT NULL,
        dateHappens DATE NOT NULL,
        maxCapacity INT NOT NULL,
        organizerId INTEGER ,
        CONSTRAINT FK_usersEnvets
        FOREIGN KEY (organizerId) REFERENCES users(userId)
        );
        
        CREATE TABLE IF NOT EXISTS registrations (
        registrationId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        attendeeId INTEGER,
        eventId INTEGER,
        registerAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_usersRegistrations
        FOREIGN KEY (attendeeId) REFERENCES users(userId),
        CONSTRAINT FK_eventsRegistrations
        FOREIGN KEY (eventId) REFERENCES events(eventId)
        )
        `);
};

export const down = (pgm) => {
  `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS registrations;
    `;
};
