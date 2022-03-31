import {BoxGeometry, Mesh, MeshLambertMaterial, Object3D, Scene} from "three";
import {Interaction} from "./three-interaction";

export const addHouse1ToScene = (scene: Scene, interaction: Interaction) => {
    const house = new Object3D();
    house.position.y = 2.4;
    house.position.x = 2.4;
    house.position.z = 2.4;

    const mainGeometry = new BoxGeometry(1, 2, 1);
    const mainMaterial = new MeshLambertMaterial({color: "#87418a"});
    const main = new Mesh(mainGeometry, mainMaterial);
    house.add(main);
    (house as any).cursor = "pointer";
    (house as any).on('click', (ev: any) => {
        console.log(ev)
    });
    (house as any).on('touchstart', (ev: any) => {
        console.log(ev)
    });
    (house as any).on('touchcancel', (ev: any) => {
        console.log(ev)
    });
    (house as any).on('touchmove', (ev: any) => {
        console.log(ev)
    });
    (house as any).on('touchend', (ev: any) => {
        console.log(ev)
    });
    (house as any).on('mousedown', (ev: any) => {
        console.log(ev)
    });
    (house as any).on('mouseout', (ev: any) => {
        console.log(ev)
    });
    (house as any).on('mouseover', (ev: any) => {
        console.log(ev)
    });
    (house as any).on('mousemove', (ev: any) => {
        console.log(ev)
    });
    (house as any).on('mouseup', (ev: any) => {
        console.log(ev)
    });

    const windowGeometry = new BoxGeometry(1.05, 0.2, 1.05);
    const windowMaterial = new MeshLambertMaterial({color: "#496b7e"});

    for (let i = 0; i < 5; i++) {
        const window = new Mesh(windowGeometry, windowMaterial);
        window.position.y = 0.3 * i - 0.5;
        house.add(window);
    }

    scene.add(house);
}

export const addHouse2ToScene = (scene: Scene, interaction: Interaction) => {
    const house = new Object3D();
    house.position.y = 1.9;

    const mainGeometry = new BoxGeometry(2, 1.5, 2);
    const mainMaterial = new MeshLambertMaterial({color: "#002cba"});
    const main = new Mesh(mainGeometry, mainMaterial);
    house.add(main);

    const windowGeometry = new BoxGeometry(2.05, 0.2, 2.05);
    const windowMaterial = new MeshLambertMaterial({color: "#496b7e"});

    for (let i = 0; i < 3; i++) {
        const window = new Mesh(windowGeometry, windowMaterial);
        window.position.y = 0.4 - 0.3 * i;
        house.add(window);
    }

    scene.add(house);
}