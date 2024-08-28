var spawn = require("child_process").spawn;

const constants = require("./constants");

module.exports = class Executer {
  constructor(helmCommand, output) {
    this.output = output ? output : constants.DefaultOutput;
    this.helmCommand = helmCommand ? helmCommand : constants.DefaultHelmCommand;
  }

  callByArguments(args, callback, isJsonOutputSupported = false) {
    if (isJsonOutputSupported) {
      args.push(constants.OutputCommand);
      args.push(this.output);
    }
    this.execute(args, callback);
  }

  callByCommand(command, callback, isJsonOutputSupported = false) {
    const args = command.split(" ");
    if (isJsonOutputSupported) {
      args.push(constants.OutputCommand);
      args.push(this.output);
    }
    this.execute(args, callback);
  }

  execute(args, callback) {
    const helmProcess = spawn(this.helmCommand, args);
    let stdout = "", stderr = "";
    helmProcess.stdout.on("data", (data) => {
      stdout += data;
    });
    helmProcess.stderr.on("data", (data) => {
      stderr += data;
    });
    helmProcess.on("close", () => {
      if (!stderr) {
        stderr = undefined;
      }
      callback(stderr, stdout);
    });
  }
};
