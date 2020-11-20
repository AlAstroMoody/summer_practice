Приложение для поиска заведений общепита.  
Создано на летней практике, логика частично переписана позже.   
Поработать с фильтрами, стилями и правами доступа.

### Getting started:
* `git clone https://github.com/AlAstroMoody/summer_practice.git`

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


### RUN TESTS:
`fab test`

### ATTENTION
* Redis caches places, disable the function as unnecessary

#### Immediate task:
- search for other errors 
