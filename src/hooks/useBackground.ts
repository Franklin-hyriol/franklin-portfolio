import { Group, Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial } from "three";
import useDimension from "./useDimension";
import { vertexShader } from "../shaders/vertex";
import { fragmentShader } from "../shaders/fragmentBg";
import { useTexture } from "@react-three/drei";
import useMouse from "./useMouse";


useTexture.preload("/images/paper.jpg")
useTexture.preload("/images/franklin-hyriol.png")


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
    const texture1 = useTexture("/images/paper.jpg");
    const material1 = new MeshBasicMaterial({
        map: texture1,
        transparent: true, // Active la transparence
        opacity: 0.15
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


    scene.add(group);
    return { scene, camera, uniforms };
}