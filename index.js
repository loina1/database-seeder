// seeder.js
const mongoose = require('mongoose');

class DatabaseSeeder {
    constructor(connectionString) {
        this.connectionString = connectionString;
        this.models = {};
    }

    addModel(modelName, schema) {
        const schemaInstance = new mongoose.Schema(schema);
        const model = mongoose.model(modelName, schemaInstance);
        this.models[modelName] = model;
    }

    async connect() {
        await mongoose.connect(this.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    }

    async seed(modelName, data) {
        if (!this.models[modelName]) {
            console.error(`Model ${modelName} does not exist.`);
            return;
        }
        await this.models[modelName].deleteMany(); // Clear existing data
        await this.models[modelName].insertMany(data);
        console.log(`Data seeded for model ${modelName}`);
    }

    async disconnect() {
        await mongoose.disconnect();
        console.log('Database disconnected');
    }
}

module.exports = DatabaseSeeder;