var draggableElement,activeElement,gameObj,areas,walls,winds,groups,canvas=document.querySelector(".game-area__ctx"),ctx=canvas.getContext("2d"),panelWalls=document.querySelector(".game-panel-walls"),panelAreas=document.querySelector(".game-panel-areas"),panelWinds=document.querySelector(".game-panel-winds"),panelLevels=document.querySelector(".game-panel-levels"),panelGroups=document.querySelector(".game-panel-groups"),gridCheckbox=document.querySelector("input[id=toggleGrid]"),hideWallsCheckbox=document.querySelector("input[id=hideWalls]"),hideAreasCheckbox=document.querySelector("input[id=hideAreas]"),hideWindsCheckbox=document.querySelector("input[id=hideWinds]"),showAllElementsCheckbox=document.querySelector("input[id=showAllElements]"),switchTabCheckbox=document.querySelector("input[id=switchTab]"),bumpElementCheckbox=document.querySelector("input[id=bumpElement]"),selectedPanelItem=null,selectedPanelTab=null,selectedElements=null;const gridSettings={squareWidth:100,squareHeight:120};localStorage.setItem("level-1",'{"id":1,"groups":[{"id":1,"x":0,"y":0,"w":0,"h":0,"elements":[]}],"areas":[{"x":25,"y":32,"w":15,"h":15,"id":1,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"active":0},{"x":30,"y":47,"w":5,"h":21,"id":3,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":9,"y":68,"w":21,"h":11,"id":4,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":79,"y":113,"w":11,"h":7,"id":5,"hide":0,"params":{"x":1,"y":0,"coup":0},"active":0,"color":"rgba(100,220,220, 0.3)"},{"x":90,"y":113,"w":10,"h":7,"id":6,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":74,"w":9,"h":29,"id":7,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":91,"y":33,"w":9,"h":20,"id":8,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":53,"w":9,"h":21,"id":9,"hide":0,"params":{"x":0,"y":1,"coup":1},"active":0,"color":"rgba(220,70,100, 0.3)"},{"x":2,"y":19,"w":5,"h":5,"id":10,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"hide":0,"active":0,"draggable":null}],"walls":[{"x":0,"y":79,"w":30,"h":1,"id":1,"hide":0,"active":0,"bern":[0,0,1,0],"thru":[0,0,0,0]},{"x":10,"y":31,"w":31,"h":1,"id":2,"hide":0,"active":0,"bern":[0,1,0,1],"thru":[0,0,0,0]},{"x":61,"y":103,"w":1,"h":10,"id":3,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[1,1,1,0]},{"x":9,"y":8,"w":1,"h":24,"id":4,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":35,"y":47,"w":1,"h":21,"id":5,"hide":0,"active":0,"bern":[0,1,1,0],"thru":[0,1,1,0]},{"x":9,"y":39,"w":1,"h":28,"id":6,"hide":0,"active":0,"bern":[1,0,0,1],"thru":[0,1,1,0]},{"x":10,"y":39,"w":15,"h":1,"id":7,"hide":0,"active":1,"bern":[0,0,1,1],"thru":[1,0,1,0]},{"x":40,"y":32,"w":1,"h":15,"id":8,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":67,"w":20,"h":1,"id":9,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":24,"y":40,"w":1,"h":7,"id":10,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":95,"y":112,"w":5,"h":1,"id":11,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":47,"w":5,"h":1,"id":12,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":48,"y":67,"w":1,"h":15,"id":13,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":61,"y":95,"w":12,"h":1,"id":14,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":41,"y":90,"w":1,"h":14,"id":15,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":60,"y":82,"w":1,"h":14,"id":16,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":112,"w":77,"h":1,"id":17,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":67,"w":12,"h":1,"id":18,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":104,"w":52,"h":1,"id":19,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":103,"w":1,"h":9,"id":20,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":49,"y":81,"w":12,"h":1,"id":21,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":80,"w":1,"h":10,"id":22,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":90,"w":12,"h":1,"id":23,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":79,"w":30,"h":1,"id":24,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":47,"w":1,"h":21,"id":25,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":74,"y":90,"w":9,"h":1,"id":26,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":24,"y":47,"w":5,"h":1,"id":27,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":90,"y":33,"w":1,"h":70,"id":28,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":73,"y":90,"w":1,"h":15,"id":29,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":102,"w":5,"h":1,"id":30,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]}],"winds":[{"x":91,"y":33,"w":9,"h":70,"id":1,"color":"rgba(0,255,255,0.3)","params":{"X":1,"Y":1,"forse":1},"active":0,"draggable":null,"X":0,"Y":-1,"forse":2},{"x":74,"y":91,"w":16,"h":11,"id":2,"params":{"X":0,"Y":0,"forse":0},"color":"rgba(0,255,255,0.3)","active":0,"draggable":null}]}');var selectedLevel=JSON.parse(localStorage.getItem("level-1"));const getElementById=e=>selectedElements.find(t=>t.id===e),getAreaById=e=>areas.find(t=>t.id===e),getWallById=e=>walls.find(t=>t.id===e),getXPixelRatio=canvas.width/gridSettings.squareWidth,getYPixelRatio=canvas.height/gridSettings.squareHeight,xCoordsToPixels=e=>e*getXPixelRatio,yCoordsToPixels=e=>e*getYPixelRatio,canvasWidthInSquares=gridSettings.squareWidth,canvasHeightInSquares=gridSettings.squareHeight,clearAllPanels=()=>{[...document.querySelectorAll(".game-panel-walls__item")].forEach(e=>e.remove()),[...document.querySelectorAll(".game-panel-areas__item")].forEach(e=>e.remove()),[...document.querySelectorAll(".game-panel-winds__item")].forEach(e=>e.remove()),[...document.querySelectorAll(".game-panel-groups__item")].forEach(e=>e.remove())},generateElementId=()=>{let e=1;for(;selectedElements.find(t=>t.id===e);)e+=1;return e},generateLevelId=()=>{let e=1;for(;localStorage.getItem("level-"+e);)e+=1;return e},getAllLevels=()=>Object.keys(localStorage).map(e=>JSON.parse(localStorage.getItem(e))),deleteElementOnGroups=e=>{const t=getElementById(e);groups.forEach(e=>{const n=e.elements.indexOf(t);n>=0&&e.elements.splice(n,1)})},openImportPop=()=>{document.querySelector(".game-panel-item-import__area").classList.toggle("active")},openExportAllPop=()=>{document.querySelector(".game-panel-item-export__area").classList.toggle("active")},importLevel=()=>{let e=document.querySelector(".game-panel-item-import__text-area").value;"object"==typeof e&&(e=JSON.stringify(e)),localStorage.setItem("level-"+generateLevelId(),e),addLevelToPanel(JSON.parse(e))},exportLevels=()=>{const e=document.querySelector(".game-panel-item-export__fileName").value,t=JSON.stringify(getAllLevels()),n=document.createElement("a"),l=new Blob([t],{type:"text/plain"});n.href=URL.createObjectURL(l),n.download=e||"levels.txt",n.click(),URL.revokeObjectURL(n.href),n.remove()},exportLevel=e=>{const t=localStorage.getItem("level-"+e),n=document.createElement("a"),l=new Blob([t],{type:"text/plain"});n.href=URL.createObjectURL(l),n.download="level-"+e+".txt",n.click(),URL.revokeObjectURL(n.href),n.remove()},toggleElementOnGroup=(e,t)=>{const n=getElementById(t);if(deleteElementOnGroups(t),""!==e.value){groups.find(t=>t.id===+e.value).elements.push(n)}clearAllPanels(),renderAll()},calcGroupPosition=e=>{newX=gridSettings.squareWidth,newW=0,newY=gridSettings.squareHeight,newH=0,e.elements.forEach(e=>{newX=Math.min(newX,e.x),newY=Math.min(newY,e.y),newW=Math.max(newW,e.x+e.w),newH=Math.max(newH,e.y+e.h)}),e.x=newX,e.y=newY,e.w=newW-newX,e.h=newH-newY},hideElement=(e,t)=>{e.classList.toggle("active");const n=selectedElements.find(e=>e.id===t);n.hide=!n.hide,renderAll()},copyElement=e=>{const t=selectedElements.filter(t=>t.id===e);let n;selectedElements===walls&&(n={...t[0],id:generateElementId()}),selectedElements!==winds&&selectedElements!==areas||(n={...t[0],params:{...t[0].params},id:generateElementId()}),selectedElements.push(n),renderAll()},deleteElement=e=>{const t=selectedElements.findIndex(t=>t.id===e);selectedElements.splice(t,1),document.querySelector(`#${selectedPanelTab}-${e}`).remove(),renderAll()},copyLevel=e=>{const t={...JSON.parse(localStorage.getItem("level-"+e)),id:generateLevelId()};localStorage.setItem("level-"+t.id,JSON.stringify(t)),addLevelToPanel(t)},deleteLevel=e=>{selectedLevel.id!==e&&(localStorage.removeItem("level-"+e),panelLevels.querySelector("#level-"+e).remove(),loadLevels())},checkLevelChanges=()=>{},saveLevelChanges=e=>{selectedLevel.id===e&&(localStorage.setItem("level-"+e,JSON.stringify(gameObj)),renderAll())},toggleAreaParams=(e,t)=>{t.classList.toggle("active");const n=getAreaById(e);n.params[t.id]=!n.params[t.id],renderAll()},setSelectedTab=e=>{"settings"===e.id?(selectedElements=null,selectedPanelTab=null):"walls"===e.id?(selectedElements=walls,selectedPanelTab="wall"):"areas"===e.id?(selectedElements=areas,selectedPanelTab="area"):"winds"===e.id?(selectedElements=winds,selectedPanelTab="wind"):"levels"===e.id?selectedPanelTab="level":"groups"===e.id&&(selectedElements=groups,selectedPanelTab="group")},switchPanelTab=()=>{areas.includes(activeElement)&&(document.querySelector("#areas").checked=!0,setSelectedTab({id:"areas"})),walls.includes(activeElement)&&(document.querySelector("#walls").checked=!0,setSelectedTab({id:"walls"})),winds.includes(activeElement)&&(document.querySelector("#winds").checked=!0,setSelectedTab({id:"winds"}))},bumpPanelElement=()=>{if(activeElement){[...document.querySelectorAll(`.game-panel-${selectedPanelTab}s__item`)].forEach(e=>e.remove());const e=selectedElements[0],t=selectedElements.indexOf(activeElement);selectedElements[0]=activeElement,selectedElements[t]=e,renderAll()}},updateWindPanel=e=>{if(!selectedElements)return;const t=document.querySelector(`#wind-${e.id}`);for(let n in e)t.querySelector(`input[name=${n}]`)&&(t.querySelector(`input[name=${n}]`).value=e[n])},updateAreaPanel=e=>{if(!selectedElements)return;const t=document.querySelector(`#area-${e.id}`);for(let n in e)t.querySelector(`input[name=${n}]`)&&(t.querySelector(`input[name=${n}]`).value=e[n])},updateWallPanel=e=>{if(!selectedElements)return;const t=document.querySelector(`#wall-${e.id}`);for(let n in e)t.querySelector(`input[name=${n}]`)&&(t.querySelector(`input[name=${n}]`).value=e[n])},setSelectedPanelItem=e=>{if(null===e)return selectedPanelItem.classList.remove("active"),void(selectedPanelItem=null);selectedPanelItem&&selectedPanelItem.classList.remove("active"),activeElement&&(selectedPanelItem=document.querySelector(`#${selectedPanelTab}-${activeElement.id}`)).classList.add("active")},setSelectedPanelLevel=e=>{const t=panelLevels.querySelector(".game-panel-item.active");t&&t.classList.remove("active"),document.querySelector(`#level-${e}`).classList.add("active")},setSelectedLevel=e=>{setSelectedPanelLevel(e),clearAllPanels(),selectedLevel=getAllLevels().find(t=>t.id===e),loadLevels()},removeSelectedItem=()=>{activeElement=null,renderAll()},setSelectedElement=e=>{activeElement=selectedElements.find(t=>e.id===`${selectedPanelTab}-${t.id}`),setSelectedPanelItem(e),renderAll()},addWallToPanel=e=>{document.querySelector(`#wall-${e.id}`)||panelWalls.insertAdjacentHTML("beforeend",`<div \n        class="game-panel-walls__item game-panel-item"\n        id="wall-${e.id}"\n        onmousedown="setSelectedElement(this)"\n    >\n        <div class="game-panel-item__coords">\n            <span>x:</span>\n            <input name="x" oninput="elementChange(this)" value="${e.x}">\n            <span>y:</span>\n            <input name="y" oninput="elementChange(this)" value="${e.y}">\n        </div>\n        <div class="game-panel-item__size">\n            <span>width:</span>\n            <input oninput="elementChange(this)" name="w" value="${e.w}">\n            <span>height:</span>\n            <input oninput="elementChange(this)" name="h" value="${e.h}">\n        </div>\n        <div class="game-item-panel__params">\n            <span>Group:</span>\n            <select name="group-select" onChange="toggleElementOnGroup(this, ${e.id})">\n            <option></option>\n                ${groups.map(t=>`<option ${t.elements.includes(e)?"selected":""}>${t.id}</option>`)}\n            </select>\n        </div>\n        <button class="game-panel-item__copy" onClick="copyElement(${e.id})">Copy</button>\n        <button class="game-panel-item__bern">\n            bern\n            <div class="game-panel-item__bern-settings">\n                <span class="${e.bern[0]?"active":""}" id="bern" onClick="toggleWallSettings(this, ${e.id}, 0)">↑</span>\n                <div>\n                    <span class="${e.bern[1]?"active":""}" id="bern" onClick="toggleWallSettings(this, ${e.id}, 1)">←</span>\n                    <span class="${e.bern[2]?"active":""}" id="bern" onClick="toggleWallSettings(this, ${e.id}, 2)">→</span>\n                </div>\n                <span class="${e.bern[3]?"active":""}" id="bern" onClick="toggleWallSettings(this, ${e.id}, 3)">↓</span>\n            </div>\n        </button>\n        <button class="game-panel-item__thru">\n            thru\n            <div class="game-panel-item__thru-settings">\n                <span class="${e.thru[0]?"active":""}" id="thru" onClick="toggleWallSettings(this, ${e.id}, 0)">↑</span>\n                <div>\n                    <span class="${e.thru[1]?"active":""}" id="thru" onClick="toggleWallSettings(this, ${e.id}, 1)">←</span>\n                    <span class="${e.thru[2]?"active":""}" id="thru" onClick="toggleWallSettings(this, ${e.id}, 2)">→</span>\n                </div>\n                <span class="${e.thru[3]?"active":""}" id="thru" onClick="toggleWallSettings(this, ${e.id}, 3)">↓</span>\n            </div>\n        </button>\n        <button class="game-panel-item__hide" onClick="hideElement(this, ${e.id})">\n            Toggle hide\n        </button>\n        <button class="game-panel-item__delete" onClick="deleteElement(${e.id})">\n            Delete\n        </button>\n    </div>`)},addAreaToPanel=e=>{document.querySelector(`#area-${e.id}`)||panelAreas.insertAdjacentHTML("beforeend",`<div \n        class="game-panel-areas__item game-panel-item"\n        id="area-${e.id}"\n        onmousedown="setSelectedElement(this)"\n    >\n        <div class="game-panel-item__coords">\n            <span>x:</span>\n            <input name="x" oninput="elementChange(this)" value="${e.x}">\n            <span>y:</span>\n            <input name="y" oninput="elementChange(this)" value="${e.y}">\n        </div>\n        <div class="game-panel-item__size">\n            <span>width:</span>\n            <input oninput="elementChange(this)" name="w" value="${e.w}">\n            <span>height:</span>\n            <input oninput="elementChange(this)" name="h" value="${e.h}">\n        </div>\n        <div class="game-panel-item__params">\n            <button id="x" class="${e.params.x?"active":""}" onClick="toggleAreaParams(${e.id}, this)">\n                X\n            </button>\n            <button id="y" class="${e.params.y?"active":""}" onClick="toggleAreaParams(${e.id}, this)">\n                Y\n            </button>\n            <button class="${e.params.y?"active":""}"\n                onClick="coupArea(this, ${e.id})\n             ">\n                Coup\n            </button>\n            <span>Group:</span>\n            <select name="group-select" onChange="toggleElementOnGroup(this, ${e.id})">\n            <option></option>\n                ${groups.map(t=>`<option ${t.elements.includes(e)?"selected":""}>${t.id}</option>`)}\n            </select>\n        </div>\n        <button class="game-panel-item__copy" onClick="copyElement(${e.id})">Copy</button>\n        <button class="game-panel-item__hide" onClick="hideElement(this, ${e.id})">\n            Toggle hide\n        </button>\n        <button class="game-panel-item__delete" onClick="deleteElement(${e.id})">\n            Delete\n        </button>\n    </div>`)},addWindToPanel=e=>{document.querySelector(`#wind-${e.id}`)||panelWinds.insertAdjacentHTML("beforeend",`<div \n        class="game-panel-winds__item game-panel-item"\n        id="wind-${e.id}"\n        onmousedown="setSelectedElement(this)"\n    >\n        <div class="game-panel-item__coords">\n            <span>x:</span>\n            <input name="x" oninput="elementChange(this)" value="${e.x}">\n            <span>y:</span>\n            <input name="y" oninput="elementChange(this)" value="${e.y}">\n        </div>\n        <div class="game-panel-item__size">\n            <span>width:</span>\n            <input oninput="elementChange(this)" name="w" value="${e.w}">\n            <span>height:</span>\n            <input oninput="elementChange(this)" name="h" value="${e.h}">\n        </div>\n        <div class="game-panel-item__params">\n            <span>X:</span>\n            <input oninput="elementChange(this)" name="X" value="${e.params.X}">\n            <span>Y:</span>\n            <input oninput="elementChange(this)" name="Y" value="${e.params.Y}">\n            <span>Forse:</span>\n            <input oninput="elementChange(this)" name="forse" value="${e.params.forse}">\n            <span>Group:</span>\n            <select name="group-select" onChange="toggleElementOnGroup(this, ${e.id})">\n            <option></option>\n                ${groups.map(t=>`<option ${t.elements.includes(e)?"selected":""}>${t.id}</option>`)}\n            </select>\n        </div>\n        <button class="game-panel-item__copy" onClick="copyElement(${e.id})">Copy</button>\n        <button class="game-panel-item__hide" onClick="hideElement(this, ${e.id})">\n            Toggle hide\n        </button>\n        <button class="game-panel-item__delete" onClick="deleteElement(${e.id})">\n            Delete\n        </button>\n    </div>`)},addLevelToPanel=e=>{document.querySelector(`#level-${e.id}`)||panelLevels.insertAdjacentHTML("beforeend",`<div \n            class="game-panel-levels__item game-panel-item ${selectedLevel.id===e.id?"active":""}"\n            id="level-${e.id}"\n        >\n            <div>${e.id}</div>\n            <button class="game-panel-item__save" onClick="saveLevelChanges(${e.id})">\n                Save\n            </button>\n            <button onmousedown="setSelectedLevel(${e.id})" class="game-panel-item__save">\n                Zagruzit'\n            </button>\n            <button class="game-panel-item__copy" onClick="copyLevel(${e.id})">\n                Copy\n            </button>\n            <button class="game-panel-item__delete" onClick="deleteLevel(${e.id})">\n                Delete\n            </button>\n            <button class="game-panel-item__export" onClick="exportLevel(${e.id})">\n                Export \n            </button>\n        </div>`)},addGroupToPanel=e=>{document.querySelector(`#group-${e.id}`)||panelGroups.insertAdjacentHTML("beforeend",`<div \n            class="game-panel-groups__item game-panel-item"\n            id="group-${e.id}"\n            onmousedown="setSelectedElement(this)"\n        >\n            <input name="id" value="${e.id}">\n            <button class="game-panel-item__group ${e.toggle?"active":""}">\n                Toggle group\n            </button>\n            <button class="game-panel-item__delete">\n                Delete\n            </button>\n        </div>`)},coupArea=(e,t)=>{e.classList.toggle("active");const n=getAreaById(t);n.params.coup=!n.params.coup,renderAll()},changeAreaColor=e=>{let t=220,n=220,l=220;!e.params.x||(t-=120),!e.params.y||(l-=120),!e.params.coup||(n-=150),e.color=`rgba(${t},${n},${l}, 0.3)`},toggleWallSettings=(e,t,n)=>{e.classList.toggle("active");const l=getWallById(t);l[e.id][n]=Number(!l[e.id][n]),renderAll()},drawWallSides=e=>{let t=xCoordsToPixels(e.x),n=yCoordsToPixels(e.y),l=xCoordsToPixels(e.w),a=yCoordsToPixels(e.h);thruWidth=2,ctx.beginPath(),e.bern[0]&&ctx.rect(t,n-2,l,4),e.bern[1]&&ctx.rect(t-2,n,4,a),e.bern[2]&&ctx.rect(t+l-2,n,4,a),e.bern[3]&&ctx.rect(t,n+a-2,l,4),ctx.fillStyle="#ffc012",ctx.fill(),ctx.closePath(),ctx.beginPath(),e.thru[0]&&ctx.rect(t,n-1,l,thruWidth),e.thru[1]&&ctx.rect(t-1,n,thruWidth,a),e.thru[2]&&ctx.rect(t+l-1,n,thruWidth,a),e.thru[3]&&ctx.rect(t,n+a-1,l,thruWidth),ctx.fillStyle="#a6aaad",ctx.fill(),ctx.closePath()},renderGrid=()=>{ctx.beginPath();const e=canvas.width,t=canvas.height,n=e/gridSettings.squareWidth,l=t/gridSettings.squareHeight;ctx.strokeStyle="#bdbdbd",ctx.lineWidth=.1;for(var a=n;a<e;a+=n)ctx.strokeRect(a,0,.1,t);for(var i=l;i<t;i+=l)ctx.strokeRect(0,i,e,.1);ctx.fill(),ctx.closePath()},loadLevels=()=>{if(!(gameObj=JSON.parse(localStorage.getItem(`level-${selectedLevel.id}`))))return;walls=gameObj.walls,areas=gameObj.areas,winds=gameObj.winds,groups=gameObj.groups,getAllLevels().sort((e,t)=>e.id-t.id).forEach(e=>addLevelToPanel(e)),renderAll()},drawElement=e=>{!showAllElementsCheckbox.checked&&e.hide||(ctx.beginPath(),ctx.rect(xCoordsToPixels(e.x),yCoordsToPixels(e.y),xCoordsToPixels(e.w),yCoordsToPixels(e.h)),e===activeElement&&e.color&&(ctx.strokeStyle="red",ctx.lineWidth=3,ctx.stroke()),ctx.fillStyle=e.color||"black",e!==activeElement||e.color||(ctx.fillStyle="#2c8fdb"),ctx.fill(),ctx.closePath())},renderAll=()=>{ctx.clearRect(0,0,canvas.width,canvas.height),gridCheckbox.checked&&renderGrid(),hideAreasCheckbox.checked||areas.forEach(e=>{changeAreaColor(e),addAreaToPanel(e),updateAreaPanel(e),drawElement(e)}),hideWindsCheckbox.checked||winds.forEach(e=>{addWindToPanel(e),updateWindPanel(e),drawElement(e)}),hideWallsCheckbox.checked||walls.forEach(e=>{addWallToPanel(e),updateWallPanel(e),drawElement(e),drawWallSides(e)}),groups.forEach(e=>{addGroupToPanel(e),calcGroupPosition(e),e===activeElement&&(ctx.rect(xCoordsToPixels(e.x),yCoordsToPixels(e.y),xCoordsToPixels(e.w),yCoordsToPixels(e.h)),ctx.strokeStyle="red",ctx.lineWidth=3,ctx.stroke())})};loadLevels(),renderAll();const elementChange=e=>{console.log(activeElement),activeElement[e.name]=+e.value,renderAll()},createWall=()=>{const e={x:canvasHeightInSquares/2,y:canvasWidthInSquares/2,w:1,h:15,id:generateElementId(),bern:[0,0,0,0],thru:[0,0,0,0]};selectedElements.push(e),renderAll()},createArea=()=>{const e={x:canvasHeightInSquares/2,y:canvasWidthInSquares/2,w:15,h:15,id:generateElementId(),params:{}};selectedElements.push(e),renderAll()},createWind=()=>{const e={x:canvasHeightInSquares/2,y:canvasWidthInSquares/2,w:15,h:15,id:generateElementId(),params:{X:0,Y:0,forse:0},color:"rgba(0,255,255,0.3)"};selectedElements.push(e),renderAll()},createGroup=()=>{const e={id:generateElementId(),elements:[]};clearAllPanels(),selectedElements.push(e),renderAll()},createLevel=()=>{newLevel={id:generateLevelId(),walls:[],areas:[],winds:[],groups:[]},localStorage.setItem(`level-${newLevel.id}`,JSON.stringify(newLevel)),addLevelToPanel(newLevel)},takeDraggableElement=e=>{xStartFoDrug=e.clientX-canvas.offsetTop,yStartFoDrug=e.clientY-canvas.offsetLeft,activeElement=null,renderAll();let t=selectedElements;if(switchTabCheckbox.checked&&(t=[...walls,...areas,...winds]),t){for(let e=0;e<t.length;e++){if(t[e].hide)continue;const n=xCoordsToPixels(t[e].x)-window.pageXOffset,l=n+xCoordsToPixels(t[e].w),a=yCoordsToPixels(t[e].y)-window.pageYOffset,i=a+yCoordsToPixels(t[e].h);if(xStartFoDrug>n&&xStartFoDrug<l&&yStartFoDrug>a&&yStartFoDrug<i){if(t[e].elements){draggableElement=t[e].elements,activeElement=t[e],t[e].elements.forEach(e=>{e.xStatr=e.x,e.yStatr=e.y});break}activeElement=t[e],draggableElement=[t[e]],t[e].xStatr=t[e].x,t[e].yStatr=t[e].y;break}}switchTabCheckbox.checked&&(areas.includes(activeElement)&&(document.querySelector("#areas").checked=!0,setSelectedTab({id:"areas"})),walls.includes(activeElement)&&(document.querySelector("#walls").checked=!0,setSelectedTab({id:"walls"})),winds.includes(activeElement)&&(document.querySelector("#winds").checked=!0,setSelectedTab({id:"winds"}))),bumpElementCheckbox.checked&&bumpPanelElement(),setSelectedPanelItem(),!activeElement&&selectedPanelItem&&setSelectedPanelItem(null),renderAll()}};function xPixelsToCoords(e){return Math.round(e/getXPixelRatio)}function yPixelsToCoords(e){return Math.round(e/getYPixelRatio)}const dragElement=e=>{const t=e.clientX-canvas.offsetTop,n=e.clientY-canvas.offsetLeft;draggableElement&&(console.log(draggableElement),draggableElement.forEach(e=>{let l=xPixelsToCoords(t-xStartFoDrug),a=yPixelsToCoords(n-yStartFoDrug);const i=canvasWidthInSquares-e.w,s=canvasHeightInSquares-e.h;e.x=Math.min(e.xStatr+l,i),e.y=Math.min(e.yStatr+a,s),e.x=Math.max(e.x,0),e.y=Math.max(e.y,0)}),renderAll())},dragElementOnKey=e=>{let t=activeElement;if(t){let n=t.w>t.h?"w":"h";switch(e.code){case"KeyD":case"ArrowRight":t.x+t.w<canvasWidthInSquares?t.x+=1:t.x=canvasWidthInSquares-t.w;break;case"KeyA":case"ArrowLeft":0<t.x&&(t.x-=1);break;case"KeyS":case"ArrowDown":t.y+1+t.h<canvasHeightInSquares?t.y+=1:t.y=canvasHeightInSquares-t.h;break;case"KeyW":case"ArrowUp":0<t.y&&(t.y-=1);break;case"KeyQ":t[n]>10&&(t[n]-=1);break;case"KeyE":t[n]+=1}}renderAll()},dropDraggableElement=()=>{draggableElement&&(delete draggableElement.xStatr,delete draggableElement.yStatr,draggableElement=null)};canvas.addEventListener("mousedown",takeDraggableElement),canvas.addEventListener("mousemove",dragElement),document.addEventListener("keydown",dragElementOnKey),document.addEventListener("mouseup",dropDraggableElement);