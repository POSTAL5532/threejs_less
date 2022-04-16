import {Group, Object3D} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {MODELS_LOADER} from "../utils";

export abstract class ExternalModel extends Object3D {

    model: any;

    modelName: string;

    constructor(modelName: string) {
        super();
        this.modelName = modelName;
    }

    initModel = (onModelInit?: () => void) => {
        this.model.xui();
        MODELS_LOADER.load(`/models/${this.modelName}`, (model: GLTF) => {
            this.model = model.scene;
            this.add(model.scene);
            onModelInit?.();
        });
    }
}