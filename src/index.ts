#!/usr/bin/env node
import { program } from 'commander';
import { generateUsingConfig } from 'genarate';

const runSgtsCLI = () => {
  program
    .version(require('../package.json').version)
    .option('-o, --output <output>', 'Output path of your generated file')
    .option(
      '--codegen-functions',
      'Generate all your graphQL methods fully typed (Inspired by Prisma)'
    )
    .option(
      '--codegen-react-hooks',
      'Generate useMutation and useQuery React hooks typed'
    )
    .option(
      '--codegen-templates',
      'Add gql query strings to the generated output'
    )
    .option(
      '--gen-fragments',
      'Auto-generates fragment and include them in queries'
    )
    .option(
      '-p, --prefix <prefix>',
      'Add prefix to all your types (ex: User becomes IUser with --suffix I)'
    )
    .option(
      '-s, --suffix <suffix>',
      'Add suffix to all your types (ex: User becomes UserModel with --suffix Model)'
    )
    .action((payload) => {
      generateUsingConfig({
        ...payload,
      });
    });

  program.parse(process.argv);
};

runSgtsCLI();
