# iBriz Assignment

This assignment includes using two contract function `mint` and `transfer`

## Constants Used

Some constants used in this projects are:

1. [TEST_ADDRESS](./src//constants/address.ts) : The test address for minting the token

> The ADDRESS can be later shifted to .env or can be consumed dynamically. For this assignment, its better to be used as constant.

## Git Process

The CI/CD setup is done through [Vercel](https://vercel.com).

### Steps:

1. First push your code to `dev` branch
2. Create PR in `main` branch
3. Before merging, first check the preview which is created by vercel in respective PR
4. Merge the code to `main` for final deployment

## Project Setup

To run this project in your local machine first clone this repo using

```
git clone https://github.com/prasid444/ibriz-assignment.git
```

Then go to the project root folder and enter `yarn` in the terminal to download <b>node_modules</b>

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

[Wagmi](https://wagmi.sh/)

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
