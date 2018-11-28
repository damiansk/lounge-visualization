import { Chair, Barstool, Table, Microwave, BillardTable } from '../primitives/';

class FurnitureFactory {
    static createObject(scene, order) {
        order.objects.forEach(object => {
            switch(object.type) {
                case 'chair':
                    object.config.positions.forEach(pos => {
                        new Chair(scene, pos);
                    })
                    break;
                case 'barstool':
                    object.config.positions.forEach(pos => {
                        new Barstool(scene, pos);
                    })
                    break;
                case 'table':
                    object.config.positions.forEach(pos => {
                        new Table(scene, pos);
                    })
                    break;
                case 'microwave':
                    object.config.positions.forEach(pos => {
                        new Microwave(scene, pos);
                    })
                    break;
                case 'billardTable':
                    object.config.positions.forEach(pos => {
                        new BillardTable(scene, pos);
                    })
                    break;
                default:
                    break;
            }
        });
    }
}

export { FurnitureFactory };