const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://rajatpant215:JyExOHBWvPelLqgP@cluster0.nvyxldw.mongodb.net/GroceryProjectmern?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("connected");
      const fetched_data = mongoose.connection.db.collection("GroceryItem");

      fetched_data.find({}).toArray(function (err, data) {
        const GroceryCategory =
          mongoose.connection.db.collection("GroceryCategory");
        GroceryCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.GroceryItem = data;
            global.GroceryCategory = catData;
            console.log(global.GroceryCategory);
          }
        });
      });
    }
  });
};

module.exports = mongoDB;
