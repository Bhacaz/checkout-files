# checkout-files
Github Action to checkout only certain files. Useful if only need certain file, config, assets for your workflow, instead of pulling all the repo.

## Inputs

**files**

A list of files with the path relative to the `$GITHUB_WORKSPACE`.

```
- use: Bhacaz/checkout-files
  with:
    files: Gemfile Gemfile.lock .ruby-version config/database.yml
```

