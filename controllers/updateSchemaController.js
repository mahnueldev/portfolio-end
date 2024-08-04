const User = require('../models/User');
const Profile = require('../models/Profile');
const Devproject = require('../models/Devproject');
const Desproject = require('../models/Desproject');
const Cert = require('../models/Cert');

const updateSchema = async (req, res) => {
  try {
  
    const users = await User.find();

    for (const user of users) {
      // Example: Fetch related documents and update fields
      const profile = await Profile.findOne({ userId: user._id });
      const devproject = await Devproject.findOne({ userId: user._id });
      const desproject = await Desproject.findOne({ userId: user._id });
      const cert = await Cert.findOne({ userId: user._id });

      const updateFields = {
        profileId: profile ? profile._id : null,
        devprojectId: devproject ? devproject._id : null,
        desprojectId: desproject ? desproject._id : null,
        certId: cert ? cert._id : null
      };

      // Apply the updates using $set and save
      await User.updateOne({ _id: user._id }, { $set: updateFields });

      console.log(`Updated user ${user._id}`);
    }

    console.log('Migration complete.');
    mongoose.connection.close(); // Close the connection after migration
  } catch (error) {
    console.error('Migration error:', error);
    mongoose.connection.close(); // Close the connection on error
  }
};


module.exports = { updateSchema };
