const canvas = document.querySelector('canvas') //asigna el primer canvas del html a la constante canvas
const c = canvas.getContext('2d') //contexto de renderizado 2d nos da metodos y propiedades para dibujar

canvas.width = innerWidth   //ancho y altura internos de la ventan del navegador
canvas.height = innerHeight

class Boundary {    
    static width = 40
    static height = 40
    constructor({position}){
        this.position = position //esta propiedad es un objeto que tiene las variables x e y;
        this.width = 40 //establecemos el ancho y la altura de la isntacia boundary
        this.height = 40
    }

    draw(){
        c.fillStyle = 'blue' //establece el color de relleno
        c.fillRect(this.position.x, this.position.y, this.width, this.height) //dibuja un rectangulo en las coordenadas especificadas por this.position.x y this.position.y y el ancho y altura
    }
}   

class Player{
    constructor({position,velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 10
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const boundaries = [] //arreglo vacío que va a almacenar instancias de la clase Boundary
const player = new Player({
    position:{
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.width + Boundary.width / 2
    },
    velocity:{
        x: 0,
        y: 0
    }
})
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey

const map = [
    ['-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-']
]

map.forEach((row,i) =>{ // una forma de iterar sobre un arreglo.
    row.forEach((symbol, j) => { //symbol es el valor del elemento actual del arreglo, j es el índice del elemento actual del arreglo.
        switch(symbol){
            case '-':
                boundaries.push( //funcion incorporada en javascript pora agregar uno o mas elemento en un arreglo
                    new Boundary({//crea un nuevo objeto boundary con la posicion especificada por loparametros
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        }
                    })
                )
                break
        }
    })
})

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => { //recorriendo cada elemento del arreglo boundaries
        boundary.draw()                //y llamando al meto draw para dibujar los cubitos
    })
    player.update()
    player.velocity.x = 0
    player.velocity.y = 0

    if (keys.w.pressed && lastKey === 'w'){
        player.velocity.y = -5
    }else if(keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -5
    }else if(keys.s.pressed && lastKey === 's'){
        player.velocity.y = 5
    }else if(keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 5
    }
}

animate()

addEventListener('keydown', ({key}) => {
    switch (key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break            
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break                            
    }
})

addEventListener('keyup', ({key}) =>{
    switch (key) {
        case 'w':
            keys.w.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 's':
            keys.s.pressed = false
            break;                    
        case 'd':
            keys.d.pressed = false
            break;            
    }
})