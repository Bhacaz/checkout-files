# checkout-files
GitHub Action to checkout only certain files and/or folders.
Useful if only need certain files, like config or
assets for your workflow, instead of pulling the whole repo.

## Usage

Minimal setup.

```yaml
- name: Checkout files
  uses: Bhacaz/checkout-files@v2
  with:
   files: package.json
```

## Inputs

|Name| Description                                                                                                                                                                    | Required |Default|
|---|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|---|
|`files`| A list of files with the path separated by a space, relative to root of your repository. Can also be a folder and the action will recursively pull all the files.              | `true`  |N/A|
|`token`| A GitHub token.                                                                                                                                                                | `false` |`${{ github.token }}`|
|`branch`| Checkout files from a specific branch. If not specified, it use the default repository branch.<br/> To use the current working branch `${{ github.head_ref \|\| github.ref_name }}`  |`false`|Default branch of the repository.|

## Limitations

* This action doesn't keep the mode bits (or permission) of files. See [#18](https://github.com/Bhacaz/checkout-files/issues/18) for more details.
* Cannot pull files bigger than 1 mb. WIP [#3](https://github.com/Bhacaz/checkout-files/issues/3) & [#9](https://github.com/Bhacaz/checkout-files/issues/9)
