const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const jsonFilePath = path.resolve(__dirname, '../your.json');
    const data = fs.readFileSync(jsonFilePath, 'utf-8');
    return {
        statusCode: 200,
        body: data
    };
};
