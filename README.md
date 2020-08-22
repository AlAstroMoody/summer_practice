## Web-app for finding catering establishments

### Getting started:
* `git clone`

add file `.env` to base directory,    
add a line with the key to this file:  
`GEOCODER_KEY=YOUR_YANDEX_API_KEY`
### API
* http://localhost:8000

### CLIENT
* http://localhost:8080

### for nginx:

* `docker-compose -f docker-compose.prod.yml build` 
* `docker-compose -f docker-compose.prod.yml up` 

* http://localhost

#### Immediate task:
- fix tests for new realities
- fix the creation of new ingredients
- search for other errors 