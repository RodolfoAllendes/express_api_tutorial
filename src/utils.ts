import { spawn } from 'node:child_process';

export namespace utils{

	export function ls(): Promise<any>{
		return new Promise(async(resolve, reject) => {
			let msg = '';
			const process = spawn('ls',
				['-lh'],
				{
					timeout: 1000
				});
			process.stdout.on('data', (data) => {
				console.log(`stdout: ${data}`);
				msg += `${data}`;
			});
			
			process.stderr.on('data', (data) => {
				console.error(`stderr: ${data}`);
				reject(data);
			});
			
			process.on('close', (code) => {
				console.log(`child process exited with code ${code}`);
				resolve(msg);
			});

		});
	}

}