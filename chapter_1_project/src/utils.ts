import {MeshStandardMaterial} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export const MODELS_LOADER = new GLTFLoader();

export class Materials {

    public static WINDOW_OFF_MATERIAL = new MeshStandardMaterial({color: "#2c5470"});

    public static WINDOW_ON_MATERIAL = new MeshStandardMaterial({color: "#ffffff", emissive: "#ffffff"});
}