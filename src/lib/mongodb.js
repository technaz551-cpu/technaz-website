// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error("Please add MONGODB_URI to .env.local");
// }

// const options = {
//   serverSelectionTimeoutMS: 10000,
// };

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }

//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;

//MONGODB_URI=mongodb://technaz_website_company:NBRTa0hv9YGyJgrX@ac-jnd86n9-shard-00-00.k9dnn7p.mongodb.net:27017,ac-jnd86n9-shard-00-01.k9dnn7p.mongodb.net:27017,ac-jnd86n9-shard-00-02.k9dnn7p.mongodb.net:27017/technaz?ssl=true&replicaSet=atlas-eeusuc-shard-0&authSource=admin&appName=technaz-website