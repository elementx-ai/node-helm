# nodejs-helm
`nodejs-helm` was created for javascript developers who work with [helm.sh package manager for Kubernetes](https://helm.sh/).
The package is a wrapper that integrates with the helm.sh process.

## Installation
```
npm install nodejs-helm
```

## Get Started
Setup your helm.sh file location - for linux or windows
```
let helmBinary = '/usr/local/bin/helm';

if (process.platform === "win32") {
    helmBinary = 'helm';
}
```

require Helm class
```
let Promise = require("bluebird");
const Helm = require("nodejs-helm").Helm;
let helm = Promise.promisifyAll(new Helm({helmCommand: helmBinary}));
```

## API

### List releases
https://helm.sh/docs/helm/helm_list/
```
let options = {
    namespace: 'default',
    max: 10,
    offset: 20
}; // all parameters are optional
let releases = await helm.listAsync(options);
```

### Get a release
https://helm.sh/docs/helm/helm_get/
```
let options = {
    releaseName: 'myReleaseName',
    subCommand: 'all'
}
let history = await helm.getAsync(options);
```
Available Sub-Commands:
```
all         download all information for a named release
hooks       download all hooks for a named release
manifest    download the manifest for a named release
notes       download the notes for a named release
values      download the values file for a named release
```

### Install a release
https://helm.sh/docs/helm/helm_install/
```
let options = {
    chartName: "sourceChartName",
    releaseName: "myReleaseName",
    namespace: "dev", // optional
    version: "latest", // optional
    values: {
        "organisation":"Sugar Labs"
    } // custom values - optional
};
return installation = await helm.installAsync(options);
```

### Upgrade a release
https://helm.sh/docs/helm/helm_upgrade/
```
return await helm.upgradeAsync({
    reuseValues: shouldReuseValues, // boolean value (when upgrading, reuse the last release's values) - optional
    resetValues: shouldResetValues, // boolean value (when upgrading, reset the values to the ones built into the chart) - optional
    version: "latest", // optional
    install: shouldInstall, // boolean value (if a release by this name doesn't already exist, run an install) -- optional
    chartName: "./chartFolder",
    releaseName: myReleaseName,
    values: {
        "organisation":"Sugar Labs"
    }
});
```

### Uninstall a release
https://helm.sh/docs/helm/helm_uninstall/
```
var options = {
    releaseName: 'myReleaseName'
}
return await helm.deleteAsync(options);
```

### Get release history
https://helm.sh/docs/helm/helm_history/
```
let options = {
    releaseName = 'myReleaseName';
}
let history = await helm.historyAsync(options);
```

### Test a release
https://helm.sh/docs/helm/helm_test/
```
let options = {
    releaseName = 'myReleaseName'
}
let test = await helm.testAsync(options);
```

### Rollback a release to a previous revision
https://helm.sh/docs/helm/helm_rollback/
```
let options = {
    releaseName = 'myReleaseName',
    revision: 0 // number
};
let rollback = await helm.rollbackAsync(options);
```

### Get a release status
https://helm.sh/docs/helm/helm_status/
```
let options = {
    releaseName = 'myReleaseName';
}
let status = await helm.statusAsync(options);
```
