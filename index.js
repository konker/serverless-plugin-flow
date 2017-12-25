'use strict';

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const PREFIX = '[serverless-plugin-flow] ';


class ServerlessPluginFlow {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      flow: {
        usage: 'Run the flow static type checker',
        lifecycleEvents: [
          'check',
        ],
      },
    };

    this.hooks = {
      'before:deploy:initialize': this.flowCheck.bind(this),
      'before:invoke:local:loadEnvVars': this.flowCheck.bind(this),
      'flow:check': this.flowCheck.bind(this),
    };
  }

  flowCheck() {
    const flowPath = path.join(this.serverless.config.servicePath, 'node_modules', 'flow-bin', 'cli.js')

    return new Promise((resolve, reject) => {
      if (!fs.existsSync(flowPath)) {
        reject(PREFIX + 'Error: flow executable not found in serverless project');
      }

      childProcess.exec(flowPath, {}, (err, stdout, stderr) => {
        if (err) {
          this.serverless.cli.consoleLog(PREFIX);
          this.serverless.cli.consoleLog(stdout);
          this.serverless.cli.log(PREFIX + 'Flow Checker Failed');
          reject()
        } else {
          this.serverless.cli.log(PREFIX + stdout.trim());
          resolve();
        }
      })
    })
  }
}

module.exports = ServerlessPluginFlow;
