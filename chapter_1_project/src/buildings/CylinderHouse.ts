import {Group, MeshStandardMaterial, Object3D} from "three";
import {House} from "./House";
import {Lightable} from "../Lightable";
import {Materials, MODELS_LOADER} from "../utils";

export class CylinderHouse extends House {

    constructor() {
        super("cylinder_house.glb", "cylinder_house_window_", 3);
    }

    onDay = (): void => {
    }

    onNight = (): void => {
        this.model.traverse(obj => {
            if (obj.name == "cylinder_house_window_1") {
                (obj as any).material = new MeshStandardMaterial({color: "#ffe200", emissive: "#ffe200"})
            }
        })
    }
}