import App from './App.svelte';
Sentry.init({ dsn: 'https://068e8d136e5248588bd8a8dac6a43e38@o69738.ingest.sentry.io/5348475' });

const app = new App({
	target: document.getElementById('app'),
	props: {}
});

export default app;