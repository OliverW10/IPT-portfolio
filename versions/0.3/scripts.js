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

let wide = true;
const testContainer = document.getElementById("testContainer")
document.addEventListener("click", ()=>{
  wide = !wide;
  testContainer.style.width = (10+wide*40)+"vw"; console.log("changed width")})