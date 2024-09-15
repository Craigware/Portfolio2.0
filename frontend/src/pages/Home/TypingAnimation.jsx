const titles = [
  "Software Engineer",
  "Front-End Developer",
  "Back-End Developer",
  "Game Developer",
  "3D Modeler",
  "UI/UX Developer"
]

function CreateTypingEffect(ref, word, totalTime, index = 0) {
  if (index == 0) { ref.current.innerHTML = ""; }
  if (index != word.length) {
    ref.current.innerHTML += word[index];
    setTimeout(() => {
      CreateTypingEffect(ref, word, totalTime, index+1);
    }, 100);
  }
} 

function BackSpaceEffect(ref, index, titleIndex) {
  if (index != -1) {
    ref.current.innerHTML = ref.current.innerHTML.slice(0, index);
    ref.current.classList.remove("blinking");
    setTimeout(() => {
      BackSpaceEffect(ref, index-1, titleIndex);
    }, 100);
  } else {
    if (titleIndex == titles.length-1) { titleIndex = -1 }; 
    RotateTitle(ref, titleIndex+1)
  }
}

function RemoveTitle(ref, chance, time, titleIndex) {
  if (chance > 0.5) {
    setTimeout(() => {
      BackSpaceEffect(ref, ref.current.innerHTML.length-1, titleIndex);
    }, time/ref.current.innerHTML.length);
  } else {
    ref.current.classList.add("highlighted");
    ref.current.classList.remove("cursor");
    setTimeout(() => {
      ref.current.innerHTML = "";
      ref.current.classList.remove("highlighted");
      ref.current.classList.add("cursor");
      if (titleIndex == titles.length-1) { titleIndex = -1 }; 
      RotateTitle(ref, titleIndex+1)
    }, time);
  }
}

export function RotateTitle(ref, i) {
  let animTime = 3000;
  ref.current.classList.add("blinking");
  CreateTypingEffect(ref, titles[i], 1000);
  setTimeout(() => {
    RemoveTitle(ref, Math.random(), animTime/2, i);
  }, animTime)
}