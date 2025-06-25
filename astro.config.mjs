// @ts-check
import { defineConfig } from 'astro/config';
import vercelServerless from '@astrojs/vercel/serverless';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [icon()],
	site: 'https://supersweet.dev',
	output: 'server',
	adapter: vercelServerless({}),
});
