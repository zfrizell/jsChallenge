const body = document.querySelector('body');


class ShapeBuilder {
    generateShape(shape, userVals){
        let correctStyles
        if (shape === 'triangle'){
            
            correctStyles = {
                'top':`${userVals.top}px`,
                'left':`${userVals.left}px`,
                'border-left':`${userVals.width/2}px solid transparent`,
                'border-right':`${userVals.width/2}px solid transparent`,
                'border-bottom': `${userVals.height}px solid purple`
            }
        }
        if (shape === 'square' || shape === 'circle'){
            correctStyles = {
                    'top':`${userVals.top}px`,
                    'left':`${userVals.left}px`,
                    'height':`${userVals.height}px`,
                    'width':`${userVals.width}px`
            }
        }
        this.renderShape(shape, correctStyles)
    }
    
    renderShape(shape, styles){
        var newShape = document.createElement('div');
        newShape.classList.add('shape-target', `shape-${shape}`);
        newShape.id = Date.now();
        Object.assign(newShape.style, styles);
        body.appendChild(newShape);
    }
}

export default new ShapeBuilder