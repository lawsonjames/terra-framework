<!-- Logo -->
<p align="center">
  <img height="128" width="128" src="https://github.com/cerner/terra-framework/raw/main/terra.png" />
</p>

<!-- Name -->
<h1 align="center">
  Terra Framework
</h1>

[![Cerner OSS](https://badgen.net/badge/Cerner/OSS/blue)](http://engineering.cerner.com/2014/01/cerner-and-open-source/)
[![License](https://badgen.net/github/license/cerner/terra-framework)](https://github.com/cerner/terra-framework/blob/main/LICENSE)
[![Build Status](https://github.com/cerner/terra-framework/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/cerner/terra-framework/actions/workflows/ci-cd.yml)
[![devDependencies status](https://badgen.net/david/dev/cerner/terra-framework)](https://david-dm.org/cerner/terra-framework?type=dev)
[![lerna](https://badgen.net/badge/maintained%20with/lerna/cc00ff)](https://lerna.js.org/)

- [Supported Browsers](#supported-browsers)
- [Packages](#packages)
  - [Versioning](#versioning)
  - [Status](#status)
  - [Deprecated](#deprecated)
- [Supported Browsers](#supported-browsers)
- [Internationalization (I18n)](#internationalization-i18n)
  - [Packages Requiring I18n](#packages-requiring-i18n)
- [Contributing](#contributing)
- [Local Development](#local-development)
- [Local Development using Docker (Dev Containers)](#docker-local-development)
- [LICENSE](#license)

<h2 id="packages">
  Packages
</h2>

<h3 id="versioning">
  Versioning
</h3>

When a component reaches v1.0.0., it is considered to be stable and will follow [SemVer](http://semver.org/) for versioning.
1. MAJOR versions represent breaking changes
2. MINOR versions represent added functionality in a backwards-compatible manner
3. PATCH versions represent backwards-compatible bug fixes

Consult the component CHANGELOGs, related issues, and PRs for more information.

We view the React.js props API of our components as our main public API. We use this to guide us when versioning components.

Prior to components reaching v1.0.0, a component is considered to be in a beta stage.
Components in beta stage may include breaking changes, new features, and bug fixes all within v0.x.x releases.

<h3 id="status">
  Status
</h3>

![Stable](https://badgen.net/badge/status/Stable/green)
![Beta](https://badgen.net/badge/status/Beta/orange)
![Deprecated](https://badgen.net/badge/status/Deprecated/grey)

<!-- AUTO-GENERATED-CONTENT:START (SUBPACKAGELIST) -->
| Terra Package      | Version | Status | Dependencies |
|--------------------|---------|--------|--------------|
| [terra-abstract-modal](https://github.com/cerner/terra-framework/tree/main/packages/terra-abstract-modal) | [![NPM version](https://badgen.net/npm/v/terra-abstract-modal)](https://www.npmjs.org/package/terra-abstract-modal) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-abstract-modal](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-abstract-modal)](https://david-dm.org/cerner/terra-framework?path=packages/terra-abstract-modal) |
| [terra-aggregator](https://github.com/cerner/terra-framework/tree/main/packages/terra-aggregator) | [![NPM version](https://badgen.net/npm/v/terra-aggregator)](https://www.npmjs.org/package/terra-aggregator) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-aggregator](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-aggregator)](https://david-dm.org/cerner/terra-framework?path=packages/terra-aggregator) |
| [terra-application-header-layout](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-header-layout) | [![NPM version](https://badgen.net/npm/v/terra-application-header-layout)](https://www.npmjs.org/package/terra-application-header-layout) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-application-header-layout](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-application-header-layout)](https://david-dm.org/cerner/terra-framework?path=packages/terra-application-header-layout) |
| [terra-application-layout](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-layout) | [![NPM version](https://badgen.net/npm/v/terra-application-layout)](https://www.npmjs.org/package/terra-application-layout) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-application-layout](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-application-layout)](https://david-dm.org/cerner/terra-framework?path=packages/terra-application-layout) |
| [terra-application-links](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-links) | [![NPM version](https://badgen.net/npm/v/terra-application-links)](https://www.npmjs.org/package/terra-application-links) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-application-links](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-application-links)](https://david-dm.org/cerner/terra-framework?path=packages/terra-application-links) |
| [terra-application-menu-layout](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-menu-layout) | [![NPM version](https://badgen.net/npm/v/terra-application-menu-layout)](https://www.npmjs.org/package/terra-application-menu-layout) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-application-menu-layout](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-application-menu-layout)](https://david-dm.org/cerner/terra-framework?path=packages/terra-application-menu-layout) |
| [terra-application-name](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-name) | [![NPM version](https://badgen.net/npm/v/terra-application-name)](https://www.npmjs.org/package/terra-application-name) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-application-name](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-application-name)](https://david-dm.org/cerner/terra-framework?path=packages/terra-application-name) |
| [terra-application-navigation](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-navigation) | [![NPM version](https://badgen.net/npm/v/terra-application-navigation)](https://www.npmjs.org/package/terra-application-navigation) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-application-navigation](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-application-navigation)](https://david-dm.org/cerner/terra-framework?path=packages/terra-application-navigation) |
| [terra-application-utility](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-utility) | [![NPM version](https://badgen.net/npm/v/terra-application-utility)](https://www.npmjs.org/package/terra-application-utility) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-application-utility](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-application-utility)](https://david-dm.org/cerner/terra-framework?path=packages/terra-application-utility) |
| [terra-brand-footer](https://github.com/cerner/terra-framework/tree/main/packages/terra-brand-footer) | [![NPM version](https://badgen.net/npm/v/terra-brand-footer)](https://www.npmjs.org/package/terra-brand-footer) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-brand-footer](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-brand-footer)](https://david-dm.org/cerner/terra-framework?path=packages/terra-brand-footer) |
| [terra-collapsible-menu-view](https://github.com/cerner/terra-framework/tree/main/packages/terra-collapsible-menu-view) | [![NPM version](https://badgen.net/npm/v/terra-collapsible-menu-view)](https://www.npmjs.org/package/terra-collapsible-menu-view) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-collapsible-menu-view](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-collapsible-menu-view)](https://david-dm.org/cerner/terra-framework?path=packages/terra-collapsible-menu-view) |
| [terra-date-picker](https://github.com/cerner/terra-framework/tree/main/packages/terra-date-picker) | [![NPM version](https://badgen.net/npm/v/terra-date-picker)](https://www.npmjs.org/package/terra-date-picker) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-date-picker](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-date-picker)](https://david-dm.org/cerner/terra-framework?path=packages/terra-date-picker) |
| [terra-date-time-picker](https://github.com/cerner/terra-framework/tree/main/packages/terra-date-time-picker) | [![NPM version](https://badgen.net/npm/v/terra-date-time-picker)](https://www.npmjs.org/package/terra-date-time-picker) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-date-time-picker](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-date-time-picker)](https://david-dm.org/cerner/terra-framework?path=packages/terra-date-time-picker) |
| [terra-dialog-modal](https://github.com/cerner/terra-framework/tree/main/packages/terra-dialog-modal) | [![NPM version](https://badgen.net/npm/v/terra-dialog-modal)](https://www.npmjs.org/package/terra-dialog-modal) | ![Deprecated](https://badgen.net/badge/status/Deprecated/grey) | [![terra-dialog-modal](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-dialog-modal)](https://david-dm.org/cerner/terra-framework?path=packages/terra-dialog-modal) |
| [terra-disclosure-manager](https://github.com/cerner/terra-framework/tree/main/packages/terra-disclosure-manager) | [![NPM version](https://badgen.net/npm/v/terra-disclosure-manager)](https://www.npmjs.org/package/terra-disclosure-manager) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-disclosure-manager](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-disclosure-manager)](https://david-dm.org/cerner/terra-framework?path=packages/terra-disclosure-manager) |
| [terra-embedded-content-consumer](https://github.com/cerner/terra-framework/tree/main/packages/terra-embedded-content-consumer) | [![NPM version](https://badgen.net/npm/v/terra-embedded-content-consumer)](https://www.npmjs.org/package/terra-embedded-content-consumer) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-embedded-content-consumer](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-embedded-content-consumer)](https://david-dm.org/cerner/terra-framework?path=packages/terra-embedded-content-consumer) |
| [terra-form-validation](https://github.com/cerner/terra-framework/tree/main/packages/terra-form-validation) | [![NPM version](https://badgen.net/npm/v/terra-form-validation)](https://www.npmjs.org/package/terra-form-validation) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-form-validation](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-form-validation)](https://david-dm.org/cerner/terra-framework?path=packages/terra-form-validation) |
| [terra-hookshot](https://github.com/cerner/terra-framework/tree/main/packages/terra-hookshot) | [![NPM version](https://badgen.net/npm/v/terra-hookshot)](https://www.npmjs.org/package/terra-hookshot) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-hookshot](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-hookshot)](https://david-dm.org/cerner/terra-framework?path=packages/terra-hookshot) |
| [terra-infinite-list](https://github.com/cerner/terra-framework/tree/main/packages/terra-infinite-list) | [![NPM version](https://badgen.net/npm/v/terra-infinite-list)](https://www.npmjs.org/package/terra-infinite-list) | ![Deprecated](https://badgen.net/badge/status/Deprecated/grey) | [![terra-infinite-list](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-infinite-list)](https://david-dm.org/cerner/terra-framework?path=packages/terra-infinite-list) |
| [terra-layout](https://github.com/cerner/terra-framework/tree/main/packages/terra-layout) | [![NPM version](https://badgen.net/npm/v/terra-layout)](https://www.npmjs.org/package/terra-layout) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-layout](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-layout)](https://david-dm.org/cerner/terra-framework?path=packages/terra-layout) |
| [terra-menu](https://github.com/cerner/terra-framework/tree/main/packages/terra-menu) | [![NPM version](https://badgen.net/npm/v/terra-menu)](https://www.npmjs.org/package/terra-menu) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-menu](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-menu)](https://david-dm.org/cerner/terra-framework?path=packages/terra-menu) |
| [terra-modal-manager](https://github.com/cerner/terra-framework/tree/main/packages/terra-modal-manager) | [![NPM version](https://badgen.net/npm/v/terra-modal-manager)](https://www.npmjs.org/package/terra-modal-manager) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-modal-manager](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-modal-manager)](https://david-dm.org/cerner/terra-framework?path=packages/terra-modal-manager) |
| [terra-navigation-layout](https://github.com/cerner/terra-framework/tree/main/packages/terra-navigation-layout) | [![NPM version](https://badgen.net/npm/v/terra-navigation-layout)](https://www.npmjs.org/package/terra-navigation-layout) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-navigation-layout](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-navigation-layout)](https://david-dm.org/cerner/terra-framework?path=packages/terra-navigation-layout) |
| [terra-navigation-prompt](https://github.com/cerner/terra-framework/tree/main/packages/terra-navigation-prompt) | [![NPM version](https://badgen.net/npm/v/terra-navigation-prompt)](https://www.npmjs.org/package/terra-navigation-prompt) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-navigation-prompt](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-navigation-prompt)](https://david-dm.org/cerner/terra-framework?path=packages/terra-navigation-prompt) |
| [terra-navigation-side-menu](https://github.com/cerner/terra-framework/tree/main/packages/terra-navigation-side-menu) | [![NPM version](https://badgen.net/npm/v/terra-navigation-side-menu)](https://www.npmjs.org/package/terra-navigation-side-menu) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-navigation-side-menu](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-navigation-side-menu)](https://david-dm.org/cerner/terra-framework?path=packages/terra-navigation-side-menu) |
| [terra-notification-dialog](https://github.com/cerner/terra-framework/tree/main/packages/terra-notification-dialog) | [![NPM version](https://badgen.net/npm/v/terra-notification-dialog)](https://www.npmjs.org/package/terra-notification-dialog) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-notification-dialog](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-notification-dialog)](https://david-dm.org/cerner/terra-framework?path=packages/terra-notification-dialog) |
| [terra-popup](https://github.com/cerner/terra-framework/tree/main/packages/terra-popup) | [![NPM version](https://badgen.net/npm/v/terra-popup)](https://www.npmjs.org/package/terra-popup) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-popup](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-popup)](https://david-dm.org/cerner/terra-framework?path=packages/terra-popup) |
| [terra-slide-group](https://github.com/cerner/terra-framework/tree/main/packages/terra-slide-group) | [![NPM version](https://badgen.net/npm/v/terra-slide-group)](https://www.npmjs.org/package/terra-slide-group) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-slide-group](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-slide-group)](https://david-dm.org/cerner/terra-framework?path=packages/terra-slide-group) |
| [terra-slide-panel](https://github.com/cerner/terra-framework/tree/main/packages/terra-slide-panel) | [![NPM version](https://badgen.net/npm/v/terra-slide-panel)](https://www.npmjs.org/package/terra-slide-panel) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-slide-panel](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-slide-panel)](https://david-dm.org/cerner/terra-framework?path=packages/terra-slide-panel) |
| [terra-slide-panel-manager](https://github.com/cerner/terra-framework/tree/main/packages/terra-slide-panel-manager) | [![NPM version](https://badgen.net/npm/v/terra-slide-panel-manager)](https://www.npmjs.org/package/terra-slide-panel-manager) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-slide-panel-manager](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-slide-panel-manager)](https://david-dm.org/cerner/terra-framework?path=packages/terra-slide-panel-manager) |
| [terra-tabs](https://github.com/cerner/terra-framework/tree/main/packages/terra-tabs) | [![NPM version](https://badgen.net/npm/v/terra-tabs)](https://www.npmjs.org/package/terra-tabs) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-tabs](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-tabs)](https://david-dm.org/cerner/terra-framework?path=packages/terra-tabs) |
| [terra-theme-provider](https://github.com/cerner/terra-framework/tree/main/packages/terra-theme-provider) | [![NPM version](https://badgen.net/npm/v/terra-theme-provider)](https://www.npmjs.org/package/terra-theme-provider) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-theme-provider](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-theme-provider)](https://david-dm.org/cerner/terra-framework?path=packages/terra-theme-provider) |
| [terra-time-input](https://github.com/cerner/terra-framework/tree/main/packages/terra-time-input) | [![NPM version](https://badgen.net/npm/v/terra-time-input)](https://www.npmjs.org/package/terra-time-input) | ![Stable](https://badgen.net/badge/status/Stable/green) | [![terra-time-input](https://badgen.net/david/dep/cerner/terra-framework/packages/terra-time-input)](https://david-dm.org/cerner/terra-framework?path=packages/terra-time-input) |
<!-- AUTO-GENERATED-CONTENT:END *-->

<h3 id="deprecated">
  Deprecated
</h3>

| Terra Package      | Version | Status |
|--------------------|---------|--------|
| [terra-app-delegate](https://github.com/cerner/terra-framework/tree/main/packages/terra-app-delegate) | [![NPM version](https://badgen.net/npm/v/terra-app-delegate)](https://www.npmjs.org/package/terra-app-delegate) | ![Deprecated](https://badgen.net/badge/status/Deprecated/grey) |

<h2 id="supported-browsers">
  Supported Browsers
</h2>

| Browser                     | Version |
|-----------------------------|---------|
| Chrome & Chrome for Android | Current |
| Edge                        | Current |
| Firefox                     | Current |
| Internet Explorer           | 10 & 11 |
| Safari & Mobile Safari      | Current |

<h2 id="internationalization-i18n">
  Internationalization (I18n)
</h2>

Please review [Terra's Internationalization documentation](https://engineering.cerner.com/terra-ui/#/getting-started/terra-ui/internationalization) for more information. Included are directions on consumption and how internationalization is setup.

<h3 id="packages-requiring-i18n">
  Packages Requiring I18n
</h3>

- [terra-application-header-layout](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-header-layout)
- [terra-application-layout](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-layout)
- [terra-application-links](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-links)
- [terra-application-utility](https://github.com/cerner/terra-framework/tree/main/packages/terra-application-utility)
- [terra-collapsible-menu-view](https://github.com/cerner/terra-framework/tree/main/packages/terra-collapsible-menu-view)
- [terra-date-picker](https://github.com/cerner/terra-framework/tree/main/packages/terra-date-picker)
- [terra-date-time-picker](https://github.com/cerner/terra-framework/tree/main/packages/terra-date-time-picker)
- [terra-menu](https://github.com/cerner/terra-framework/tree/main/packages/terra-menu)
- [terra-notification-dialog](https://github.com/cerner/terra-framework/tree/main/packages/terra-notification-dialog)
- [terra-popup](https://github.com/cerner/terra-framework/tree/main/packages/terra-popup)
- [terra-tabs](https://github.com/cerner/terra-framework/tree/main/packages/terra-tabs)
- [terra-time-input](https://github.com/cerner/terra-framework/tree/main/packages/terra-time-input)

<h2 id="contributing">
  Contributing
</h2>

Please read through our [contributing guidelines](./CONTRIBUTING.md). Included are directions for issue reporting and pull requests.

<h2 id="local-development">
  Local Development
</h2>

1. Install docker https://www.docker.com/ to run browser tests.
2. Install dependencies and run tests.
```sh
npm install
npm run test
```

<h2 id="docker-local-development">
  Local Development using Docker (Dev Containers)
</h2>

1. Install [Rancher](https://rancherdesktop.io/) or [Docker](https://www.docker.com/).
    - [Rancher](https://rancherdesktop.io/) is free and open-source and is highly recommended whereas Docker may require a license for use.
2. Install [Microsoft VS Code](https://code.visualstudio.com/Download).
3. Install the [Dev Container extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
    - Navigate to View -> Extension  -> Search for and install _Dev Containers_ (or "ms-vscode-remote.remote-containers")
    - More information on [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
4. Build the dev container:
    - (Option 1) - Opening local workspace in dev container
      - Clone the repository (or fork) locally and open the project in Visual Studio Code
      - Navigate to View -> Command Palette and run **Dev Containers: Open Workspace in Container**
    - (Option 2) - Recommended for Windows for hot-reloading to work during development and improved performance: Creating the dev container using dev volumes (for more information and guidance, see the [Official Guide](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume))
      - If you have git setup and have global config file _~/.gitconfig_ locally, these settings should automatically be transferred to the dev container
      - Navigate to View -> Command Palette and run **Dev Containers: Clone Repository in Container Volume**
      - Paste the GitHub URL of this repository (or fork)
      - VS Code will now reload the workspace and create/start the dev container and volume
      - Please note: changes made using this option will only update files in the Docker volume. It is recommended to commit changes often in case the volume is deleted or dev container gets removed.
5. You're now running in a dev container.  Use the terminal of the dev container in Visual Studio Code to issue any npm or bash commands.
6. Before running any WDIO tests, make sure to perform the following steps:
    - Open a new terminal (outside the dev container) and navigate to  ".devcontainer/" path in your repository.
    - Execute the command `"docker compose -f docker-compose-wdio.yml up"`. Selenium hub should spin up. Leave this running in the background. If you see errors saying "container name already exists", run `"docker container prune"` command followed by pressing "y" to clear up any unused containers and try running the previous command again.
    - You can now run `npm run test:docker` or `npm run wdio:docker` commands to run WDIO tests from inside the Dev Container.
    - NOTE: Optionally, if you want to run other WDIO commands in the dev container, you can also edit the root package.json file WDIO scripts to include `--disableSeleniumService=true` flag. This will disable the selenium service from spinning up again.
      For example:
       ```sh
       "scripts": {
        "wdio:fusion": "terra wdio --disableSeleniumService=true --themes orion-fusion-theme",
        }
       ```
    - If any of the compose files were to be changed, you must refresh the docker container by deleting the corresponding existing docker images, then running the following command:
      ```sh
        docker compose -f <changed compose file name>.yml up
      ```
7. To terminate a dev container:
    - Use command line or Rancher/Docker Desktop OR
    - Using Visual Studio Code
      -  Select the Remote Explorer icon in the Activity Bar or View -> Command Palette and run **Remote Explorer: Focus on Containers View**
      - Locate the **terra-framework_devcontainer** or currently running dev container under "Dev Containers"
      - Right click and select **Stop Container** and close the workspace
        - You can also select **Rebuild Container** to restart the dev container
8. To reopen a dev container:
    - Existing local workspace (for Option 1)
      - Open the project in Visual Studio Code
      - Ensure the workspace contains the .devcontainer folder
      - Navigate to View -> Command Palette and run **Dev Containers: Open Workspace in Container**
    - Isolated dev container volume (for Option 2)
      - Open Visual Studio Code
      - Use the Remote Explorer icon in the Activity Bar or View -> Command Palette and run **Remote Explorer: Focus on Containers View** to view containers
      - Locate the **terra-framework_devcontainer** under "Dev Containers"
      - Hover over the dev container and click the Folder icon labelled **Open Folder in Container** or by right clicking and selecting **Open Folder in Container**

<h2 id="license">
  LICENSE
</h2>

Copyright 2017 - 2020 Cerner Innovation, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

&nbsp;&nbsp;&nbsp;&nbsp;http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
