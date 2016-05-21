# Frontend Tools Template
Miscellaneous front end tools that can run without a server. Uses [Github Pages](https://pages.github.com/) to deploy static content.

## Supported Compilation
This repository contains the following gulp tasks:

1. `clean`: Cleans the `dist` folder.
1. `coffee`: Compiles `*.coffee` files.
1. `sass`: Compiles `*.scss` and `*.sass` files.
1. `jade`: Compiles `*.jade` files.
1. `copy`: Copies everything expect supported extensions.
1. `watch`: Watches all the files and runs the supported task.
1. `build`: Executes `clean`, `coffee`, `scss`, `jade`, `copy` tasks.
1. `deploy`: Runs the `build` task and then deploys the `dist` folder (commit and push to `gh-pages` branch`).
1. `run`: Serves the `dist` folder in the port `3000`.

## How to publish a tool
Following the listed steps to push and deploy a front-end tool.

1. Create a folder inside `src`.
1. Add the content of your tool. All the content is going to be compiled with the same structure.
1. Test your application by running the following tasks:
  1. First run the `gulp build` from the command-line.
  1. Then run `gulp run` to serve the `dist` folder in the port `3000`.
  1. Access your tool using the folder name as a route. For example: `./src/my-tool` becomes `localhost:3000/my-tool`
1. Commit and push to your branch or to the `master` branch.
1. Deploy your tool using `gulp deploy` from the command-line.
1. Your tool should be available in `http://username.github.io/repo-name/my-tool`

## How to add more gulp tasks
If you want to extend the tasks to support more extensions (HAML, for example), in the `gulpfile.js` file make sure to:

1. Add your task in the `build` task sequence.
1. Add the new supported extension - if any - to the supported extensions list.
1. Test it out to make sure it works as expected.

## Contributing
To contribute follow the "fork-and-pull" Git workflow.

 1. **Fork** the repo on GitHub.
 2. **Clone** the project to your own machine.
 3. **Commit** changes to your own branch.
 4. **Push** your work back up to your fork.
 5. Submit a **Pull request** so that we can review your changes.

NOTE: Be sure to merge the latest from "upstream" before making a pull request!
