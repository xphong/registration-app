# registration-app

[![Build Status](https://travis-ci.org/xphong/registration-app.svg?branch=master)](https://travis-ci.org/xphong/registration-app) [![volkswagen status](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)

## Quickstart

### Install Depedencies

#### Back-End

```
mvn clean install
```

#### Front-End

```
cd registration-web
```

```
npm install webpack-dev-server rimraf webpack -g 
```

```
npm install
```


### Back-End Server (:8080)

To run dev server:

```
mvn spring-boot:run
```

### Front-End Web App (:3000)

To run dev server:

```
npm start
```

To run tests:

```
npm test
```

## Dependencies
* node, npm
* webpack, webpack-dev-server
* karma
* protractor
* typings
* typescript

## Technologies Used
* Angular 2
* TypeScript
* Webpack
* Spring Boot
* Spring Data JPA
* H2 Embedded Database
* Junit/Mockito/Hamcrest

## TODO
* Write/Improve tests
* User login to admin pages
