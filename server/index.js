const bodyParser = require('body-parser')
const http = require('http')
const express = require('express')
const port = process.env.PORT || 5000
const app = express()
const Server = http.createServer(app)
const Router = express.Router()

const path = require('path')
const fs = require('fs')
const inmuebles = require('../public/data.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(Router)

Server.listen(port, function(){
	  console.log("server is runing on port:" +port)
})   


Router.get('/verTodo', function(req, res){   

	     res.json(inmuebles)
	
})

Router.get('/verCiudades', function(req, res){
        
       let Ciudades = [] 
        inmuebles.forEach(function(inmueble){
        	if(Ciudades.indexOf(inmueble.Ciudad) < 0){
                 Ciudades.push(inmueble.Ciudad)
        	}
        })
        res.json(Ciudades)     
})	



Router.get('/verTipos', function(req, res){
        
        let Tipos = [] 
        inmuebles.forEach(function(inmueble){
        	if(Tipos.indexOf(inmueble.Tipo) < 0){
                 Tipos.push(inmueble.Tipo)
        	}
        })
        res.json(Tipos)     
})

Router.all('*', function(req, res){
	  res.send('recurso no encontrado')
	  res.end
})

