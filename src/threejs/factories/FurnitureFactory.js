import { Chair, Barstool } from '../primitives/';

class FurnitureFactory {
    static createObject(scene, order) {
        order.objects.forEach(object => {
            switch(object.type) {
                case 'chair':
                new Chair(scene, object.config);
                break;
                case 'barstool':
                new Barstool(scene, object.config);
                break;
                default:
                break;
            }
        });
    }
}

export { FurnitureFactory };