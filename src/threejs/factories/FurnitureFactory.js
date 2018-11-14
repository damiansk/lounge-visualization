import { Chair } from '../primitives/Chair';

class FurnitureFactory {
    static createObject(scene, order) {
        if (order.type === 'chair') {
            new Chair(scene, order.config);
        }
    }
}

export { FurnitureFactory };