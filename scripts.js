
let overlay = document.getElementById("overlay")
window.addEventListener("load", ()=>{main(); console.log("loaded");overlay.style.opacity="0"})

// wrapes everthing so that the entire document is loaded before js runs
function main(){
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
      parent.style.width = "15%"; // makes all cards move to side
      this.style.width = "110%"; // make this card slightly wider
      let yPos = getYPos(parent)-getYPos(child); // gets the relative offset that would be the top of the projectContainer
      child.style.top = 0; // sets the collabsable to start at where its card is
      let maxHeight = document.getElementById("projectContainer").scrollHeight;
      console.log(`scroll height ${maxHeight}`)
      if(isPhone){
        console.log("phone")
        child.style.width = "60vw"
        setTimeout(()=>{child.style.maxWidth="60vw"}, 700); // in 700ms make collabsable wide
      }else{
        console.log("not phone")
        child.style.width = "50vw"
        setTimeout(()=>{child.style.maxWidth="50vw"}, 700); // in 700ms make collabsable wide
      }
      setTimeout(()=>{child.style.maxHeight=`${maxHeight}px`; child.style.top=`${yPos}px`}, 1300);
    });
  }


  let isPhone;
  function checkSize(){
    if (window.matchMedia("(orientation: portrait)").matches) {
      isPhone = true;
    } else {
      isPhone = false;
    }
    // console.log(isPhone)
  }
  checkSize()
  window.onresize = checkSize

  // https://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file
  // embedes another html file
  const includes = document.getElementsByTagName('include');
  [].forEach.call(includes, i => {
    let filePath = i.getAttribute('src');
    fetch(filePath).then(file => {
      file.text().then(content => {
        i.insertAdjacentHTML('afterend', content);
        i.remove();
      });
    });
  });
}