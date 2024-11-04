const express= require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/db');
const cors = require("cors");
const blogRoutes = require('./routes/blogsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/blogs',blogRoutes);
app.use('/api/comments',commentRoutes);
sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  }).catch((error) => console.log('Error syncing database:', error));
