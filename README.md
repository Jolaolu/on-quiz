# ca-survey

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Side Note
Due to imcompatibility issues bwtween jest ~28 and previous versions, please run tests with 
```
yarn test:unit  
```
or 
```
yarn jest fileName.spec.ts
```

running  `jest fileName.spec.ts` or `jest` will probably throw a jsdom error, [for more info](https://stackoverflow.com/questions/72099265/cannot-read-property-html-of-undefined-after-jest-update)
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
