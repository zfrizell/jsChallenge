'use strict'




let userTopPos, userLeftPos, userHeight, userWidth; 
const canvas = document.querySelector('.canvas')

document.querySelector('.menu').addEventListener('click', function(e){
    const userShapeSelection = e.target.closest('.menu__icon');
    if (!userShapeSelection) return;

    userTopPos = document.querySelector('.top-position').value
    userLeftPos = document.querySelector('.left-position').value
    userHeight = document.querySelector('.height').value
    userWidth = document.querySelector('.width').value


    let userShape = userShapeSelection.getAttribute('shape');
    // if (userShapeSelection.classList.contains('triangle')) userShape = 'triangle';
    // if (userShapeSelection.classList.contains('circle')) userShape = 'circle';
    // if (userShapeSelection.classList.contains('square')) userShape = 'square';
        
    const shapeValues = generateShapeStyles(userShape);
    
    renderShape(userShape, shapeValues);
    
})



var generateShapeStyles = function(shape){
    if (shape === 'triangle'){
        console.log(userTopPos);
        
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




