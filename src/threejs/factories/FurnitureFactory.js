import { Chair, Barstool, Table, Microwave, BillardTable } from '../primitives/';

class FurnitureFactory {
    static createObject(scene, order) {
        order.objects.forEach(object => {
            switch(object.type) {
                case 'chair':
                    object.configs.forEach(config => {
                        new Chair(scene, config);
                    })
                    break;
                case 'barstool':
                    object.configs.forEach(config => {
                        new Barstool(scene, config);
                    })
                    break;
                case 'table':
                    object.configs.forEach(config => {
                        new Table(scene, config);
                    })
                    break;
                case 'microwave':
                    object.configs.forEach(config => {
                        new Microwave(scene, config);
                    })
                    break;
                case 'billardTable':
                    object.configs.forEach(config => {
                        new BillardTable(scene, config);
                    })
                    break;
                default:
                    break;
            }
        });
    }
}

export { FurnitureFactory };