module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected to chat:', socket.id);

        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });

        socket.on('send_message', (data) => {
            // data: { roomId, senderId, message, timestamp }
            io.to(data.roomId).emit('receive_message', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected from chat');
        });
    });
};
