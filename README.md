![pedendencies](https://img.shields.io/badge/dependencies-recent-brightgreen) ![license](https://img.shields.io/badge/license-MIT-green) ![node](https://img.shields.io/badge/node-%3E%3D17.0.0-brightgreen)

# Currency exchange

### Introduction

A small application was developed which allows us to convert currencies through an API, in this application we can enter a number corresponding to a base currency and return the result converted into another currency.

### Requirements / Installation

-You must have node installed, run the following commands:
```bash
nvm install 17.0.0
```

- It is required to have npm v8.1.0 (it is installed by default once you have node)
  * check your version using the  following command:
 ```bash
 npm -v
 ```

-If you already have this version of node, but you are not using it, run the following command:
```bash
nvm use -version-you-want-to-use
```

-The repository must be cloned.

-Once it is cloned, a console with origin to the project must be opened to add its packages, execute the following command:
 ```bash
 npm install
 ```

-Once the project is fully prepared, you should go to the next page:
- [Currencyapi register](https://app.currencyapi.com/register)

Create an account and follow the next steps:
* Copy the apikey of your account
* Change the name of the file in the projectchivo ```.env_example``` to ```.env```
* Paste this apikey into the environment variable in the file ```.env ```

-After these steps, the following command must be executed (this will launch the development server on port 3000):
```bash
npm run dev
```

### Troubleshooting

Note that apikey allows a limited number of calls(300).
* Change the apikey in the environment variable, it is located in the .env file

## Author
- [Lewis Martinez](https://github.com/lewismartineza)
