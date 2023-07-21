import { createApp } from './app.js';
import { dataSource } from './api/models/dataSource.js';
import { reviewNotification } from './api/utils/schedule.js';

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    console.log(`Listening to request on 127.0.0.1:${PORT}`);
    await dataSource
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((error) => {
        console.error('Error during Data Source initialization', error);
      });
  });
  app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
  });

  reviewNotification;
};

startServer();
