const canvas = new fabric.Canvas('myCanvas',{backgroundColor: '#ffffff'});
const addTextBtn = document.getElementById("add-text-btn");
addTextBtn.addEventListener("click", function(){
    const text = new fabric.Textbox("New Text",
        {
            left:150,
            top:150,
            width: 300,
            textAlign: "left",
            fontSize:32,
            fill:'#000000',
            fontFamily:"Arial"
        }
    );
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
});
const noSelection = document.getElementById("no-selection");
const textProperties = document.getElementById("text-properties");
const imageProperties = document.getElementById("image-properties")
const object = document.getElementById("object");
canvas.on("selection:created", function() {
    const selectedObject = canvas.getActiveObject()
    noSelection.style.display = 'none';
    object.style.display = 'block';
    if(selectedObject.type === "textbox"){
       textProperties.style.display = 'block';
       imageProperties.style.display = 'none';
    } else if (selectedObject.type === 'image'){
        textProperties.style.display = 'none';
       imageProperties.style.display = 'block';
    }
    
});
canvas.on("selection:cleared", function() {
    noSelection.style.display = 'block';
    object.style.display = 'none';
    textProperties.style.display = 'none';
    imageProperties.style.display = 'none';
});

const fontSizeInput = document.getElementById("font-size")

fontSizeInput.addEventListener("input", function(){
    const selectedObject= canvas.getActiveObject();
    if (selectedObject) {
        selectedObject.set("fontSize", Number(fontSizeInput.value));
        canvas.renderAll();
    
    }
})

const textColorInput = document.getElementById("text-color")

textColorInput.addEventListener("input", function(){
    const selectedObject= canvas.getActiveObject();
    if (selectedObject) {
        selectedObject.set("fill", textColorInput.value);
        canvas.renderAll();
    
    }
})

const fontFamily = document.getElementById("font-family")
fontFamily.addEventListener("change", function(){
    const selectedObject= canvas.getActiveObject();
    if (selectedObject) {
        selectedObject.set("fontFamily",fontFamily.value);
        canvas.renderAll();
    
    }
})

const boldBtn = document.getElementById("bold-btn")
boldBtn.addEventListener("click", function(){
    const selectedObject= canvas.getActiveObject();
    if (selectedObject) {
       if(selectedObject.fontWeight === "bold") {
        selectedObject.set("fontWeight", "normal");
       } else{
        selectedObject.set("fontWeight", "bold");
       }
     canvas.renderAll()
    }
})
const italicBtn = document.getElementById("italic-btn")
italicBtn.addEventListener("click", function(){
    const selectedObject= canvas.getActiveObject();
    if (selectedObject) {
       if(selectedObject.fontWeight === "italic") {
        selectedObject.set("fontWeight", "normal");
       } else{
        selectedObject.set("fontWeight", "italic");
       }
     canvas.renderAll()
    }
})
const underlineBtn = document.getElementById("underline-btn")
underlineBtn.addEventListener("click", function(){
    const selectedObject= canvas.getActiveObject();
    if (selectedObject) {
       if(selectedObject.underline === true) {
        selectedObject.set("underline", false);
       } else{
        selectedObject.set("underline", true);
       }
     canvas.renderAll()
    }
})
document.addEventListener("keydown", function(event){
    if(event.key === "Delete"){
        const selectedObject = canvas.getActiveObject();
        if(selectedObject){
            canvas.remove(selectedObject)
            canvas.renderAll()

        }
    }
})

const textAlign = document.getElementById("text-align")
textAlign.addEventListener("change", function(){
    const selectedObject= canvas.getActiveObject();
    if (selectedObject) {
        selectedObject.set("textAlign",textAlign.value);
        canvas.renderAll();
    
    }
})

const centerBtn = document.getElementById("center-btn");
centerBtn.addEventListener("click", function(){
    const selectedObject = canvas.getActiveObject();
    if(selectedObject){
           canvas.centerObject(selectedObject)
           canvas.renderAll()
    }

})
const verticalCenterBtn = document.getElementById("vertical-center-btn");
verticalCenterBtn.addEventListener("click", function(){
    const selectedObject = canvas.getActiveObject();
    if(selectedObject){
        selectedObject.set(canvas.centerObjectV(selectedObject));
        canvas.renderAll();
    }
})
const horizontalCenterBtn = document.getElementById("horizontal-center-btn");
horizontalCenterBtn.addEventListener("click", function(){
    const selectedObject = canvas.getActiveObject();
    if(selectedObject){
        selectedObject.set(canvas.centerObjectH(selectedObject));
        canvas.renderAll();
    }
})
const addImageBtn = document.getElementById("add-image-btn")
const imageInput = document.getElementById("image-input")
addImageBtn.addEventListener("click", function(){
    imageInput.click();
})
imageInput.addEventListener("change", function(){
    console.log("CHANGE EVENT FIRED!");
    const file = imageInput.files[0];
    console.log("FILE",file);
    const imageUrl = URL.createObjectURL(file);
    console.log("URL",imageUrl);
    fabric.Image.fromURL(imageUrl).then(function(img){
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
    })
})

const imageOpacity = document.getElementById("image-opacity");
imageOpacity.addEventListener("input",function(){
    const selectedObject = canvas.getActiveObject();
    if(selectedObject && selectedObject.type==='image'){
        selectedObject.set("opacity",imageOpacity.value/100);
        canvas.renderAll()
    }
})
const duplicateBtn = document.getElementById("duplicate-btn");
duplicateBtn.addEventListener("click", async function(){
    const selectedObject = canvas.getActiveObject()
    if (selectedObject){
        const clonedObject = await selectedObject.clone();
            clonedObject.set({
                left: clonedObject.left + 20,
                top: clonedObject.top + 20
            });
            canvas.add(clonedObject)
            canvas.setActiveObject(clonedObject)
            canvas.renderAll()
        }
    
});
const deleteObjectBtn = document.getElementById("delete-btn");
deleteObjectBtn.addEventListener("click",function(){
    const selectedObject = canvas.getActiveObject();
    if (selectedObject){
        canvas.remove(selectedObject);
        canvas.discardActiveObject();
        canvas.renderAll();
    }
});
function saveProject(project){
    localStorage.setItem("project", JSON.stringify(project))
}
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", function(){
    const canvasData = canvas.toJSON();
    const projectName = prompt("Enter project name: ")
    if (projectName && projectName.trim() !== ""){
          const project = {
        id: Date.now(),
        name: projectName.trim(),
        canvasData: canvasData
    };
    saveProject(project)
 };
    
    
});