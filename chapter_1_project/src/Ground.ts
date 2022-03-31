import {BoxGeometry, Mesh, MeshLambertMaterial, MeshPhongMaterial, Scene} from "three";
import {Interaction} from "./three-interaction";

export const addGroundToScene = (scene: Scene, interaction: Interaction) => {
    const geometryColors = {
        groundColor: "#a5784a",
        grownColor: "#007c12",
        waterColor: "#00b7ff",
    }

// Global ground
    const gGroundMaterial = new MeshLambertMaterial({color: geometryColors.groundColor});
    const gGround = new Mesh(
        new BoxGeometry(11, 0.3, 11),
        gGroundMaterial
    );
    scene.add(gGround);

//Water
    const waterMaterial = new MeshPhongMaterial({color: geometryColors.waterColor});
    const water = new Mesh(
        new BoxGeometry(11, 0.5, 11),
        waterMaterial
    );
    water.position.y = 0.4;
    scene.add(water);

    const smallGround = new Mesh(
        new BoxGeometry(8, 0.4, 8),
        gGroundMaterial
    );
    smallGround.position.y = 0.8;
    scene.add(smallGround);

    const grown = new Mesh(
        new BoxGeometry(8.1, 0.4, 8.1),
        new MeshLambertMaterial({color: geometryColors.grownColor})
    );
    grown.position.y = 1.2;
    scene.add(grown);
}