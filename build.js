const fs = require('fs-extra');
fs.copy('./src', './dist')
    .then(() => console.log('success!'))
    .catch(err => console.error(err))