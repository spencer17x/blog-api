import Koa, { Context } from 'koa';
import mongoose from 'mongoose';
import registerRouters from './routers';
import { connectionStr, PORT } from './config';

const app = new Koa();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('mongodb is connected!');
});

mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

registerRouters(app);

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${ PORT }`);
});