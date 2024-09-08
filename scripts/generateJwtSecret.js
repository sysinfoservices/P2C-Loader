const fs = require('fs');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();


const jwtSecret = crypto.randomBytes(64).toString('hex');
const envFile = './.env';
const envConfig = fs.readFileSync(envFile, 'utf-8');


// If JWT_SECRET exist, update; otherwise create
let updatedEnvConfig;
if (envConfig.includes('JWT_SECRET')) {
    updatedEnvConfig = envConfig.replace(/JWT_SECRET=.*/g, `JWT_SECRET=${jwtSecret}`);
} else {
    updatedEnvConfig = envConfig + `\nJWT_SECRET=${jwtSecret}\n`;
}

fs.writeFileSync(envFile, updatedEnvConfig, 'utf-8');

console.log('JWT secret updated.');
