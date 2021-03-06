
var oBtn = document.getElementsByTagName('input')[0];
var oDiv = document.getElementById('div1');
var socket = null;

oBtn.onclick = function() {
    socket = io.connect('http://localhost:3000');
    console.log(socket, 'socket')
    socket.on('welcome', function(data) {
        alert(data);
        this.emit('received','收到');
    });
    socket.on('patrol', function(data) {
        alert(data);
    });
    socket.on('moveAll', function(data) {
        oDiv.style.left = data.left + 'px';
        oDiv.style.top = data.top + 'px';
    })
};
oDiv.onmousedown = function(ev) {
    var ev = ev || event;
    var disX = ev.clientX - this.offsetLeft;
    var disY = ev.clientY - this.offsetTop;
    if(oDiv.setCapture) {
        oDiv.setCapture();
    }
    document.onmousemove = function(ev) {
        var ev = ev || event;
        var L = ev.clientX - disX;
        var H = ev.clientY - disY;
        oDiv.style.left = L + 'px';
        oDiv.style.top = H + 'px';
        console.log(socket,'socket')
        socket.emit('move', {
            left: oDiv.offsetLeft,
            top: oDiv.offsetTop
        });
    }
    document.onmouseup = function() {
        document.onmouseup = document.onmousemove = null;
        if(oDiv.releaseCapture) {
            oDiv.releaseCapture();
        }
    }

    return false;
}