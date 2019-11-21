var canvas = document.getElementById('drawCanvas');
var context = canvas.getContext('2d');
var lastPos = {}, color = '#880000', size = 1;

document.getElementById('setRed').onclick = function () {
    color = '#880000';
};
document.getElementById('setBlue').onclick = function () {
    color = '#000088';
};
document.getElementById('setSmall').onclick = function () {
    size = 1;
};
document.getElementById('setBig').onclick = function () {
    size = 10;
};

canvas.onmousemove = function (e) {
    if (!e.which) {
        lastPos = {};
        return;
    }
    var rect = this.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
    if (lastPos.x) {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = size;
        context.lineCap = 'round';
        context.moveTo(lastPos.x, lastPos.y);
        context.lineTo(x, y);
        context.stroke();
    }
    lastPos.x = x;
    lastPos.y = y;
};