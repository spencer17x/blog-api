import Koa from 'koa';
import mongoose from 'mongoose';
import KoaBody from 'koa-body';
import parameter from 'koa-parameter';
import error from 'koa-json-error';
import registerRouters from './routers';
import { connectionStr, PORT } from './config';

const app = new Koa();
const db = mongoose.connection;

console.log('env: ', process.env.NODE_ENV);

parameter(app);
app.use(KoaBody()).use(error({
	postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
	console.log('mongodb is connected!');
});

mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

registerRouters(app);

app.listen(PORT, () => {
	console.log(`Server running at http://127.0.0.1:${PORT}`);
});
