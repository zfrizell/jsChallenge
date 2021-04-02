'use strict'
const form = document.querySelector('.form')

document.querySelector('.shape-builder').addEventListener('click', function(){
    console.log(getComputedStyle(form).display)
     if (getComputedStyle(form).display === 'none') {
        form.style.display = 'block';
     } else if (form.style.display === 'block') form.style.display = 'none';
})



// provides functionality to allow the form to be draggable
import DraggableElements from './draggable.js';
// a 
import canvasController from './canvasController.js';


let userTopPos, userLeftPos, userHeight, userWidth;
   

    //   var windowWidth = window.innerWidth;
    //   var windowHeight = window.innerHeight;

    //   var stage = new Konva.Stage({
    //     container: 'konva-container',
    //     width: windowWidth,
    //     height: windowHeight,
    //   });

    //   var layer = new Konva.Layer();
      
      
      
    //   class CanvasController {
    //     _shapes = []
    //     _anim
    //     _stage
    //     _layer

    //     createCanvas(){
    //         var windowWidth = window.innerWidth;
    //   var windowHeight = window.innerHeight;

    //   this._stage = new Konva.Stage({
    //     container: 'konva-container',
    //     width: windowWidth,
    //     height: windowHeight,
    //   });

    //   this._layer = new Konva.Layer();
    //     }

        
    //     generateShape(shape, shapeValues){
    //         if (shape === 'square'){
    //             this._shapes.push( new Konva.Rect({
    //                 x: shapeValues.left -shapeValues.width/2,
    //                 y: shapeValues.top - shapeValues.height/2,
    //                 width: shapeValues.width,
    //                 height: shapeValues.height,
    //                 fill: '#00D2FF',
    //                 draggable: true,
    //               }));
    //         }

    //         if (shape === 'triangle'){
    //                 // generate the coords of the 3 points of the triangle
    //                 const x1 = shapeValues.left + shapeValues.width/2
    //                 const y1 = shapeValues.top + shapeValues.height/2
    //                 const x2 = shapeValues.left 
    //                 const y2 = shapeValues.top - shapeValues.height/2 
    //                 const x3 = shapeValues.left - shapeValues.width/2
    //                 const y3 = shapeValues.top + shapeValues.height/2

    //                 this._shapes.push(new Konva.Line({
    //                     points: [x1,y1,x2,y2,x3,y3],
    //                     fill: '#00D2FF',
    //                     closed: true,
    //                     draggable: true
    //                   }));
    //         }

    //         if (shape === 'circle'){
    //             this._shapes.push( new Konva.Ellipse({
    //                 x: shapeValues.left,
    //                 y: shapeValues.top,
    //                 radiusX: shapeValues.width/2,
    //                 radiusY: shapeValues.height/2,
    //                 fill: 'yellow',
    //                 draggable: true
    //                 }))
    //         }

            
    //         this._shapes.forEach(shape => {
                
    //             // stores this._shapes so that they aren't rerendered each time they move. note -- after being cached they can no longer be edited
    //             shape.cache();

    //             shape.on('mouseover', function () {
    //                 document.body.style.cursor = 'pointer';
    //               });
    //               shape.on('mouseout', function () {
    //                 document.body.style.cursor = 'default';
    //               });
            
    //               this._layer.add(shape);
    //             })
    //             this._stage.add(this._layer);
    //     }

    //     animationWalls(){
    //         this._shapes.forEach(shape => {
              
    //             const viewWidth = window.innerWidth
                  
    //               let centerX 
    //              if (shape.attrs.points) {
    //                  centerX = shape.attrs.points[0]
    //                 } else {
    //                     centerX = shape.attrs.x
    //                 }
    
    //                let width
    //                console.log(shape.x()) 
    //                if (shape.attrs.points) width = shape.attrs.points[0] - shape.attrs.points[4];
    //                if (shape.attrs.radiusX) width = shape.attrs.radiusX;
    //                if (shape.attrs.width) width = shape.attrs.width;
                    
    //                 console.log(width)
                     
                
        
    //             this._anim = new Konva.Animation(toLeft, this._layer);
    //             let direction = 1;
    //             let rate = 8
    
    //             function toLeft(frame) {
    //                 let newX = shape.x() - (frame.timeDiff / 1000) - rate * direction;
    //                 if (newX < width/2){
    //                     direction = -1;
    //                 } else if (newX > viewWidth - width/2){
    //                     direction = 1;
    //                 }
    //                 shape.x(newX)
    //             }
    
                
    //             console.log(this._anim.isRunning())
    //             /////////
    //             if (this._anim.isRunning()){
    //                 this._anim.stop()
    //             } else {
    //                 this._anim.start();
    //             }
    //         })
    //     }
    //     stopAnimation(){

    //         this._shapes.forEach(shape => {
    //         this._anim.stop();
    //         })
    //     }
    // }

    // const canvasControls = new CanvasController


    canvasController.createCanvas();
   

    document.getElementById('dropdown__none').addEventListener('click', function(){
        canvasController.stopAnimation();
    });
    
    document.getElementById('dropdown__walls').addEventListener('click', function(){
        canvasController.animationWalls();
      })





    document.querySelector('.menu').addEventListener('click', function(e){
    
        // select the shape icon that the user wants to generate
        const userShapeSelection = e.target.closest('.menu__icon');
        if (!userShapeSelection) return;

        userTopPos = Number(document.getElementById('top-position').value)
        userLeftPos = Number(document.getElementById('left-position').value)
        userHeight = Number(document.getElementById('height').value)
        userWidth = Number(document.getElementById('width').value)


        if (userLeftPos > window.innerWidth && userTopPos > window.innerHeight) return alert('The shape you\'re trying to build is off the top and left side of the screen! Please try lower left side and top coordinates')
        if (userLeftPos > window.innerWidth) return alert('The shape you\'re trying to build is off the left side of the screen! Please try a lower left side coordinate')
        if (userTopPos > window.innerHeight) return alert('The shape you\'re trying to build is off the bottom of the screen! Please try a lower top coordinate')

        const userValues = {
                    top: userTopPos, 
                    left: userLeftPos, 
                    height: userHeight, 
                    width: userWidth 
                }

         // select the name of the shape that the user clicked on
         const userShape = userShapeSelection.getAttribute('shape-name');

        canvasController.generateShape(userShape, userValues)

       
      })



      









    



document.getElementById('dropdown__spiral').addEventListener('click', function(){
    const allShapes = document.querySelectorAll('.shape-target')
    allShapes.forEach(shape => {
       
        
    })
})







      







const dropdownBtn = document.getElementById('dropdownButton')
document.addEventListener('click', function(e){
    if (e.target.closest('.dropdown__btn')) {
        dropdownBtn.classList.toggle('show')
    }
    else if (dropdownBtn.classList.contains('show')) {
        dropdownBtn.classList.remove('show')
    }
    
})








