const commandBuilder = require("./commandBuilder");
const helperMethods = require("./helperMethods");
const Executer = require("./Executer");

module.exports = class Helm {
  constructor(config) {
    this.config = config;
    this.executer = new Executer(config.helmCommand, config.output);
  }

  command(commandString, done, isJsonSupported = false) {
    if (options.output && options.output === "json") {
      isJsonSupported = true;
    }

    this.executer.callByCommand(commandString, callbackHandler(done, isJsonSupported), isJsonSupported);
  }

  executeCommandByArguments(options, command, done) {
    let isJsonSupported = false;
    const jsonSupportedCommands = ["list", "install", "upgrade", "history", "status"];
    if ((options.output && options.output === "json") || (command.length > 0 && jsonSupportedCommands.includes(command[0]))) {
      isJsonSupported = true;
    }
    commandBuilder.addParentOptions(options, command);

    this.executer.callByArguments(command, callbackHandler(done, isJsonSupported), isJsonSupported);
  }

  install(options, done) {
    const command = ["install"];
    if (options.releaseName == null) {
      throw new Error("Missing required parameters 'releaseName'");
    }
    command.push(options.releaseName);
    if (options.chartName == null) {
      throw new Error("Missing required parameter 'chartName'");
    }
    command.push(options.chartName);
    if (options.namespace) {
      command.push("--namespace");
      command.push(options.namespace);
    }
    if (options.version) {
      command.push("--version");
      command.push(options.version);
    }
    if (options.values) {
      command.push("--set");
      command.push(helperMethods.flattenValuesToString(options.values));
    }

    this.executeCommandByArguments(options, command, done);
  }

  upgrade(options, done) {
    const command = ["upgrade"];
    if (options.releaseName == null) {
      throw new Error("Missing required parameters 'releaseName'");
    }
    command.push(options.releaseName);
    if (options.chartName == null) {
      throw new Error ("Missing parameter 'chartName'");
    }
    command.push(options.chartName);
    if (options.namespace) {
      command.push("--namespace");
      command.push(options.namespace);
    }
    if (options.version) {
      command.push("--version");
      command.push(options.version);
    }
    if (options.install) {
      command.push("--install");
    }
    if (options.values) {
      command.push("--set");
      command.push(helperMethods.flattenValuesToString(options.values));
    }
    if (options.reuseValues) {
      command.push("--reuse-values");
    }
    if (options.resetValues) {
      command.push("--reset-values");
    }

    this.executeCommandByArguments(options, command, done);
  }

  uninstall(options, done) {
    const command = ["uninstall"];
    if (options.releaseName == null) {
      throw new Error("Missing parameter 'releaseName'");
    }
    command.push(options.releaseName);
    if (options.namespace) {
      command.push("--namespace");
      command.push(options.namespace);
    }

    this.executeCommandByArguments(options, command, done);
  }

  list(options, done) {
    const command = ["list"];
    if (options.namespace) {
      command.push("--namespace");
      command.push(options.namespace);
    } else if (options.allNamespaces) {
      command.push("--all-namespaces");
    }
    if (options.max) {
      command.push("--max");
      command.push(options.max);
    }
    if (options.offset) {
      command.push("--offset");
      command.push(options.offset);
    }

    this.executeCommandByArguments(options, command, done);
  }

  get(options, done) {
    const command = ["get"];
    if (options.subCommand == null) {
      throw new Error("Missing parameter 'subcommand'");
    }
    command.push(options.subCommand);
    if (options.releaseName == null) {
      throw new Error("Missing parameter 'releaseName'");
    }
    command.push(options.releaseName);
    if (options.namespace) {
      command.push("--namespace");
      command.push(options.namespace);
    }

    this.executeCommandByArguments(options, command, done);
  }

  history(options, done) {
    const command = ["history"];
    if (options.releaseName == null) {
      throw new Error("Missing parameter 'releaseName'");
    }
    command.push(options.releaseName);
    if (options.namespace) {
      command.push("--namespace");
      command.push(options.namespace);
    }

    this.executeCommandByArguments(options, command, done);
  }

  test(options, done) {
    const command = ["test"];
    if (options.releaseName == null) {
      throw new Error("Missing parameter 'releaseName'");
    }
    command.push(options.releaseName);
    if (options.namespace) {
      command.push("--namespace");
      command.push(options.namespace);
    }

    this.executeCommandByArguments(options, command, done);
  }

  status(options, done) {
    const command = ["status"];
    if (options.releaseName == null) {
      throw new Error("Missing parameter 'releaseName'");
    }
    command.push(options.releaseName);
    if (options.namespace) {
      command.push("--namespace");
      command.push(options.namespace);
    }

    this.executeCommandByArguments(options, command, done);
  }

  rollback(options, done) {
    const command = ["rollback"];
    if (options.releaseName == null) {
      throw new Error("Missing parameter 'releaseName'");
    }
    command.push(options.releaseName);
    if (options.revision == null || typeof options.revision != "number") {
      throw new Error("Missing parameter 'revision'");
    }
    command.push(options.revision);
    if (options.namespace) {
      command.push("--namespace");
      command.push(options.namespace);
    }

    this.executeCommandByArguments(options, command, done);
  }
};

function callbackHandler(done, isJsonSupportedCommand) {
  return function(err, data) {
    if (err) {
      done(err, data);
    } else {
      done(null, isJsonSupportedCommand ? helperMethods.parseJson(data) : helperMethods.parseResponseToJson(data));
    }
  };
}
