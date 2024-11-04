const sequelize = require('./util/db');
const Blogs = require('./models/Blogs');
const Comments = require('./models/Comments');
Blogs.hasMany(Comments, { foreignKey: 'blogId' });
Comments.belongsTo(Blogs, { foreignKey: 'blogId' });

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

syncDatabase();