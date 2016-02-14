# Contributing to Boostr

First of all, thank you for wanting to contribute! :beers:

Please take a moment to review this document in order to make the contribution 
process easy and effective for everyone involved.


## Using the issue tracker

The [issue tracker](https://github.com/mattsimonis/boostr/issues) is the preferred
channel for [bug reports](#bug-reports), [features requests](#feature-requests),
and [submitting pull requests](#pull-requests). Please keep discussions on topic
and respect the opinions of others.


## Issues and labels

There are several labels setup to help organize issues as best as possible. Here is how each label should be used.

- `accessibility` - Issues that relate to an accessiblity bug or improvement.
- `bug` - Issues that are reported that are a bug with the code.
- `confirmed` - Issues that have been confirmed as a bug in Boostr.
- `docs` - Issues for improving or updating documentation.
- `feature` - Issues asking for a new feature to be added, or an existing one to be extended or modified.
- `question` - Issues that are a general question about functionality or usage.

For a complete list of labels, see the [project labels page](https://github.com/mattsimonis/boostr/labels).


## Bug reports

A bug is a _reproducable problem_ that is caused by code in this extension.
Submitting a good bug report is extremely helpful, so thanks in advance!

When submitting a bug, make sure to use the GitHub issue search to make sure
your bug hasn't already been reported.

A good bug report shouldn't require others having to contact you for more
information. Please try to be as detailed as possible in your report.
What steps will reproduce the issue? What would you expect to be the outcome?
All of these details will help people to fix any potential bugs.


## Feature requests

Feature requests are always welcome! Before you open a feauture request, please
make sure that your idea fits within the scope of this project. Since you are
the one submitting the feature request, it is your job to provide as much detail
as possible and the benefits the feature provides.


## Pull requests

Good pull requests (patches, improvements, new features) are a massive help.
They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code), otherwise you risk spending a lot of
time working on something that might not get merged into the project.

Adhering to the following process is the best way to get your work
included in the project:

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/boostr.git
   # Navigate to the newly cloned directory
   cd boostr
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/mattsimonis/boostr.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).
   Use Git's [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `master` branch.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to
license your work under the terms of the [MIT License](LICENSE).


## Code guidelines

### JS

- 2 spaces (no tabs)
- "Attractive"


## License

By contributing your code, you agree to license your contribution under the [MIT License](LICENSE).
