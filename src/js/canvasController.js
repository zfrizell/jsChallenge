class CanvasController {
    // an array to store all user generated shapes
    _shapes = []
    // array to store each shape's wall to wall animation
    _animWalls = []
    // konva stage for canvas generation
    _stage
    // the layers that are rendered
    _layer

    createCanvas(){
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    this._stage = new Konva.Stage({
        container: 'konva-container',
        width: windowWidth,
        height: windowHeight
    });

    this._layer = new Konva.Layer();
 }

    // store the data for each shape in the _shapes array
    generateShape(shape, shapeValues){
        if (shape === 'square'){
            this._shapes.push( new Konva.Rect({
                x: shapeValues.left - shapeValues.width/2,
                y: shapeValues.top - shapeValues.height/2,
                width: shapeValues.width,
                height: shapeValues.height,
                fill: '#FF4500',
                draggable: true,
              }));
        }

        if (shape === 'triangle'){
                // calculate the coords of the 3 points of the triangle
                const x1 = shapeValues.left + shapeValues.width/2
                const y1 = shapeValues.top + shapeValues.height/2
                const x2 = shapeValues.left 
                const y2 = shapeValues.top - shapeValues.height/2 
                const x3 = shapeValues.left - shapeValues.width/2
                const y3 = shapeValues.top + shapeValues.height/2

                this._shapes.push(new Konva.Line({
                    points: [x1,y1,x2,y2,x3,y3],
                    fill: '#00D2FF',
                    closed: true,
                    draggable: true,
                  }));
        }

        if (shape === 'circle'){
            this._shapes.push( new Konva.Ellipse({
                x: shapeValues.left,
                y: shapeValues.top,
                radiusX: shapeValues.width/2,
                radiusY: shapeValues.height/2,
                fill: 'yellow',
                draggable: true
                }))
        }

        // loop through the shapes array and reder each one of the canvas
        this._shapes.forEach(shape => {
            
            // stores shape data so that they aren't rerendered each time they move. note -- after being cached they can no longer be edited
            shape.cache();

            shape.on('mouseover', function () {
                document.body.style.cursor = 'pointer';
              });
              shape.on('mouseout', function () {
                document.body.style.cursor = 'default';
              });
        
              this._layer.add(shape);
            })
            this._stage.add(this._layer);
    }

    animationWalls(){
        this._shapes.forEach((shape, i) => {
          
            const viewWidth = window.innerWidth

                // shape width / 2 will be stored in these vars. without these the middle of the shape will 'bounce' off each side.
               let leftSide = 0, rightSide = 0
               if (shape.attrs.points) {
                   leftSide = shape.attrs.points[3];
                   rightSide = shape.attrs.points[3];
                }
               if (shape.attrs.radiusX) {
                   leftSide = rightSide = shape.attrs.radiusX 
                };
               if (shape.attrs.width) {
                   rightSide = shape.attrs.width;
                }
                
            this._animWalls.push(new Konva.Animation(wallToWall, this._layer));

            // controls on direction and speed of animation
            let direction = 1;
            let speed = 400            

            
            function wallToWall(frame) {
                let newX = shape.attrs.x - (frame.timeDiff / 1000) * speed * direction;
                if (newX < leftSide){
                    direction = -1;
                } else if (newX > viewWidth - rightSide){
                    direction = 1;
                }
                shape.x(newX)
            }
            this._animWalls[i].start()
        })
    }
    stopAnimation(){
        this._shapes.forEach((_, i) => {
            this._animWalls[i].stop()
        })
        this._animWalls = [];
    }
}

export default new CanvasController;