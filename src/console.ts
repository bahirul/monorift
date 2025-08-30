import { program } from 'commander';
import { helloWorld } from './app/modules/main/cli/hello.cli';

/**
 * Console command for the application.
 */
program.name('console.ts').description('Console Command').version('1.0.0');

/**
 * Register the command. Use format: <module>/<command>
 */
program
    .command('main/hello-world')
    .description('Prints "hello world" from main module')
    .action(helloWorld);

/**
 * Parse the command line arguments.
 */
program.parse(process.argv);
