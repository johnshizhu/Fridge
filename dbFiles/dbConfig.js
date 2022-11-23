const config = {
    user: 'fridgedev',
    password: 'foo',
    server: 'DESKTOP-OP2NLNF',
    database: 'fridge',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        eneableArithAbort: true,
        instancename: 'SQLEXPRESS',
    },
    port: 1433
}

module.exports = config;