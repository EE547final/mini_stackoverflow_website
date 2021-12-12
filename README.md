# BufferOverflow: Mini StackOverflow Website


## Local development setup 

**Step 1: Install dependencies**

First, install NodeJS, npm and MongoDB on your OS. Then:

In the Server side:

```
cd server
npm install
npm run dev
```

In the Client side:

```
cd client 
npm install 
npm run serve
```

Build for development and run hot-reload website:

```
npm run serve
```

The default server connected in this setting is hosted at http://192.168.0.100:8081/. It might be slow when you open it sicne it will need a few seconds to relaod and restart. 


<!-- Build for development and run hot-reload website:

```
yarn run serve
``` -->

<!-- The default server connected in this setting is hosted at https://chafan-test.herokuapp.com with free dyno.
Thus, **it might be slow when you open it since the dyno will be suspended when unused for a long time and will
take a minute to restart**.
 -->
![image1](images/image1.png)



## Debugging

https://github.com/Microsoft/vscode-recipes/tree/master/vuejs-cli

## Dependency management

Render dependency tree:

```
npm ls <package-name>
```

Upgrade general dependency:

```
npm upgrade <package-name>
```


