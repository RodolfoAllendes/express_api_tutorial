import { spawn } from 'node:child_process';
import * as fs from 'node:fs/promises';

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

	export function users(): Promise<any>{
		const result: Promise<any> = new Promise(async(resolve, reject) => {
			try{
				const msg = await fs.readFile('./data/users.json', 'utf-8');
				resolve(JSON.parse(msg));
			} catch (e: any) {
				const msg = 'Users not found;';
				reject(msg);
			}
		});
		return result;
	}

	// export function addUser(id: number, name: string): Promise<any>{
	// 	return new Promise(async(resolve, reject))
	// }

}