class CanvasController {
    // an array to store all user generated shapes
    _shapes = []
    // wall to wall animation
    animWalls
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
        height: windowHeight,
    });

    this._layer = new Konva.Layer();
 }

    generateShape(shape, shapeValues){
        if (shape === 'square'){
            this._shapes.push( new Konva.Rect({
                x: shapeValues.left -shapeValues.width/2,
                y: shapeValues.top - shapeValues.height/2,
                width: shapeValues.width,
                height: shapeValues.height,
                fill: '#00D2FF',
                draggable: true,
              }));
        }

        if (shape === 'triangle'){
                // generate the coords of the 3 points of the triangle
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
                    draggable: true
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

        
        this._shapes.forEach(shape => {
            
            // stores this._shapes so that they aren't rerendered each time they move. note -- after being cached they can no longer be edited
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
        this._shapes.forEach(shape => {
          
            const viewWidth = window.innerWidth
              
              let centerX 
             if (shape.attrs.points) {
                 centerX = shape.attrs.points[0]
                } else {
                    centerX = shape.attrs.x
                }

               let width
               console.log(shape.x()) 
               if (shape.attrs.points) width = shape.attrs.points[0] - shape.attrs.points[4];
               if (shape.attrs.radiusX) width = shape.attrs.radiusX;
               if (shape.attrs.width) width = shape.attrs.width;
                
                console.log(width)
                 
            
    
            this.animWalls = new Konva.Animation(toLeft, this._layer);
            let direction = 1;
            let rate = 8

            function toLeft(frame) {
                let newX = shape.x() - (frame.timeDiff / 1000) - rate * direction;
                if (newX < width/2){
                    direction = -1;
                } else if (newX > viewWidth - width/2){
                    direction = 1;
                }
                shape.x(newX)
            }

            
            console.log(this.animWalls.isRunning())
            /////////
            if (this.animWalls.isRunning()){
                this.animWalls.stop()
            } else {
                this.animWalls.start();
            }
        })
    }
    stopAnimation(){

        this._shapes.forEach(shape => {
        this.animWalls.stop();
        })
    }
}




export default new CanvasController;