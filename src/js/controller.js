'use strict'






// provides functionality to allow the shapes to be draggable
import draggableShapes from './draggable.js';
// a 
import shapeBuilder from './shapeBuilder.js';

const square = document.querySelector('.move-square')
// console.log(square)

// document.querySelector('.dropdown__btn').addEventListener('click', function(){
//     square.forEach(el => 
//         {$(document).ready(function(){
//             $("button").click(function(){
//             $(el).animate({left: '0px'});
//             });
//         });
//     })
// })





square.addEventListener('click', function(){
    const allShapes = document.querySelectorAll('.shape-target')

    const viewportWidth = window.innerWidth;
    console.log(`view-width: ${viewportWidth}`);

    allShapes.forEach(shape => {
        const {x: xPosition} = shape.getBoundingClientRect()
        console.log(`x pos: ${xPosition}`);

        const moveLeftDuration = xPosition / viewportWidth * 100;
        console.log(moveLeftDuration);

        const width = Number(shape.style.width.slice(0, -2))
        const startingLeftShapePos = Number(shape.style.left.slice(0, -2));
        console.log(width);

        const styles = window.getComputedStyle(shape);
        // console.log(styles.width);
        // console.log(styles.left);
        const matrix = new WebKitCSSMatrix(styles.transform)
        console.log(matrix.e);
        



        const startingLeft = startingLeftShapePos - xPosition;

        


        $(shape).animate({left: `${startingLeft}px`}, 1000);
        $(shape).animate({left: `${viewportWidth - matrix.e - width}px`}, 1000);
        $(shape).animate({left: `${startingLeftShapePos}px`});
        // $(shape).animate({left: '600px'});
        // $(shape).animate({left: `400px`});
    })
})

document.querySelector('.menu').addEventListener('click', function(e){
    let userTopPos, userLeftPos, userHeight, userWidth;
    
    // select the shape icon that the user wants to generate
    const userShapeSelection = e.target.closest('.menu__icon');
    if (!userShapeSelection) return;

   // store user entered values
    userTopPos = document.querySelector('.top-position').value
    userLeftPos = document.querySelector('.left-position').value
    userHeight = document.querySelector('.height').value
    userWidth = document.querySelector('.width').value

    const userValues = {
        top: userTopPos,
        left: userLeftPos,
        height: userHeight,
        width: userWidth
    }

    // select the name of the shape that the user clicked on
    const userShape = userShapeSelection.getAttribute('shape-name');

    // generate the shape
    shapeBuilder.generateShape(userShape, userValues);    
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

// document.addEventListener('click', function(){
//     if (dropdownBtn.classList.contains('show'))
// })



const menu = document.querySelector('.menu');
// const someElement = document.querySelector('.move-square');

// toNext(menu)