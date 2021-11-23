const mongoose = require('mongoose');
const MenuModel = require('./models/menuitem');

mongoose.connect(process.env.DB_URL)
  .then(() => seed());

async function seed() {
  const menu1 = new MenuModel({
    url: '/very-cool-menu',
    label: 'Very Cool Menu',
    top: true,
    children: [],
  })

  const menu2 = new MenuModel({
    url: '/very-cool-menu/very-cool-submenu',
    label: 'Very Cool Submenu',
    top: false,
    children: [],
  })

  await menu1.save();
  await menu2.save();

  menu1.children.push(menu2._id);

  await menu1.save();

  mongoose.disconnect();
}