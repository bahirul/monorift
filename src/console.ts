import { program } from 'commander';
import { helloWorld } from './app/modules/default/cli/hello';

program.name('console.ts').description('Console Command').version('1.0.0');

// register the command. use format: <module>/<command>
program
    .command('default/hello-world')
    .description('Prints "hello world" from default module')
    .action(helloWorld);

program.parse(process.argv);
