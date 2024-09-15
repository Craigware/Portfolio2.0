import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { RotateTitle } from "./TypingAnimation";
import * as THREE from 'three';

let threeVariables = {
  "sceneElement": null,
  "renderer": null,
  "scene": null,
  "camera": null,
  "objectOrbitPoint": new THREE.Vector2(0,0),
  "objects": []
}

function ClearThreeVariables() {
  if (threeVariables.sceneElement != null) {
    threeVariables.sceneElement.innerHMTL = "";
  }
  threeVariables.sceneElement = null;
  threeVariables.scene = null;
  threeVariables.renderer = null;
  threeVariables.camera = null;
  threeVariables.objects = [];
}

function CreateObjects() {
  
  PlaceObjectsOnPointOrbit();
}

function SetupThreeScene(element) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer( { alpha: true } );
  const size = element.current.getBoundingClientRect();
  const camera = new THREE.PerspectiveCamera(90, size.width/size.height, 0.01, 1000);
  camera.position.z = 10;

  renderer.setClearColor(0x000000, 0)
  renderer.setSize(size.width, size.height);
  renderer.setAnimationLoop(Animate);
  element.current.appendChild(renderer.domElement);

  threeVariables.sceneElement = element.current;
  threeVariables.scene = scene;
  threeVariables.renderer = renderer;
  threeVariables.camera = camera;
  CreateObjects();
}

function PlaceObjectsOnPointOrbit() {

}

function Animate() {
  for (let i = 0; i < threeVariables.objects.length; i++) {
    threeVariables.objects[i].position.x = 0;
    threeVariables.objects[i].position.y = 0;
    threeVariables.objects[i].position.z = 0;
  }
  threeVariables.renderer.render(threeVariables.scene, threeVariables.camera);
}

function HandleResize(e, element) {
  const newSize = element.current.getBoundingClientRect();
  threeVariables.renderer.setSize(newSize.width, newSize.height);
  threeVariables.camera.aspect = newSize.width/newSize.height;
  threeVariables.camera.updateProjectionMatrix();
}

function Cleanup() {

}

const Landing = () => {
  const title = useRef(null);
  const sceneElement = useRef(null);
  let rotating = false;
  
  useEffect(() => {
    if (!rotating){
      RotateTitle(title, 0);
      rotating = true;
      ClearThreeVariables();
      SetupThreeScene(sceneElement);
    }

    window.addEventListener("resize", (e) => { HandleResize(e, sceneElement) });
    return () => {
      Cleanup();
      window.removeEventListener("resize", (e) => { HandleResize(e, sceneElement) });
    }
  }, []);

  return(
    <motion.div id="Landing">
      <h1>
      <span style={{textAlign: 'right', fontSize: '36px', verticalAlign: 'bottom'}}>Hey there,</span>
      <br/>
      <span style={{fontSize: '48px'}}>I'm <span style={{fontSize: '64px'}}>Craig</span></span>, I'm a
      <br />
      <span ref={title} className="cursor"></span>
      </h1>
      <div ref={sceneElement} id="ModelView"></div>
    </motion.div>
  );
}

export default Landing;