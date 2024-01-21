const mongoose = require('mongoose');

// const dbConnectionString = "mongodb+srv://nikhil:Rajbhar54321@cluster0.vzimkc8.mongodb.net/?retryWrites=true&w=majority"
const dbConnectionString = "mongodb+srv://nik:NA7T4JExmRAPuGZ@cluster0.ozcp8.mongodb.net/SellAndBuy?authSource=admin&replicaSet=atlas-l28q1o-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true"
mongoose.connect(dbConnectionString, {
    // useCreateIndex:true,
    // useFindAndModify:false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connection Successful");
}).catch((error) => {
    console.log(error);
    console.log("error");
})