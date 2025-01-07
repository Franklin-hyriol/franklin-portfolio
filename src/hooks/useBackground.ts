import { Group, Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial } from "three";
import useDimension from "./useDimension";
import { vertexShader } from "../shaders/vertex";
import { fragmentShader } from "../shaders/fragmentBg";
import { useTexture } from "@react-three/drei";
import useMouse from "./useMouse";


// const lerp = (start: number, end: number, amt: number) => start * (1 - amt) + end * amt;
// const speed = 0.015;





export function useBackground(u_time: number) {
    const device = useDimension();
    const mouse = useMouse();

    const group = new Group();

    const frustumSize = device.height;
    const aspect = device.width / device.height;

    const scene = new Scene();
    const camera = new OrthographicCamera(
        (-frustumSize * aspect) / 2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        -frustumSize / 2,
        -10000,
        10000,
    );
    camera.position.z = 2;
    scene.add(camera);

    // Animation background
    const geometry = new PlaneGeometry(device.width, device.height);
    const uniforms = {
        u_time: { value: u_time },
        u_resolution: { value: { x: device.width, y: device.height } },
        u_mouse: { value: { x: mouse.x, y: mouse.y } }
    }
    const material = new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
    const plane = new Mesh(geometry, material);
    group.add(plane);



    const geometry1 = new PlaneGeometry(device.width, device.height);
    const texture1 = useTexture("/images/paper.png");
    const material1 = new MeshBasicMaterial({
        map: texture1,
        transparent: true, // Active la transparence
        opacity: 0.17
    });
    const image1 = new Mesh(geometry1, material1);
    group.add(image1);



    // Taille originale de l'image
    const originalWidth = 630;
    const originalHeight = 250;

    // Largeur de l'écran
    const deviceWidth = device.width;

    // Si la largeur de l'écran est plus petite que l'image, ajuster la taille
    const width = deviceWidth < originalWidth ? (deviceWidth - 100) : originalWidth;

    // Calculer la hauteur en fonction du ratio
    const height = (originalHeight / originalWidth) * width;

    const geometry2 = new PlaneGeometry(width, height);
    const texture2 = useTexture("/images/franklin-hyriol.png");
    const material2 = new MeshBasicMaterial({
        map: texture2,
        transparent: true, // Active la transparence
        opacity: 1
    });
    const image2 = new Mesh(geometry2, material2);
    group.add(image2);


    // Normaliser les coordonnées de la souris dans l'espace écran (-1 à 1)
    // const normalizedX = (mouse.x / device.width) * 2 - 1; // -1 à 1 horizontal
    // const normalizedY = -((mouse.y / device.height) * 2 - 1); // -1 à 1 vertical (inversé)

    // // Convertir en coordonnées dans l'espace caméra
    // const cameraWidth = (camera.right - camera.left) / 2;
    // const cameraHeight = (camera.top - camera.bottom) / 2;

    // const worldX = normalizedX * cameraWidth;
    // const worldY = normalizedY * cameraHeight;


    // if (Math.abs(worldX) > 0.1 || Math.abs(worldY) > 0.1) {
    //     image1.position.x += lerp((worldX * speed), 0, 0.1);
    //     image1.position.y += lerp((worldY * speed), 0, 0.1);
    // } else {
    //     image1.position.x = 0;
    //     image1.position.y = 0;
    // }

    scene.add(group);
    return { scene, camera, uniforms };
}