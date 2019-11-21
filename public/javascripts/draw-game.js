var canvas = document.getElementById('drawCanvas');
var context = canvas.getContext('2d');
var allPaths = [], currentPath = {
    pos: [],
    col:'#880000',
    size:1
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
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
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