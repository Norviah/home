## [v1.2.0](https://github.com/Norviah/home/compare/v1.1.0...v1.2.0) (2024-11-04)

### Features

- **config**: show category titles by default <code>[fe16b24](https://github.com/Norviah/home/commit/fe16b24de5e8919fc300c82e78844f2c2da7876a)</code>

## [v1.1.0](https://github.com/Norviah/home/compare/v1.0.0...v1.1.0) (2024-11-04)

### Features

- add a method to force search a query using the search engine <code>[2ac8013](https://github.com/Norviah/home/commit/2ac80132178a04a8cd4bbde982c69f2f779f4f46)</code>

- **settings**: add settings for enabling and limiting suggestions <code>[9dc0177](https://github.com/Norviah/home/commit/9dc01779e39de8e85ea7dfb9c0d1faec0c235b1f)</code>

- **utils**: add a function to pick specific keys from an object <code>[857c1f3](https://github.com/Norviah/home/commit/857c1f316569373382c452f052cc4044bf1d33d8)</code>

- **search**: render suggestions as links <code>[40b7f78](https://github.com/Norviah/home/commit/40b7f786ccace71fdb258ef854f20b7d46b7cf43)</code>

- **search**: add suggestions using duckduckgo's api <code>[56a5248](https://github.com/Norviah/home/commit/56a5248665c1ef72dfa6a0b1fb99118f2a8a5f50)</code>

- **hooks**: add a hook to debounce values <code>[e3169c2](https://github.com/Norviah/home/commit/e3169c2209b88f8af72c89a9b81e2aa3605b6fbc)</code>

- **schema**: ensure that `Link.query` has `{}` <code>[437ebd5](https://github.com/Norviah/home/commit/437ebd5782a5f8499907b7ce4c9739879f37d369)</code>

- **settings**: add a component to prompt the user before taking a destructive action <code>[d89d73d](https://github.com/Norviah/home/commit/d89d73d6a5e0989bf5ff77a6a02851d3f3fcbaaf)</code>

- **settings**: add sorting for categories <code>[6358d92](https://github.com/Norviah/home/commit/6358d9297460d3ce347328e2b6387f58c9ae79cd)</code>

- **settings**: add sorting functionality for links <code>[52c7a75](https://github.com/Norviah/home/commit/52c7a7504d60abfa07e2bb56850b63c17e30d1a1)</code>

- **store**: add a function to move a link to a specific index <code>[4aa83ac](https://github.com/Norviah/home/commit/4aa83ac8c44d8d82507f895a0db8b9097f4bd7db)</code>

- add a hook to prevent rendering until values are loaded to prevent flashing of wrong data <code>[c5fe2dc](https://github.com/Norviah/home/commit/c5fe2dca5ff0d3d8f4ce69bb7b12d4f5522a8c2c)</code>

- **store**: add a function to reset settings <code>[900e4e5](https://github.com/Norviah/home/commit/900e4e551461219f7965b1742abb1df368d2e64c)</code>

- **store**: add an index variable for categories and links <code>[784da63](https://github.com/Norviah/home/commit/784da63541cd4e3378cfcce9382d210d51914b90)</code>

- add zustand for state management <code>[d29eb56](https://github.com/Norviah/home/commit/d29eb56a6a50b2cfe762f354da9fdb7bdeedeed1)</code>

- add a search input <code>[a034c76](https://github.com/Norviah/home/commit/a034c76563f7a3131a47839950c581f577b38fc1)</code>

- add config management <code>[472b7e0](https://github.com/Norviah/home/commit/472b7e0b3ef08c630677764cc169047d73ca9b0b)</code>

- **components/ui**: add a component to render inline links <code>[6d7bfb3](https://github.com/Norviah/home/commit/6d7bfb38688a93c2ab126babdc505380f3cc94b7)</code>

- **components/ui**: add a component to render inline code <code>[e0d69cd](https://github.com/Norviah/home/commit/e0d69cd1fe79ebb67fa8d918305c23f56b00a2bf)</code>

- **types**: add utils for typings <code>[9efed2a](https://github.com/Norviah/home/commit/9efed2af8ea26b5a72c0f52f2515ab4d457c8b04)</code>

- **routes**: add `/settings` <code>[6bd9edc](https://github.com/Norviah/home/commit/6bd9edc62e598fd937db1d705b72c052bb30abfb)</code>

- **components**: add a component to render an icon link in top-right corner <code>[60d7caa](https://github.com/Norviah/home/commit/60d7caa66ea01107521a86ec89bb0ce985c2209d)</code>

### Bug Fixes

- **utils**: encode query parameter when generating a url for the search engine <code>[3f2a4c2](https://github.com/Norviah/home/commit/3f2a4c20a343b78d1ac759718ef5a4eefd796193)</code>

- **search**: fix logic of picking a suggestion by instead ensuring the state isn't null <code>[b8994d7](https://github.com/Norviah/home/commit/b8994d7f6491a5d39ad3894b52729c60eec2e47a)</code>

### UI

- **settings**: ensure all input/buttons for edit link components are aligned to the start <code>[9edb9b8](https://github.com/Norviah/home/commit/9edb9b8a86ed11175850a802477f6e7a487d2682)</code>

- **settings**: decrease the spacing between categories <code>[283c7b7](https://github.com/Norviah/home/commit/283c7b7f2425afd10fd00191959f7b8b3511902b)</code>

- **settings**: ensure placeholders have proper case <code>[39f0b65](https://github.com/Norviah/home/commit/39f0b65bd43ff54141452ead9b7cab20f0040be9)</code>

- **components**: ensure `LinkIcon` renders above all elements <code>[10b85a1](https://github.com/Norviah/home/commit/10b85a16aaedea9114b15db353f702e4cc7b5c02)</code>

- **components/ui**: set the default foreground color for cards to `foreground-light` <code>[66f4854](https://github.com/Norviah/home/commit/66f4854d162a610f47c69abd2ab87f2fe350dc8c)</code>

- **theme**: darken background color for dark mode <code>[34f171c](https://github.com/Norviah/home/commit/34f171c37ea8dfae321414a3e3d79f5cd0b7e2c0)</code>

- **components**: update ui components <code>[53facc6](https://github.com/Norviah/home/commit/53facc645f378d55a4a412b9f1fcf110e86d63c4)</code>

- **theme**: update all theme colors <code>[9a444bc](https://github.com/Norviah/home/commit/9a444bcd5e2f95b08ffeba3e40711453a1e05a21)</code>

### Refactors

- **settings**: don't reverse the order of categories <code>[36c2dbe](https://github.com/Norviah/home/commit/36c2dbe311f384c6a75f9f644e217aaabcdb00ef)</code>

- **config**: don't add categories when creating a default config <code>[779e9b5](https://github.com/Norviah/home/commit/779e9b5650f9529b3d1b56b69d14047e05d46444)</code>

- **components**: refactor `ThemeSelector` into a select menu <code>[a7a9bcc](https://github.com/Norviah/home/commit/a7a9bcccaf8ffa01a1c12d8ca6c9972b716047be)</code>

### Init

- initial commit <code>[00d2546](https://github.com/Norviah/home/commit/00d2546262073af2a432e6a68b282b359b6b46e2)</code>

## v1.0.0 (2024-10-03)

### Features

- **config**: implement an option to determine if a category's title should be rendered <code>[c730ceb](https://github.com/Norviah/home/commit/c730ceb1c17feb381a9d435bc91dc07be13a8702)</code>

- **input**: use the `keydown` event to listen to all keys <code>[c9b9f20](https://github.com/Norviah/home/commit/c9b9f20923d1e7d6d152b52cd3704841cf8543f5)</code>

- **ui**: add the `Toolip` component from shadcn <code>[c8c7c24](https://github.com/Norviah/home/commit/c8c7c242b33fb258d14efeb429286cda19e15f31)</code>

- implement path and search functionality when inputting a command <code>[22dca78](https://github.com/Norviah/home/commit/22dca78923cccd4caef783219ceead7a4ba57ed7)</code>

- improve state logic <code>[cb63258](https://github.com/Norviah/home/commit/cb632581beccc69b605650b477cd56d992aea210)</code>

- implement a basic search system <code>[3dd94ac](https://github.com/Norviah/home/commit/3dd94ac86260aa7fd527a8b53146056a953862e8)</code>

- **components**: add a component to render links from the config file <code>[6726f32](https://github.com/Norviah/home/commit/6726f32fc9f19eccc710fd4ad2ea5b46eb09c326)</code>

- add config file for the application <code>[8ef5ad6](https://github.com/Norviah/home/commit/8ef5ad62f2b66bea8fa3d985336d4ac213d1af79)</code>

- render the theme selector within the application's top-right corner <code>[5ab953d](https://github.com/Norviah/home/commit/5ab953d91011423f437df7d8c8f5906c9add123d)</code>

### UI

- **theme**: lighten/darken foreground for the respective themes <code>[f328430](https://github.com/Norviah/home/commit/f32843081f74047fb5b2463e7dfadb17b36d8102)</code>

- **components**: change the theme component to a toggle button <code>[1f63899](https://github.com/Norviah/home/commit/1f63899d1b91a4be747ce8ea5dc6a82238c9b3a2)</code>

- **components/Menu**: apply the color transition on the parent anchor element <code>[ab0c2c7](https://github.com/Norviah/home/commit/ab0c2c70879a927f24ad341bde66e3da3f28462f)</code>

### Refactors

- **components/Menu**: refactor grid layout to wrap each category in a single div <code>[52aba92](https://github.com/Norviah/home/commit/52aba92825b3a50fcc7c447ebfc2b3a39beb8b88)</code>

### Build System

- **bump**: ignore the `config` commit type <code>[a153874](https://github.com/Norviah/home/commit/a153874b69ed7004686ce8a0635138ebc514e42b)</code>

### Init

- initial commit <code>[9b2e6a9](https://github.com/Norviah/home/commit/9b2e6a909716127e4da9c9189dda6f29537c611c)</code>