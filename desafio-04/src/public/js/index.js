const socket = io();
socket.on("productCreated", () => {
    window.location.replace('/realtimeproducts');
});