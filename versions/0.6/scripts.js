

let overlay = document.getElementById("overlay")
window.addEventListener("load", ()=>{console.log("loaded");overlay.style.opacity="0"})

var coll = document.getElementsByClassName("projectItem");
var i;

var selectedProject = undefined;

const getYPos = (el)=>window.scrollY + el.getBoundingClientRect().top;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // remve last selected
    if(selectedProject){
        var oldChild = selectedProject.children[1];
        selectedProject.style.width = "100%";
        setTimeout(()=>{oldChild.style.maxWidth="0vw"}, 600);
        oldChild.style.maxHeight="5vh";
        oldChild.style.top="0%";
    }

    // expand this one
    selectedProject = this;
    var child = this.children[1]; // the collapsable
    var parent = this.parentElement; // the projectContainer
    parent.style.width = "20%"; // makes all cards move to side
    this.style.width = "110%"; // make this card slightly wider
    let yPos = getYPos(parent)-getYPos(child); // gets the relative offset that would be the top of the projectContainer
    child.style.top = 0; // sets the collabsable to start at where its card is
    setTimeout(()=>{child.style.maxWidth="50vw"}, 700); // in 700ms make collabsable wide
    setTimeout(()=>{child.style.maxHeight="55vh"; child.style.top=`${yPos}px`}, 1300);
  });
}


let outerDiv = document.getElementById("outerPage");
let scroller = document.getElementById("scroller");

let mainDiv = document.getElementById("mainDiv");


let lastScroll = 0; // scroll value on the last frame
let smoothness = 20; // how much to smooth the scrolling higher is less smoothing, gets overridden by slider default value

let isPhone;
function checkSize(){
  if (window.matchMedia("(orientation: portrait)").matches) {
    isPhone = true;
  } else {
    isPhone = false;
  }
  console.log(isPhone)
}
checkSize()
window.onresize = checkSize

let lastTick = performance.now()
function updateScroll(time){
  let delta = time=lastTick
  lastTick = time

  idealScroll = -window.innerHeight/2-window.scrollY
  if(!isPhone){
    // interpolates between lastScroll and ideaScroll relative to delta
    setScroll = lastScroll*(1-smoothness/delta)  +  idealScroll*(smoothness/delta);
    outerDiv.style.transform = `translate(0%, ${setScroll}px)`;
    lastScroll = setScroll;
  }else{
    outerDiv.style.transform = `translate(0%, ${idealScroll}px)`;
  }
  requestAnimationFrame(updateScroll)
}
requestAnimationFrame(updateScroll)


let sliderVal = document.getElementById("sliderVal")
let slider = document.getElementById("slider")
slider.oninput = function (){
  sliderVal.innerHTML = this.value;
  smoothness = this.value;
}
sliderVal.innerHTML = slider.value;
smoothness = slider.value;

// https://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file
// embedes another html file
(() => {
  const includes = document.getElementsByTagName('include');
  [].forEach.call(includes, i => {
      let filePath = i.getAttribute('src');
      fetch(filePath).then(file => {
          file.text().then(content => {
              i.insertAdjacentHTML('afterend', content);
              i.remove();
              setDocHeight()
          });
      });
  });
})();

function setDocHeight(){
  const overallHeight = outerDiv.clientHeight;
  // scroller.style.height = overallHeight;
  scroller.style.height = overallHeight*1.1;
  // console.log(mainDiv)
  // console.log(overallHeight);
}