
var message = require('../models/message');
var Promise = require('bluebird')

function Socket(server) {
    // socket.emit() ：向建立该连接的客户端广播
    // socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
    // io.sockets.emit() ：向所有客户端广播，等同于上面两个的和
    
    var io = require('Socket.io')(server);

        io.on('connection', function(socket) {

            console.log('a user connected');

            socket.on('login', function(data){
                message.find(data).then(function(data) {
                    io.emit('login', data);//通知所有的人，包括当前用户
                });
            });

            socket.on('message',function(data){
                //message.add(newMessage)
                io.sockets.emit('messageAll', data)
                //socket.emit('messageAll',data);
            });

            // socket.on('disconnect',function(){
            //     console.log(socket.name+'disconnect');
            //     // if(onlineList[socket.name]){
            //     //     delete onlineList[socket.name];
            //     //     if(socketList[socket.name]){
            //     //       delete socketList[socket.name];
            //     //     }
            //     //     onlineCount--;
            //     //     io.emit('logout',{'onlineList':onlineList,'onlineCount':onlineCount,'user':socket.name});
            //     // }
            // })
        })
    
}

module.exports = Socket
