import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const LIBRARY_NAME = 'rehypeRemoveComment';

const commonConfig = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts'],
  },
};

const cjsConfig = {
  ...commonConfig,
  ...{
    name: 'commonjs',
    entry: {
      cjs: './src/index.ts',
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              targets: {
                node: '16.0',
              },
            },
          },
        },
      ],
    },
    output: {
      filename: 'index.cjs',
      library: {
        name: LIBRARY_NAME,
        type: 'commonjs2',
      },
      path: path.resolve(dirname, 'lib'),
    },
    target: ['node16.0'],
  },
};

const esmConfig = {
  ...commonConfig,
  ...{
    name: 'esmodule',
    entry: {
      esm: './src/index.ts',
    },
    experiments: {
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    optimization: {
      usedExports: false,
    },
    output: {
      filename: 'index.mjs',
      library: {
        type: 'module',
      },
      path: path.resolve(dirname, 'lib'),
    },
  },
};

export default [cjsConfig, esmConfig];
