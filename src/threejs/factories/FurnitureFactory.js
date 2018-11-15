import { Chair } from '../primitives/Chair';

class FurnitureFactory {
    static createObject(scene, order) {
        order.objects.forEach(object => {
            if (object.type === 'chair') {
                new Chair(scene, object.config);
            }
        });
    }
}

export { FurnitureFactory };