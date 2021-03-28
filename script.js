'use strict'




let userTopPos 
let userLeftPos 
let userHeight 
let userWidth 
const canvas = document.querySelector('.canvas')

document.querySelector('.menu').addEventListener('click', function(e){
    const userShapeSelection = e.target.closest('.menu__icon');
    if (!userShapeSelection) return;

    userTopPos = document.querySelector('.top-position').value
    userLeftPos = document.querySelector('.left-position').value
    userHeight = document.querySelector('.height').value
    userWidth = document.querySelector('.width').value


    let userShape;
    if (userShapeSelection.classList.contains('triangle')) userShape = 'triangle';
    if (userShapeSelection.classList.contains('circle')) userShape = 'circle';
    if (userShapeSelection.classList.contains('square')) userShape = 'square';
        
    const shapeValues = generateShapeStyles(userShape);
    console.log(shapeValues);
    
    renderShape(userShape, shapeValues);
    console.log('here');
    
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
    var newShape = document.createElement('div')
    newShape.classList.add('shape', `shape-${shape}`)
    canvas.appendChild(newShape);
    Object.assign(newShape.style, styles);
}








