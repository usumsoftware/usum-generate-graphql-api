import axios from 'axios';
import chalk from 'chalk';
import { SgtsConfig } from 'models/shared.models';
import { saveFile } from 'saveFile';

export async function generateUsingConfig({
  output = './__generated.ts',
  customScalars,
  apolloVersion = 3,
  ...config
}: SgtsConfig) {
  const endpoint = 'https://usum-api-caller.vercel.app/graphql';
  const query = `query gen($input: Generate) {
      generate(input: $input)
    }`;
  const headers = {
    'Content-Type': 'application/json',
  };

  const option = {
    query: query,
    variables: {
      input: {
        ...config,
        endpoint: process.env.GRAPHQL_URL || process.env.REACT_APP_GRAPHQL_URL,
      },
    },
  };

  try {
    const response = await axios.post(endpoint, option, {
      headers: headers,
    });

    const {
      data: {
        data: { generate },
      },
    } = response;

    await saveFile(generate, output, false);
  } catch (error) {
    console.error(chalk.red('💔 Generation failed'));
  }
}
