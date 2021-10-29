# checkout-files
Github Action to checkout only certain files or folders. 
Useful if only need certain file, like config or
 assets for your workflow, instead of pulling all the repo.

## Inputs

**files**

A list of files with the path relative to the `$GITHUB_WORKSPACE`.
You can also specify a folder and the action will recessively pull all the files.

```
- use: Bhacaz/checkout-files
  with:
    files: Gemfile Gemfile.lock .ruby-version config
```

**token**

A Github Private Access Token.

```
- use: Bhacaz/checkout-files
  with:
    token: ${{ secrets.token }}
```

**branch**

Checkout the files from a specific branch instead of master.

```
- uses: Bhacaz/checkout-files
  with:
    branch: ${{ input.branch }}
```

