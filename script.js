'use strict'

let userTopPos, userLeftPos, userHeight, userWidth; 
const canvas = document.querySelector('.canvas')
const body = document.querySelector('body');

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
    const userShape = userShapeSelection.getAttribute('shape-name');

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
    newShape.classList.add('shape-target', `shape-${shape}`);
    newShape.id = Date.now();
    body.appendChild(newShape);
    Object.assign(newShape.style, styles);
}

const savedPositions = [];



let startPosTop, startPosLeft, currentPosTop, currentPosLeft, topOffset = 0, LeftOffset = 0;
let storedShapePositions

document.addEventListener('mousedown', getStartingPos)
document.addEventListener('mouseup', listenForMouseUp)



function getStartingPos(e){
    const clickedShape = e.target.closest('.shape-target')
    if (!clickedShape) return;
    console.log(clickedShape.id);
     storedShapePositions = (savedPositions.find(obj => obj.id === clickedShape.id));
    if (!storedShapePositions) {
        savedPositions.push({id: clickedShape.id, startPosTop, startPosLeft, currentPosTop, currentPosLeft, topOffset: 0, LeftOffset: 0}) 
    }
    console.log(storedShapePositions);
    console.log(savedPositions);
    startPosTop = e.clientY - topOffset;
    startPosLeft = e.clientX - LeftOffset;   
    console.log(`starting positions ${startPosLeft}, ${startPosTop}`)
    listenForMouseMoving()
}




function listenForMouseMoving()  {
    document.addEventListener('mousemove', followMouse)
}





function listenForMouseUp(e){
    e.preventDefault();
    const clickedShape = e.target.closest('.shape-target')
    if (!clickedShape) return;
    console.log('mouse up yo');
    console.log(e.clientX, e.clientY)

    document.removeEventListener('mousemove', followMouse);
    
    console.log(startPosTop, startPosLeft, currentPosTop, currentPosLeft);

}


function followMouse(e){
    e.preventDefault();
    const clickedShape = e.target.closest('.shape-target');
    if (!clickedShape) return;
    
    currentPosTop =  e.clientY - startPosTop;
    currentPosLeft =  e.clientX - startPosLeft;

    console.log(`current positions ${currentPosLeft}, ${currentPosTop}`);
    Object.assign(clickedShape.style, {"transform": `translate(-50%, -50%) translateX(${currentPosLeft}px) translateY(${currentPosTop}px)`})
    topOffset = currentPosTop;
    LeftOffset = currentPosLeft;
}


// document.addEventListener('mousemove', followMouse)






const testArr = [{id: 1234, swag: 'dolla'}, {id: 1235, so: 'ray'}, {id: 1236, it: 'fu'}]

console.log(testArr.find(obj => obj.id === 1239))