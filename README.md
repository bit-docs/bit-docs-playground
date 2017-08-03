# bit-docs Playground

Remix this project and add files to the `docs` directory, or edit `playground.md`.

Run `npm install && npm start`.

Then visit your remixed project:

  - Locally at <http://localhost:3000/>
  - Or click "Show [Live]" on Glitch.

As you play with `bit-docs` tags to see how they render, the build will autorun, and the web page will auto-refresh.

## Troubleshooting

### Not seeing changes

After making certain types of changes, it might be necessary to hard-refresh an already-visited page.

If you're not seeing changes after adding a new bit-docs plugin to the `package.json`, try `npm run cache-bust`.

### Page refresh navigates back to site root

If Glitch keeps navigating you away from the live page you are viewing, uncheck __Refresh App on Changes__:

![image](https://user-images.githubusercontent.com/990216/28885818-cc53141c-777c-11e7-942f-83bb4b893ada.png)

### Documentation is generated for `.md` but not `.js`

If creating or editing `.js` files restarts the web server instead of building the documentation, it's because of this issue:

https://support.glitch.com/t/please-stop-killing-node-server-js-process-when-js-file-is-added/1842

To fix this, simply make any kind of edit to `watch.json` by hand through the Glitch editor web interface. For instace, change the `throttle` property from a value of `100` to `200`. This will tell Glitch to properly load the watch config.

## About bit-docs

For more on `bit-docs`, see the [bit-docs organization on GitHub](https://github.com/bit-docs).
