import path from 'node:path';
import { fileURLToPath } from 'node:url';
import CopyPlugin from 'copy-webpack-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const LIBRARY_NAME = 'rehypeRemoveComment';

const commonConfig = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: ['node16.0'],
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
              cacheDirectory: true,
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
            options: {
              cacheDirectory: true,
            },
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

const typesConfig = {
  name: 'types',
  entry: {},
  output: {
    path: path.resolve(dirname, 'lib'),
  },
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(dirname, 'src', 'index.d.ts'),
          to: path.resolve(dirname, 'lib', 'index.d.ts'),
        },
      ],
    }),
  ],
};

export default [cjsConfig, esmConfig, typesConfig];
