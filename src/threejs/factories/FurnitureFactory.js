import { Chair, Barstool, Table, Microwave, BillardTable } from '../primitives/';

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
                // case 'table':
                //     new Table(scene, object.config);
                //     break;
                case 'microwave':
                    new Microwave(scene, object.config);
                    break;
                case 'billardTable':
                    new BillardTable(scene, object.config);
                    break;
                default:
                    break;
            }
        });
    }
}

export { FurnitureFactory };