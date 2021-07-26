var coll = document.getElementsByClassName("projectItem");
var i;

var selectedProject = undefined;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // unset last selected
    if(selectedProject){
        var oldChild = selectedProject.children[1];
        selectedProject.style.width = "100%";
        setTimeout(()=>{oldChild.style.maxWidth="0vw"}, 1300);
        setTimeout(()=>{oldChild.style.maxHeight="5vh"; oldChild.style.top="0%"}, 700)
    }

    // set this
    selectedProject = this;
    this.classList.toggle("active");
    var child = this.children[1];
    var parent = this.parentElement;
    parent.style.width = "20%";
    this.style.width = "110%";
    setTimeout(()=>{child.style.maxWidth="50vw"}, 700);
    setTimeout(()=>{child.style.maxHeight="60vh"; child.style.top="-100%"}, 1300)
    // 
  });
}