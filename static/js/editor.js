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
canvas.on("selection:created", function() {
    noSelection.style.display = 'none';
    textProperties.style.display = 'block';
});
canvas.on("selection:cleared", function() {
    noSelection.style.display = 'block';
    textProperties.style.display = 'none';
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
const object = document.getElementById("object");
canvas.on("selection:created", function() {
    noSelection.style.display = 'none';
    object.style.display = 'block';
});
canvas.on("selection:cleared", function() {
    noSelection.style.display = 'block';
    object.style.display = 'none';
});
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