const mongoose = require('mongoose');

/**
 * Updates documents in a collection to match the schema structure
 * @param {mongoose.Model} Model - The Mongoose model of the collection
 * @param {Object} schema - The schema object of the model
 */
const updateDocumentsToSchema = async (Model, schema) => {
    const schemaPaths = schema.paths;

    try {
      console.log(`Updating documents in ${Model.collection.name}`);
  
      // Iterate through all documents
      const documents = await Model.find({});
      console.log(`Found ${documents.length} documents`);
  
      for (let doc of documents) {
        let update = false;
  
        // Check each schema path
        for (let path in schemaPaths) {
          if (!doc[path] && schemaPaths[path].options.default !== undefined) {
            doc[path] = schemaPaths[path].options.default;
            update = true;
          }
        }
  
        // Save the document if it was updated
        if (update) {
          await doc.save();
          console.log(`Document updated: ${doc._id}`);
        }
      }
  
      console.log(`Update complete for ${Model.collection.name}`);
    } catch (error) {
      console.error(`Error updating documents for ${Model.collection.name}:`, error);
      throw error;
    }
  };
module.exports = { updateDocumentsToSchema };
