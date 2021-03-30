const body = document.querySelector('body');

// class DraggableShapes {
//     constructor() {
//     // array to store objects that hold the positions of each shape that has been moved. 
//     this._savedPositions = [];
//     // variables to hold the current shape postion and id of the shape that was clicked on.
//     this._shapePos;
//     this._currentShapeId;
//     this._mouseFollower = this.followMouse.bind(this)
//     // listens for a mouse pressed down
//     body.addEventListener('mousedown', this.mouseDownOnShape.bind(this));

// }

//     mouseDownOnShape(e){
//         // delegate event to the shape that was clicked
//         const clickedShape = e.target.closest('.shape-target')
//         if (!clickedShape) return;

//         // if the shape has already been moved then select it's coordinates
//         this._shapePos = this._savedPositions.find(obj => obj.id === clickedShape.id);

//         // if this is first time shape has been moved, build it a position object
//         if (!this._shapePos) {
//             this._shapePos = {id: clickedShape.id, startPosTop: 0, startPosLeft: 0, currentPosTop: 0, currentPosLeft: 0, topOffset: 0, LeftOffset: 0}
//             this._savedPositions.push(this._shapePos);
//         }

//         // reset currentPos in case user clicks on shape but doesn't move it
//         this._shapePos.currentPosLeft = 0;
//         this._shapePos.currentPosTop = 0;
    
//         // store the starting positions of the shape
//         this._shapePos.startPosTop = e.clientY 
//         this._shapePos.startPosLeft = e.clientX   
//         // this._shapePos.startPosTop = e.clientY - this._shapePos.topOffset;
//         // this._shapePos.startPosLeft = e.clientX - this._shapePos.LeftOffset;   
//         body.addEventListener('mousemove', this._mouseFollower)
//     }

//     followMouse(e){
//         e.preventDefault();
//         const hoveredShape = document.getElementById(this._shapePos.id)    

//         // work out the current position of the shape
//         this._shapePos.currentPosTop =  e.clientY 
//         this._shapePos.currentPosLeft =  e.clientX 
//         // this._shapePos.currentPosTop =  e.clientY - this._shapePos.startPosTop;
//         // this._shapePos.currentPosLeft =  e.clientX - this._shapePos.startPosLeft;

//         // use css transform translate to move the shape
//         Object.assign(hoveredShape.style, {"transform": `translate(-50%, -50%)`, left:`${this._shapePos.currentPosLeft}px`, top:`${this._shapePos.currentPosTop}px`, 'z-index': 10})
//         // Object.assign(hoveredShape.style, {"transform": `translate(-50%, -50%) translateX(${this._shapePos.currentPosLeft}px) translateY(${this._shapePos.currentPosTop}px)`, 'z-index': 10})

//         // store the ammount the shape has moved.
//         this._shapePos.topOffset = this._shapePos.currentPosTop;
//         this._shapePos.LeftOffset = this._shapePos.currentPosLeft;

//         body.addEventListener('mouseup', this.mouseReleased.bind(this));

//     }

//     mouseReleased(e){
//         e.preventDefault();
//         const hoveredShape = document.getElementById(this._shapePos.id)
//         if (!hoveredShape) return;

//         Object.assign(hoveredShape.style, {"transform": `translate(-50%, -50%) translateX(0px) translateY(0px)`, top: `${this._shapePos.currentPosTop}px`, left: `${this._shapePos.currentPosLeft}px`})
//         body.removeEventListener('mousemove', this._mouseFollower);
//         hoveredShape.style.zIndex = 0;
//     }
// }



class DraggableShapes {
    constructor() {
    // array to store objects that hold the positions of each shape that has been moved. 
    this._savedPositions = [];
    // variables to hold the current shape postion and id of the shape that was clicked on.
    this._currentShapePos;
    this._currentShapeId;
    this._mouseFollower = this.followMouse.bind(this)
    // listens for a mouse pressed down
    body.addEventListener('mousedown', this.mouseDownOnShape.bind(this));

}

    mouseDownOnShape(e){
        // delegate event to the shape that was clicked
        const clickedShape = e.target.closest('.shape-target')
        if (!clickedShape) return;

        // if the shape has already been moved then select it's coordinates
        this._currentShapePos = this._savedPositions.find(obj => obj.id === clickedShape.id);

        // if this is first time shape has been moved, build it a position object
        if (!this._currentShapePos) {
            this._currentShapePos = {id: clickedShape.id, startPosTop: 0, startPosLeft: 0, currentPosTop: 0, currentPosLeft: 0, topOffset: 0, LeftOffset: 0}
            this._savedPositions.push(this._currentShapePos);
        }
    
        // store the starting positions of the shape
        this._currentShapePos.startPosTop = e.clientY - this._currentShapePos.topOffset;
        this._currentShapePos.startPosLeft = e.clientX - this._currentShapePos.LeftOffset;   
        body.addEventListener('mousemove', this._mouseFollower)
    }

    followMouse(e){
        e.preventDefault();
        const hoveredShape = document.getElementById(this._currentShapePos.id)    

        // work out the current position of the shape
        this._currentShapePos.currentPosTop =  e.clientY - this._currentShapePos.startPosTop;
        this._currentShapePos.currentPosLeft =  e.clientX - this._currentShapePos.startPosLeft;

        // use css transform translate to move the shape
        Object.assign(hoveredShape.style, {"transform": `translate(-50%, -50%) translateX(${this._currentShapePos.currentPosLeft}px) translateY(${this._currentShapePos.currentPosTop}px)`, 'z-index': 10})

        // store the ammount the shape has moved.
        this._currentShapePos.topOffset = this._currentShapePos.currentPosTop;
        this._currentShapePos.LeftOffset = this._currentShapePos.currentPosLeft;

        body.addEventListener('mouseup', this.mouseReleased.bind(this));

    }

    mouseReleased(e){
        e.preventDefault();
        const hoveredShape = document.getElementById(this._currentShapePos.id)
        if (!hoveredShape) return;

        body.removeEventListener('mousemove', this._mouseFollower);
        hoveredShape.style.zIndex = 0;
    }
}

export default new DraggableShapes