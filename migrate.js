// migrate.js
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Profile = require('./models/Profile');
const DevProject = require('./models/Devproject');
const DesProject = require('./models/Desproject');
const Cert = require('./models/Cert');

const migrate = async () => {
  try {
    // Ensure database connection
    await connectDB();

    // Define the user ID
    const userId = new mongoose.Types.ObjectId('652cf2a06f11373e190121ea');

    // Define the IDs for the new entries
    const profileId = new mongoose.Types.ObjectId('652cf34a56ccb165876dc465');
    const devprojectId = new mongoose.Types.ObjectId('641034f24a61f23a8ceeb989');
    const desprojectId = new mongoose.Types.ObjectId('6410391b4a61f23a8ceeb99f');
    const certId = new mongoose.Types.ObjectId('6537f8d4f7d3402acc065d86');

    // Update User with the specified IDs
    const result = await User.updateMany(
      {},
      {
        $set: {
          profileId: profileId,
          devprojectId: devprojectId,
          desprojectId: desprojectId,
          certId: certId,
        },
      }
    );

    console.log(`Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`);

    // Update Profile with the userId
    await Profile.updateMany(
      { _id: profileId },
      { $set: { userId: userId } }
    );

    // Update DevProject with the userId
    await DevProject.updateMany(
      { _id: devprojectId },
      { $set: { userId: userId } }
    );

    // Update DesProject with the userId
    await DesProject.updateMany(
      { _id: desprojectId },
      { $set: { userId: userId } }
    );

    // Update Cert with the userId
    await Cert.updateMany(
      { _id: certId },
      { $set: { userId: userId } }
    );

    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
};

// Run the migration
migrate();