var canvas = document.getElementById('drawCanvas');
var context = canvas.getContext('2d');
var allPaths = [], currentPath = {
    pos: [],
    col:'#880000',
    size:1
};

var drawStrokes = function(strokes){
    var replayFrame = 1;
    for (var pathI = 0; pathI < strokes.length; pathI++) {
        const path = strokes[pathI];
        for (var pointI = 0; pointI < path.pos.length-1; pointI++) {
            const point = path.pos[pointI];
            const toPoint = path.pos[pointI+1];
            setTimeout(function(){
                context.beginPath()
                context.strokeStyle = path.col;
                context.lineWidth = path.size;
                context.lineCap = 'round';
                context.moveTo(point.x, point.y);
                context.lineTo(toPoint.x, toPoint.y);
                context.stroke();
            }, 20*replayFrame);
            replayFrame++;
        }
    }
};

document.getElementById('setRed').onclick = function () {
    currentPath.col = '#880000';
};
document.getElementById('setBlue').onclick = function () {
    currentPath.col = '#000088';
};
document.getElementById('setSmall').onclick = function () {
    currentPath.size = 1;
};
document.getElementById('setBig').onclick = function () {
    currentPath.size = 10;
};
document.getElementById('submit').onclick = function(){
    console.log('Attempting to submit:', allPaths);
    $.post('/save', {strokes: JSON.stringify(allPaths)})
        .done(function(response){
            console.log('post done');
            console.log(response);
        })
        .fail(function(){
            console.error('An error occurred submitting');
        });
};

document.getElementById('load').onclick = function(){
    var gameId = $('#gameId').val();
    console.log('Attempting to load game ', gameId);
    $.get('/replay', {gameId: gameId})
        .done(function(response){
            console.log('Server says', response);
            if(!response.success){
                console.error('Server responded with anger');
                return;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawStrokes(JSON.parse(response.strokes));
        })
        .fail(function(){
            console.error('An error occurred getting saved drawing');
        });
};

canvas.onmousemove = function (e) {
    if (!e.which) {
        if(currentPath.pos.length > 0){
            allPaths.push({
                pos: currentPath.pos,
                col: currentPath.col,
                size: currentPath.size
            });
            currentPath.pos = [];
        }
        return;
    }
    var rect = this.getBoundingClientRect(),
        x = Math.floor(e.clientX - rect.left),
        y = Math.floor(e.clientY - rect.top);
    if (currentPath.pos.length > 0) {
        var lastPos = currentPath.pos[currentPath.pos.length - 1];
        context.beginPath();
        context.strokeStyle = currentPath.col;
        context.lineWidth = currentPath.size;
        context.lineCap = 'round';
        context.moveTo(lastPos.x, lastPos.y);
        context.lineTo(x, y);
        context.stroke();
    }
    currentPath.pos.push({x,y});
};