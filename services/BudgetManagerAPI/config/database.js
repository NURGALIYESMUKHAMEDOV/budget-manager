module.exports = (mongoose, config)=>{
    const database = mongoose.connection;
    mongoose.Promise = Promise;

    mongoose.connect(config.database, {
        //useMongoClient: true,
        promiseLibrary: global.Promise
    });

    database.on('connected', ()=>{console.log(`Connected to Budget Manager database`)});
    database.on('disconnected', ()=>{console.log(`Disconnected from Budget Mnager database`)});
    database.on('error', error=>{console.log(`Connection to Budget Manager database failed ${error}`)});

    process.on('SIGINT',()=>{
        database.close(()=>{
            console.log('Budget Manager terminated, connection closed');
            process.exit(0);
        });
    });
};