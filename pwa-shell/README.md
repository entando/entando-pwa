This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environmental Variables

The system uses the given vars inside `.env` files to setup `@entando/apimanager`

### REACT_APP_USE_MOCKS

defaults to `true`, to set it to false it is necessary to also set a valid REACT_APP_DOMAIN.

### REACT_APP_DOMAIN

the domain used for api calls.

### REACT_APP_CLIENT_ID

the client id used for oauth2 authentication.

### REACT_APP_CLIENT_SECRET

the client secret used for oauth2 authentication.

## Development Notes

### Using absolute imports

See [CRA docs](https://facebook.github.io/create-react-app/docs/importing-a-component#absolute-imports).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run i18n`

Extracts message ids using [react-intl.macro package](https://github.com/evenchange4/react-intl.macro), then bundles all the extracted messages in one json file for every language using [react-intl-translations-manager](https://github.com/GertjanReynaert/react-intl-translations-manager).

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## i18n

Please pay attention to import `FormattedMessage` and `defineMessages` from `react-intl.macro` and not from `react-intl`, otherwise the `npm run i18n` command won't work.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
