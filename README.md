# checkout-files
GitHub Action to checkout only certain files and/or folders.
Useful if only need certain files, like config or
assets for your workflow, instead of pulling the whole repo.

## Usage

Minimal setup.

```yaml
- name: Checkout files
  uses: Bhacaz/checkout-files@v1
  with:
   files: package.json
   token: ${{ github.token }}
```

## Inputs

|Name|Description|Required|Default|
|---|---|---|---|
|`files`|A list of files with the path separated by a space, relative to root of your repository. Can also be a folder and the action will recursively pull all the files.|`true`|N/A|
|`token`|A GitHub token. Setting `${{ secrets.GITHUB_TOKEN }}` give acces to the one [automatically generated](https://docs.github.com/en/actions/security-guides/automatic-token-authentication). |`true`|N/A|
|`branch`|Checkout files from a specific branch.|`false`|`master`|
