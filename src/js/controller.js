'use strict'
const form = document.querySelector('.form')
const menuBar = document.querySelector('.menu')
const btnForMobile = document.querySelector('.shape-builder')
const dropdownBtn = document.getElementById('dropdownButton')
const dropdownBtnNone = document.getElementById('dropdown__none')
const dropdownBtnWalls = document.getElementById('dropdown__walls')




// provides functionality to allow the form to be draggable
import DraggableForm from './draggable.js';
// an object that generates and controls a canvas.
import canvasController from './canvasController.js';


// create the canvas
canvasController.createCanvas();

// listen for user click on the menu bar.
menuBar.addEventListener('click', function(e){
    // select the shape icon that the user clicked on
    const userShapeSelection = e.target.closest('.menu__icon');
    if (!userShapeSelection) return;
    
        const userTopPos = Number(document.getElementById('top-position').value);
        const userLeftPos = Number(document.getElementById('left-position').value);
        const userHeight = Number(document.getElementById('height').value);
        const userWidth = Number(document.getElementById('width').value);

        // alert the user if the shape they are trying to create is off the screen
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



// dropdown functionality 
document.addEventListener('click', function(e){
    if (e.target.closest('.dropdown__btn')) {
        dropdownBtn.classList.toggle('show')
    }
    else if (dropdownBtn.classList.contains('show')) {
        dropdownBtn.classList.remove('show')
    }
    
})
// user click on 'none'
dropdownBtnNone.addEventListener('click', function(){
    canvasController.stopAnimation();
});
// user click on 'walls'
dropdownBtnWalls.addEventListener('click', function(){
    canvasController.animationWalls();
})
// display the form if user clicks on mobile btn
btnForMobile.addEventListener('click', function(){
    console.log(getComputedStyle(form).display)
     if (getComputedStyle(form).display === 'none') {
        form.style.display = 'block';
     } else if (form.style.display === 'block') form.style.display = 'none';
})
