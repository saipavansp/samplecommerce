const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not set');
  }
  
  mongoose.set('strictQuery', true);
  
  // Try different connection options for Atlas SSL issues
  const connectionOptions = [
    {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority',
    },
    {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
      ssl: true,
      sslValidate: true,
      retryWrites: true,
    },
    {
      serverSelectionTimeoutMS: 15000,
      tls: true,
      tlsAllowInvalidCertificates: false,
      retryWrites: true,
    }
  ];
  
  for (let i = 0; i < connectionOptions.length; i++) {
    try {
      await mongoose.connect(uri, connectionOptions[i]);
      // eslint-disable-next-line no-console
      console.log('MongoDB connected');
      return;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Connection attempt ${i + 1} failed:`, error.message);
      if (i === connectionOptions.length - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

module.exports = { connectDB };