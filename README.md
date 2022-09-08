# Calculator

## Bootstrap
Bootstrap docker images: 
```
docker-compose up
``` 
UI will be avaliable at http://localhost:8080
## Test
Tests avaliable by
```
npm run test
or
yarn test
```
## Docs
- /client - client part Vue.js
    - /src - source folder
- /server - backend part Node.js, Express.js
    - /src - source folder
        - /service - main services
            - /calc - calc module
            - /express - express application module
        - /controllers - controllers to manage user input
            - /calc - calc module controller
        - /routers - routers to manage controllers to different endpoints
