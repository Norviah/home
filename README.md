## home

A simple and functional startup page inspired by
[Tilde](https://github.com/xvvvyz/tilde).

### Usage

- to go to a specific site, type and enter the site's respective key.
  For example, `gh` will send you to GitHub.

- **searching**: to search a site, type a space after the site's respective key
  followed by your query. For example, `yt typescript tutorial` will search for
  "typescript tutorial" on YouTube. (note: the respective site must provide a
  `searchTemplate` property in the config file for this to work.)

- **paths**: to go to a specific path of a site, type a slash after the site's
  respective key followed by the path. For example, `rd/r/startpages` will send
  you to `https://reddit.com/r/startpages`.

- **url redirects**: if the entered text is a valid URL, you will be sent to
  that URL. For example, entering `https://github.com` or `github.com` will
  redirect you to `https://github.com`.

- If the entered query does not match any of the above, it will be instead be
  searched through a search engine.

### Config

The <code>[config](./config.ts)</code> file contains the configuration for the
application, please look at this file if you want to customize the application
for you. For documentation on this type, please look [here](https://github.com/Norviah/home/blob/master/src/types/Config.ts#L36).
