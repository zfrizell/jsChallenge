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







class DraggableShapes {

    constructor() {

    // array to store objects that hold the positions of each shape that has been moved. 
    this._savedPositions = [];
    // variables to hold the current shape postion and id of the shape that was clicked on.
    this._currentShapePositions;
    this._currentShapeId;

    
    this._mouseFollower = this.followMouse.bind(this)

    // listens for a mouse pressed down
    body.addEventListener('mousedown', this.mouseDownOnShape.bind(this));

}


    

    mouseDownOnShape(e){
        // delegate to the shape that was clicked on
        const clickedShape = e.target.closest('.shape-target')
        if (!clickedShape) return;

        // if the shape has already been moved then select it's coordinates
        this._currentShapePositions = this._savedPositions.find(obj => obj.id === clickedShape.id);

        if (!this._currentShapePositions) {
            this._currentShapePositions = {id: clickedShape.id, startPosTop: 0, startPosLeft: 0, currentPosTop: 0, currentPosLeft: 0, topOffset: 0, LeftOffset: 0}
            this._savedPositions.push(this._currentShapePositions);
        }
        clickedShape.style.zIndex = 10; 
    
        // store the starting positions of the shape
        this._currentShapePositions.startPosTop = e.clientY - this._currentShapePositions.topOffset;
        this._currentShapePositions.startPosLeft = e.clientX - this._currentShapePositions.LeftOffset;   
        body.addEventListener('mousemove', this._mouseFollower)
    }

    followMouse(e){
        e.preventDefault();
        const hoveredShape = document.getElementById(this._currentShapePositions.id)    

        // work out the current position of the shape
        this._currentShapePositions.currentPosTop =  e.clientY - this._currentShapePositions.startPosTop;
        this._currentShapePositions.currentPosLeft =  e.clientX - this._currentShapePositions.startPosLeft;

        // use css transform translate to move the shape
        Object.assign(hoveredShape.style, {"transform": `translate(-50%, -50%) translateX(${this._currentShapePositions.currentPosLeft}px) translateY(${this._currentShapePositions.currentPosTop}px)`, 'z-index': 10})

        // store the ammount the shape has moved.
        this._currentShapePositions.topOffset = this._currentShapePositions.currentPosTop;
        this._currentShapePositions.LeftOffset = this._currentShapePositions.currentPosLeft;

        body.addEventListener('mouseup', this.mouseReleased.bind(this));

    }


    mouseReleased(e){
        e.preventDefault();
        const hoveredShape = document.getElementById(this._currentShapePositions.id)
        if (!hoveredShape) return;

        body.removeEventListener('mousemove', this._mouseFollower);
        hoveredShape.style.zIndex = 0;
    }
}

const dragShapes = new DraggableShapes()

