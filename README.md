# checkout-files
Github Action to checkout only certain files or folders. 
Useful if only need certain file, like config or
 assets for your workflow, instead of pulling all the repo.

## Inputs

**files**

A list of files with the path relative to the `$GITHUB_WORKSPACE`.
You can also specify a folder and the action will recessively pull all the files.

```yaml
- name: Check out configuration
  uses: Bhacaz/checkout-files@v1
  with:
    files: Gemfile Gemfile.lock .ruby-version config
    token: ${{ github.token }}
```

**token**

A Github Private Access Token.

```yaml
- uses: Bhacaz/checkout-files@v1
  with:
    token: ${{ secrets.token }}
```

