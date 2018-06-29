### Create a .env file in the cloned repo
## Should be created before running the client app

+ SU_SEC_3SHA512=hashed secret phrase
+ PROTOCOL=(https:// or http://)
+ SERV_HOST=ddosapi host ip or url (ddps.deic.dk or dev.ddps.deic.dk or localhost)
+ SERV_PORT=port for ddosapi
+ SERV_NAMESPACE=api namepspace (ddosapi)

### build env
## we build using ember-cli-deploy

+ instead of one .env we have .env.deploy.development for development builds
+ instead of one .env we have .env.deploy.production for production builds

The configuration for each go in config/deploy.js

+ The file is in plain text and should be named .env and not checked into git. 
+ .gitignore should include all .files to be excluded from git commits.
