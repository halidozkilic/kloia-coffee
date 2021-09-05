const Coffee = require("./models/Coffee");
const mongoose =require('mongoose');
const fs = require("fs");

mongoose.connect('mongodb+srv://halid:6EpRyyTJdBBJg98M@cluster0.j0t8k.mongodb.net/kloia-task?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log("Success!.MongoDB connected.")
    })
    .catch((error) => {console.error("MongoDb connection failed: " , error)})


const mock = JSON.parse(fs.readFileSync("./mockData/coffees.json" ));

const addMock = async function(){
    try {
        await Coffee.create(mock);
        console.log("Success.Data created.");

    }
    catch(err) {
        console.log(err);
        console.err("failed:"+ err);
    }
    finally {
        process.exit();
    }
}

addMock();
