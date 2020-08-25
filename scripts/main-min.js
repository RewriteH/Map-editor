var canvas=document.querySelector(".game-area__ctx"),ctx=canvas.getContext("2d"),panelWalls=document.querySelector(".game-panel__walls"),gridCheckbox=document.querySelector("input[name=grid]"),draggableWall=null,selectedPanelItem=null,walls=[];const gridSettings={squareWidth:25,squareHeight:15},getSelectedWall=()=>walls.find(e=>!0===e.active),getDraggableWall=()=>walls.find(e=>!0===e.draggable),getXcoords=e=>currArea.x+e.x,getYcoords=e=>currArea.y+e.y,getXPixelRatio=canvas.width/gridSettings.squareWidth,getYPixelRatio=canvas.height/gridSettings.squareHeight,currArea={x:0,y:0,width:250,height:270},setSelectedPanelItem=e=>{if(null===e)return selectedPanelItem.classList.remove("active"),void(selectedPanelItem=null);selectedPanelItem&&selectedPanelItem.classList.remove("active"),(selectedPanelItem=e).classList.add("active")},setSelectedWall=e=>{setSelectedPanelItem(e),walls.forEach(a=>{e.id===`wall-${a.id}`?a.active=!0:a.active=!1}),loadWalls()},wallChange=e=>{walls.find(e=>!0===e.active)[e.name]=+e.value,loadWalls()},addWall=e=>{walls.find(a=>a.id===e.id)||(walls.push(e),panelWalls.insertAdjacentHTML("beforeend",`<div \n        class="game-panel__wall game-panel-wall"\n        id="wall-${e.id}"\n        onclick="setSelectedWall(this)"\n    >\n        <div class="game-panel-wall__coords">\n            <span classname="game-panel">x:</span>\n            <input name="x" oninput="wallChange(this)" value="${e.x}">\n            <span>y:</span>\n            <input name="y" oninput="wallChange(this)" value="${e.y}">\n        </div>\n        <div class="game-panel-wall__size">\n            <span>width:</span>\n            <input  oninput="wallChange(this)" name="w" value="${e.w}">\n            <span>height:</span>\n            <input oninput="wallChange(this)" name="h" value="${e.h}">\n        </div>\n    </div>`))},updatePanel=e=>{const a=document.querySelector(`#wall-${e.id}`);for(let l in e)a.querySelector(`input[name=${l}]`)&&(a.querySelector(`input[name=${l}]`).value=e[l])},toggleGrid=e=>{if(gridCheckbox.checked){ctx.beginPath();const e=canvas.width-2,t=canvas.height-2,r=e/gridSettings.squareWidth,n=t/gridSettings.squareHeight;ctx.strokeStyle="#bdbdbd",ctx.lineWidth=.1;for(var a=r;a<e;a+=r)ctx.strokeRect(a,0,.1,t);for(var l=n;l<t;l+=n)ctx.strokeRect(0,l,e,.1);ctx.fill(),ctx.closePath()}},updateArea=e=>{toggleGrid(),ctx.beginPath(),addWall(e),ctx.rect(getXcoords(e),getYcoords(e),e.w,e.h),e.active&&(ctx.strokeStyle="red",ctx.lineWidth=5,ctx.stroke()),ctx.fill(),ctx.closePath()},loadWalls=()=>{ctx.clearRect(0,0,canvas.width,canvas.height),walls.map(e=>{updateArea(e),updatePanel(e)})};updateArea({x:0,y:0,w:15,h:50,id:1,burn:[],permeability:[]});const takeDraggableWall=e=>{walls.forEach(a=>{e.layerX>getXcoords(a)&&e.layerX<getXcoords(a)+a.w&&e.layerY>getYcoords(a)&&e.layerY<getYcoords(a)+a.h?(a.active=!0,setSelectedPanelItem(document.querySelector(`#wall-${a.id}`)),a.draggable=!0):a.active=!1}),!getSelectedWall()&&selectedPanelItem&&setSelectedPanelItem(null),loadWalls()},squaresToCoords=(e,a)=>{if("X"===a){let a=Math.round(e/getXPixelRatio);return a=Math.round(a*getXPixelRatio)}if("Y"===a){let a=Math.round(e/getYPixelRatio);return a=Math.round(a*getYPixelRatio)}},dragWall=e=>{const a=getDraggableWall();if(a){let l=Math.round(e.layerX-currArea.x-a.w/2),t=Math.round(e.layerY-currArea.y-a.h/2);l=squaresToCoords(l,"X"),t=squaresToCoords(t,"Y"),l<0&&(l=0),l>=currArea.width-a.w&&(l=currArea.width-a.w),t<0&&(t=0),t>=currArea.height-a.h&&(t=currArea.height-a.h),a.x=l,a.y=t,loadWalls()}},dragWallOnKey=e=>{let a=getSelectedWall(),l=a.w>a.h?"w":"h";if(a)switch(e.code){case"KeyD":case"ArrowRight":currArea.width-a.w>a.x&&(a.x+=1);break;case"KeyA":case"ArrowLeft":0<a.x&&(a.x-=1);break;case"KeyS":case"ArrowDown":currArea.height-a.h>a.y&&(a.y+=1);break;case"KeyW":case"ArrowUp":0<a.y&&(a.y-=1);break;case"KeyQ":a[l]>10&&(a[l]-=1);break;case"KeyE":a[l]+=1}loadWalls()},dropDraggableWall=e=>{const a=getDraggableWall();a&&(a.draggable=null)};canvas.addEventListener("mousedown",takeDraggableWall),canvas.addEventListener("mousemove",dragWall),document.addEventListener("keydown",dragWallOnKey),document.addEventListener("mouseup",dropDraggableWall);