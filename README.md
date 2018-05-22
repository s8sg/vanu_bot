# vanu_bot
a test openfaas alexa skill


### Getting Started

##### Powered by Openfaas
The skill is designed to run on openfaas platform. 
Deploy openfaas by following the [guideline](http://docs.openfaas.com/deployment/docker-swarm/")
Install openfaas cli by following the [guideline](http://docs.openfaas.com/cli/install/)


##### Build and Deploy the stack in openfaas
Build
```bash
$ faas template pull https://github.com/alexellis/node8-express-template
$ faas-cli build -f stack.yml
```
Deploy
```bash
$ faas-cli deploy -f stack.yml
```

