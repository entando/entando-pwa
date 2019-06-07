require('dotenv').config();
const fs = require('fs');

fs.writeFileSync(
  'build/swenv.js',
  `
    const process = {
      env: {
        REACT_APP_DOMAIN: '${process.env.REACT_APP_DOMAIN}'
      }
    }
  `,
);
