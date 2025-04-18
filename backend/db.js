const mongoose=require('mongoose');

const MONGO_URI="mongodb+srv://cadheshbenny:Y42wMvf5ukH1KM8h@emisor.2zgfo3k.mongodb.net/?retryWrites=true&w=majority&appName=Emisor"


const connectToMongo = () => {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("MongoDB Connected...."))
        .catch((e) => {
            console.error("MongoDB connection error:", e);
        });
};

module.exports=connectToMongo