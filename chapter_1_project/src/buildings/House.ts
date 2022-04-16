import {Object3D} from "three";
import {Lightable} from "../Lightable";
import {Materials} from "../utils";
import {ExternalModel} from "./ExternalModel";

export abstract class House extends ExternalModel implements Lightable {

    windowNamePrefix: string;

    windowsCount: number;

    windows: Object3D[];

    constructor(modelName: string, windowNamePrefix: string, windowsCount: number) {
        super(modelName);

        this.windowNamePrefix = windowNamePrefix;
        this.windowsCount = windowsCount;

        this.initModel(this.setWindowsMaterials);
    }

    public setWindowsMaterials = () => {
        for (let i = 1; i <= this.windowsCount; i++) {
            const window = this.model.getObjectByName(`${this.windowNamePrefix}${i}`);
            (window as any).material = Materials.WINDOW_OFF_MATERIAL;
        }
    }

    abstract onDay(): void;

    abstract onNight(): void;
}