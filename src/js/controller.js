'use strict'
const form = document.querySelector('.form')

document.querySelector('.shape-builder').addEventListener('click', function(){
    console.log(getComputedStyle(form).display)
     if (getComputedStyle(form).display === 'none') {
        form.style.display = 'block';
     } else if (form.style.display === 'block') form.style.display = 'none';
})



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





// square.addEventListener('click', function(){
//     const allShapes = document.querySelectorAll('.shape-target')

//     const viewportWidth = window.innerWidth;


//     allShapes.forEach(shape => {
//         const {x: xPosition, y: yPosition} = shape.getBoundingClientRect()
//         const isOut = isOutOfView(shape)
//         console.log(isOut);

        


    

//         const moveLeftDuration = xPosition 

//         let width;
//         if (shape.classList.contains("shape-circle") || shape.classList.contains("shape-square")) {
//             width = Number(shape.style.width.slice(0, -2));
//         } else {
//             width = Number(shape.style.borderLeft.slice(0, -20))*2;
//             console.log(width);
//         }


//         const startingLeftShapePos = Number(shape.style.left.slice(0, -2));

//         const styles = window.getComputedStyle(shape);

//         const matrix = new WebKitCSSMatrix(styles.transform)
        
//         const startingLeft = startingLeftShapePos - xPosition;


//         console.log(`x pos: ${xPosition}`)
        
//         const ratioFromLeft = xPosition / viewportWidth 
//         console.log(`from left ${ratioFromLeft}`);

//         const timeToLeft = ratioFromLeft *2000
//         const timeToRight = (1 - ratioFromLeft) *2000
        



//         // $(shape).animate({left: `${startingLeft}px`}, timeToLeft, "linear");

        

//         $(shape).animate({left: `${startingLeft}px`}, timeToLeft, "linear");
//         $(shape).animate({left: `${viewportWidth - matrix.e - width}px`}, 2000, "linear");
//         $(shape).animate({left: `${startingLeftShapePos}px`}, timeToRight, "linear");
//         // $(shape).animate({left: '600px'});
//         // $(shape).animate({left: `400px`});
//     })
// })








document.getElementById('walls').addEventListener('click', function(){
    const allShapes = document.querySelectorAll('.shape-target')

    const viewportWidth = window.innerWidth;


    allShapes.forEach(shape => {
        const {x: xPosition, y: yPosition} = shape.getBoundingClientRect()
        


        const moveLeftDuration = xPosition 

        let width;
        if (shape.classList.contains("shape-circle") || shape.classList.contains("shape-square")) {
            width = Number(shape.style.width.slice(0, -2));
        } else {
            width = Number(shape.style.borderLeft.slice(0, -20))*2;
            console.log(width);
        }


        const startingLeftShapePos = Number(shape.style.left.slice(0, -2));

        const styles = window.getComputedStyle(shape);
        // console.log(styles.width);
        // console.log(styles.left);
        const matrix = new WebKitCSSMatrix(styles.transform)
        
        const startingLeft = startingLeftShapePos - xPosition;


        console.log(`x pos: ${xPosition}`)
        
        const ratioFromLeft = xPosition / viewportWidth 
        console.log(`from left ${ratioFromLeft}`);

        const timeToLeft = ratioFromLeft *2000
        const timeToRight = (1 - ratioFromLeft) *2000
        




       

        $(shape).animate({left: `${startingLeft}px`}, timeToLeft, "linear");
        $(shape).animate({left: `${viewportWidth - matrix.e - width}px`}, 2000, "linear");
        $(shape).animate({left: `${startingLeftShapePos}px`}, timeToRight, "linear");

        
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
    userTopPos = document.getElementById('top-position').value
    userLeftPos = document.getElementById('left-position').value
    userHeight = document.getElementById('height').value
    userWidth = document.getElementById('width').value

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











// let counter
        // for (let i=0; i<100; i++) {
        // shape.style.left = Number.parseFloat(getComputedStyle(shape).left, 10) -1 + 'px'
        // }
        // const styles = getComputedStyle(shape)
        // const matrix = new WebKitCSSMatrix(styles.transform)
        // console.log(matrix.e)

        // const totalLeft = Number(styles.top.slice(0, -2)) + Number(matrix.e)

        // console.log(totalLeft)

        // let moveLeft = setInterval(function() {
        //     console.log('hiii');
        //     const isOut = isOutOfView(shape)

        //     if (!isOut.left) { 
        //         shape.style.left = Number.parseFloat(getComputedStyle(shape).left, 10) -1 + 'px'
        //     }
        //   }, 50)




// function isOutOfView(shape){
//     const bounding = shape.getBoundingClientRect()
//     const out = {};
//     out.left = bounding.left < 0;
//     out.right = bounding.right < (window.innerWidth || document.documentElement.clientWidth);
//     out.any = out.top || out.left
//     return out
// }