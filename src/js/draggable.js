const body = document.querySelector('body');

class DraggableForm {
    constructor() {
    // Array to store objects that hold the positions of each shape that has been moved. 
    this._savedPositions = [];
    // Variables to hold the current shape postion and id of the shape that was clicked on.
    this._elementPos;

    // The element to make draggable
    this._clickedElement;

    this._mouseFollower = this.followMouse.bind(this)
    // Listens for a mouse pressed down
    body.addEventListener('mousedown', this.mouseDownOnShape.bind(this));

}

    mouseDownOnShape(e){
        // delegate event to the shape that was clicked
        this._clickedElement = e.target.closest('.form')
        if (!this._clickedElement) return;
        e.stopPropagation();
        

        // if the shape has already been moved then select it's coordinates
        this._elementPos = this._savedPositions.find(obj => obj.id === this._clickedElement.id);

        // if this is first time shape has been moved, build it a position object
        if (!this._elementPos) {
            this._elementPos = {id: this._clickedElement.id, startPosTop: 0, startPosLeft: 0, currentPosTop: 0, currentPosLeft: 0, topOffset: 0, LeftOffset: 0}
            this._savedPositions.push(this._elementPos);
        }
    
        // store the starting positions of the shape

        if (e.type === "touchstart") {
            console.log('touchstart');
            
            this._elementPos.startPosTop = e.touches[0].clientX - this._elementPos.topOffset;
            this._elementPos.startPosTop = e.touches[0].clientY - this._elementPos.topOffset;
          } else { this._elementPos.startPosTop = e.clientY - this._elementPos.topOffset;
                   this._elementPos.startPosLeft = e.clientX - this._elementPos.LeftOffset;
                }   
        body.addEventListener('mousemove', this._mouseFollower)
    }

    followMouse(e){
        e.preventDefault();
        const hoveredShape = document.getElementById(this._elementPos.id)    

        // work out the current position of the shape
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
          } else {
              this._elementPos.currentPosTop =  e.clientY - this._elementPos.startPosTop;
              this._elementPos.currentPosLeft =  e.clientX - this._elementPos.startPosLeft;
            }

        // use css transform translate to move the shape
        Object.assign(hoveredShape.style, {"transform": `translateX(${this._elementPos.currentPosLeft}px) translateY(${this._elementPos.currentPosTop}px)`, 'z-index': 10})

        // store the ammount the shape has moved.
        this._elementPos.topOffset = this._elementPos.currentPosTop;
        this._elementPos.LeftOffset = this._elementPos.currentPosLeft;

        body.addEventListener('mouseup', this.mouseReleased.bind(this));

    }

    mouseReleased(e){
        e.preventDefault();
        const hoveredShape = document.getElementById(this._elementPos.id)
        if (!hoveredShape) return;

        body.removeEventListener('mousemove', this._mouseFollower);
        hoveredShape.style.zIndex = 1;
    }
}

export default new DraggableForm