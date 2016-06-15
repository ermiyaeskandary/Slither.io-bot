# Developer documentation
This document summarizes information relevant to **current committers and collaborators**.

## Getting the sources
**Clone the Slither.io-bot repository** to get started:
```shell
git clone https://github.com/ErmiyaEskandary/Slither.io-bot.git
cd Slither.io-bot
```
Then get started!
## The main branches
At the core, our development model is greatly inspired by existing models out there. This repo holds **two main branches**:
* `master`
* `develop`

We consider `origin/master` to be the main branch where all the code existent in that branch reflects a **production-ready, fully tested and fully working** state.

We then consider `origin/develop` to be the main branch where all the code existent in that branch always reflects a state with the **latest delivered development changes for the next release, which may not have been fully tested yet**. This is where all commits get **pushed first**, hence the name `develop`.

When the source code in the `develop` branch reaches a **stable point** and is ready to be **released with it's own version number**, all of the changes will be merged into `master` and then tagged with a release number. This is done on a **weekly basis due to tests** and is only done with the teams approval.

Therefore, each time when changes are merged back into master, this is a new production release by definition. We tend to be **very strict** at this, so that theoretically, we could make a new release every time there is a commit to `master`. All code before being merged back into `master` will be **tagged with a version number and a general message describing the changes**.

## Documentation updates
Documentation contributions are very welcome!

You can contribute documentation by commiting the change, as same as code contribution. Main directory is docs/, and as such, commits should target the docs/ folder **in the develop branch** as to definitely update the documentation in the upcoming release.

## The supporting branches
We also use another type of branch:
* Feature branches
  * **May branch off from: `develop`**
  * **Must merge back into: `develop`**
  * **Branch naming convention: anything except `master` and `develop`, preferably `feature/*`**

Unlike the main branches, these branches always have a **limited life time**, since they will be removed eventually.

By no means are feature branches “special” from a technical perspective - they are just categorized by how we use them. They are of course plain old Git branches.

Feature branches are used to develop **new features** for an upcoming or a distant future release. They exist as long as the new feature is in development but they eventually will be **merged back into `develop` not `master` as it may need testing and to definitely add the new feature to the upcoming release. They also need to be tested before being merged into `develop` for syntax errors, rendering issues and ...**

### Creating a feature branch
When starting work on a new feature, branch off from the `develop` branch.
```shell
git checkout -b feature/mynewfeature develop
```
And then do what you need to do! Commit changes and then push to your feature branch!
```shell
git add .
git commit -m "Commit Message"
```
Then just do a `git log` to make sure of your changes and your commits **before it's too late to change them without harm** - and just because it *looks nice*.
When you're sure, this command will make it have it's own branch on the repository :
```shell
git push --set-upstream origin feature/mynewfeature
```
### Updating your branch code with the `develop` branch
Might come in handy if someone commits new changes before you are done with your feature :
```shell
git checkout feature/mynewfeature
git pull --rebase origin develop
```

### Incorporating a finished feature on `develop`
**Finished and tested features may be merged into the `develop` branch** to potentially add them to the upcoming release:
```shell
git checkout develop
git merge feature/mynewfeature
git branch -d feature/mynewfeature
git push origin develop
```

## Releasing code in a production-ready state
**NOTE: THIS ONLY CAN BE DONE WITH THE _APPROVAL OF THE TEAM_**

Code from the `develop` branch wll be merged into `master` on a weekly basis, **after the efficiency of the current bot in `master` has been compared with the bot in `develop` and we get positive results and with a release tag and message**:

### Testing the bot's efficiency
To test the changes, simply run the bot in `master` alongside the bot in `develop` for a **long time - 30 games is the minimum but more is appreciated**. Scores will be collected in the **`bot.scores` variable, which can then be viewed with the browser's developer console**.

You can **conserve resources** (and therefore run more bots) by **commenting out `original_redraw()` in the `oefTimer` function**. **This prevents the game graphics from rendering, but the bot operates as normal**.

**NOTE : In Chrome, to get full CPU usage, a tab must be in the *foreground*. To run many bots simultaneously, launch *separate Chrome windows* each with one slither.io tab in the foreground.**

Example:

![Screenshot of 12 bots running simultaneously](http://i.imgur.com/9QaS5LD.png)

### Merging code from `develop` into `master`
After a **positive result from tests and a approval for a merge from the team**, you can now set up the merge :
```shell
git checkout master
git merge develop
```

### Creating a new release
After a merge, we then need to finally **create a new release**:
```shell
git checkout develop
git tag -a v1.0.0
```
Your default text editor will then **open and ask you for a release message**.
The release message needs to be a **list** and be a **general overview of the changes**.

Example:

![Release v1.2.8](http://i.imgur.com/GJTitLs.png)
* A new statistic has been added showing the median of the scores, for testing purposes
* The variable eHeadCircle has been changed to enemyHeadCircle to remove and prevent Hungarian notation.

**_You've done it! YAY!_**
