declare module 'koa-parameter' {
	import * as Koa from 'koa';
	const context: (app: Koa, translate?: Function) => Promise<void>;
	export = context;
}
