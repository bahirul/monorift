import { program } from 'commander';
import { helloWorld } from './app/modules/main/cli/hello.js';

program.name('console.ts').description('Console Command').version('1.0.0');

// register the command. use format: <module>/<command>
program
    .command('main/hello-world')
    .description('Prints "hello world" from main module')
    .action(helloWorld);

// Parse the command line arguments
program.parse(process.argv);
