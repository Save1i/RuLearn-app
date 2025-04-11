const sequelize = require('./db'); 
sequelize.authenticate()
    .then(() => console.log('✅ Успешно подключено к Neon!'))
    .catch(err => console.error('❌ Ошибка подключения:', err));
