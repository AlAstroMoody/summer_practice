## Web-app for finding catering establishments
implemented on Django and Vue

### Getting started:
* `git clone https://github.com/AlAstroMoody/summer_practise.git`

* add file `.env` to base directory,    
add a line with the key to this file:  
`GEOCODER_KEY=YOUR_YANDEX_API_KEY`  
without the key you will not be able to edit the places  
* install fabric:  
`sudo pip install Fabric3`

## Launch
* `docker-compose build`
* `fab dev`

### API
* http://localhost:8000

### CLIENT
* http://localhost:8080

### API for nginx:
* `docker-compose -f docker-compose.prod.yml build` 
* `docker-compose -f docker-compose.prod.yml up` 

replace the baseURL from
 http://127.0.0.1:8000/api/ 
 to http://localhost/api/
 in client/src/api/getInstanceWithBaseUrl.js

### RUN TESTS:
`fab test`

### ATTENTION
* Redis caches places, disable the function as unnecessary

#### Immediate task:
- search for other errors 
