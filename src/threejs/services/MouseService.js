const mouseMoveHandlers = new Set();

class MouseService {
    static onMouseMove(evt) {
        mouseMoveHandlers.forEach(callback => callback(evt));
    }

    registerMouseMoveHandler(callback) {
        mouseMoveHandlers.add(callback);
    }

    unregisterMouseMoveHandler(callback) {
        mouseMoveHandlers.delete(callback);
    }
}

export { MouseService };