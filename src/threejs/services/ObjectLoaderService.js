import OBJLoader from 'obj-loader';
import MTLLoader from 'mtl-loader';

const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
objLoader.setPath('assets/');
mtlLoader.setPath('assets/');

class LoaderService {
    static loadOBJ(file, callback) {
        mtlLoader.load(`${file}.mtl`, function(materials){
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load(`${file}.obj`, callback);
         });
    }
}


export { LoaderService };