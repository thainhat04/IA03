import { config as dotenvConfig } from 'dotenv';
dotenvConfig();


const config = {
    database: {
        url: process.env.DATABASE_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
};

export default config;