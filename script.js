'use strict'

let userTopPos, userLeftPos, userHeight, userWidth; 
const canvas = document.querySelector('.canvas')

document.querySelector('.menu').addEventListener('click', function(e){
    // select the shape that the user clicked on
    const userShapeSelection = e.target.closest('.menu__icon');
    if (!userShapeSelection) return;

    // store user entered values 
    userTopPos = document.querySelector('.top-position').value
    userLeftPos = document.querySelector('.left-position').value
    userHeight = document.querySelector('.height').value
    userWidth = document.querySelector('.width').value

    // select the name of the shape that the user clicked on
    const userShape = userShapeSelection.getAttribute('shape');

    // select the styles for the selected shape
    const shapeValues = generateShapeStyles(userShape);

    // render the shape
    renderShape(userShape, shapeValues);
})



var generateShapeStyles = function(shape){
    if (shape === 'triangle'){
        
        return {
            'top':`${userTopPos}px`,
            'left':`${userLeftPos}px`,
            'border-left':`${userWidth/2}px solid transparent`,
            'border-right':`${userWidth/2}px solid transparent`,
            'border-bottom': `${userHeight}px solid purple`
        }
    }
    if (shape === 'square' || shape === 'circle'){
        return {
                'top':`${userTopPos}px`,
                'left':`${userLeftPos}px`,
                'height':`${userHeight}px`,
                'width':`${userWidth}px`
        }
    }
}


var renderShape = function(shape, styles){
    var newShape = document.createElement('div');
    newShape.classList.add('shape', `shape-${shape}`);
    newShape.setAttribute('shape', `${shape}`);
    canvas.appendChild(newShape);
    Object.assign(newShape.style, styles);
}

canvas.addEventListener('click', function(e){
    const pressedShape = e.target.closest('.shape')
    if (!pressedShape) return;

    console.log(pressedShape)
    const initiitalTop = pressedShape
})




