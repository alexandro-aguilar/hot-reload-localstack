import { build, BuildOptions, context, SameShape } from 'esbuild';

async function main() {
	const isWatchMode = process.argv.includes('--watch');
	console.log(`isWatchMode: ${isWatchMode}`);

	const buildOptions: SameShape<BuildOptions, BuildOptions> = {
		entryPoints: ['./src/index.ts'],
		bundle: true,
		platform: 'node' as const,
		target: 'node22',
		outbase: 'src',
		outdir: '.dist/src',
		minify: false,
		sourcemap: isWatchMode,
		logLevel: 'info',
	};

	try {
		if (isWatchMode) {
			const ctx = await context(buildOptions);
			await ctx.watch();
		} else {
			await build(buildOptions);
			console.log('✅ TypeScript build successful');
		}
	} catch (error) {
		console.error('❌ TypeScript build failed:', error);
		process.exit(1);
	}
}

main();