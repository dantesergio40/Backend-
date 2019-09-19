

//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,       
  prefix: "$"
})

function setSearch(){
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()

///////////////////////////////////////////////////////////////////////////

$(function(){   

$(document).on("ready", inicio());

function inicio(){
   verTodos()
   cargarCiudades()
   cargarTipos()
   filtrar()
}


// Activar-Desactivar busqueda personalizada 
$('#checkPersonalizada').click(()=>{ 

    $('select').material_select()//activar los select  
   
  if($('#checkPersonalizada').is(':checked')){     
    let lista = $('.lista')
    lista.html('')   
  }else{
    let lista = $('.lista')
    lista.html('')  
   }
})


function verTodos(){  
  $('#buscar').click(()=>{
    let lista = $('.lista')
    lista.html('')
    console.log('dentro de verTodos')
if($('#checkPersonalizada').is(':checked')){ 
         console.log('filtro activado')
}else{
         console.log('haciendo peticion de todos los inmuebles')
   $.ajax({
       url: '/verTodo',
       type: 'GET',     
       success: function(inmuebles){       
            inmuebles.forEach(inmueble =>{ 
                renderDatos(inmueble)             
              })      
            }
         })
      }     
   })
}



function filtrar(){
   $("#buscar").click(()=>{
      console.log('dentro del filtro')
      let lista = $('.lista')
      lista.html('')

  if($('#checkPersonalizada').is(':checked')){ 

    $.ajax({
       url: '/verTodo',
       type: 'GET',       
       success: function(inmuebles){  
                      
          let ciudad = $("#ciudad").val();
          let tipo = $("#tipo").val();
          let precio = $("#rangoPrecio").val();
          let filtro = {Ciudad: ciudad, Tipo: tipo, Precio: precio} 
                  
                 console.log(filtro)   

          inmuebles.forEach(inmueble =>{
                  
             let precioReq = filtro.Precio.split(";");                  
             let precioInmueble = inmueble.Precio.replace("$","").replace(",","");
             console.log(Number(precioInmueble))
             console.log( '$min:' +precioReq[0], '$max:' +precioReq[1] )                   
             console.log(filtro.Ciudad, inmueble.Ciudad , filtro.Tipo , inmueble.Tipo)

        if( (filtro.Ciudad === undefined || filtro.Ciudad == "" || filtro.Ciudad == inmueble.Ciudad) && (filtro.Tipo === undefined || filtro.Tipo == "" || filtro.Tipo == inmueble.Tipo) && ( Number(precioInmueble) >= precioReq[0] && Number(precioInmueble) <= precioReq[1]) ) {                  
                                         
                                renderDatos(inmueble)
                                console.log('¡Renderizado!')
                                               
                         }                           
                   }) 
            }
        })          
     }else{
      console.log('no se puede filtrar')
     }
  })
}


      
 

function cargarCiudades(){
    $.ajax({
       url: '/verCiudades',
       type: 'GET',       
       success: function(Ciudades){
        let appendCiudad = $("#ciudad") 
         $.each(Ciudades, (i,ciudad)=>{
          appendCiudad.append(`
           <option value="${ciudad}">${ciudad}</option>
            `)
         })
       }
     })
}

function cargarTipos(){
    $.ajax({
       url: '/verTipos',
       type: 'GET',      
       success: function(Tipos){
         let appendTipo =  $("#tipo")
           $.each(Tipos, (i,tipo)=>{
          appendTipo.append(`
           <option value="${tipo}">${tipo}</option>
            `)
         })
       }
     })
}


function renderDatos(inmueble){       
          $('.lista').append(`
               <div class="card horizontal">
                 <div class="card-image">
                   <img src="img/home.jpg">
                 </div>
                 <div class="card-stacked">
                   <div class="card-content">
                     <div>
                       <b>Direccion: </b><p>${inmueble.Direccion}</p>
                     </div>
                     <div>
                          <b>Ciudad: </b><p>${inmueble.Ciudad}</p>
                     </div>
                     <div>
                        <b>Telefono: </b><p>${inmueble.Telefono}</p>
                     </div>
                     <div>
                      <b>Código postal: </b><p>${inmueble.Codigo_Postal}</p>
                     </div>
                          <b>Precio: </b><p>${inmueble.Precio}</p>
                      </div>
                      <div>
                           <b>Tipo: </b><p>${inmueble.Tipo}</p>
                      </div>
                  </div>
                  <div class="card-action right-align">
                         <a href="#">Ver más</a>
                  </div>
              </div>
         </div>
      `)        
   
   }

})  


