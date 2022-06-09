(function (){
	if ("scAssmntMgr" in window){
		scAssmntMgr.xGmcqInitMarker = function(pElt, pMgr){}
	}
	/* ajout label derrière inputs des choiceList pour stylage*/
	try{
		var vInputs=scPaLib.findNodes("des:.choiceList_in/des:input");
		for (i = 0; i < vInputs.length; i++) {
			var vLabel = document.createElement("label");
			vLabel.setAttribute("for", vInputs[i].id);
			vInputs[i].parentNode.appendChild(vLabel);
		}
	}catch(e){}
	/* Init text input resizing */
	try{
		var vGaps = scPaLib.findNodes("des:input.gapInput|input.exoInput");
		for (var i=0; i<vGaps.length; i++) {
			var vGap = vGaps[i];
			vGap.fSizeSpan = scDynUiMgr.addElement("span", vGap.parentNode, "gapSize", null, {visibility:"hidden", position:"absolute", left:"-10000px", top:"-10000px"});
			vGap.fWidth = 10 * Math.min(Math.max(2, vGap.getAttribute("size")), vGap.className.indexOf("proportional")>=0 ? 30 : (vGap.className.indexOf("exoInput") >=0 ? 20 : 15));
			function resizeForText(vText, vGap) {
				vGap.fSizeSpan.textContent = vText;
				vGap.style.width = Math.max(vGap.fSizeSpan.clientWidth, vGap.fWidth) + "px";
			}
			vGap.addEventListener("keypress", function(pEvt){
				pEvt = pEvt || window.event;
				if (pEvt.which && pEvt.charCode) {
					var c = String.fromCharCode(pEvt.keyCode | pEvt.charCode);
					resizeForText(this.value + c, this);
				}
			}, false);
			vGap.addEventListener("keyup", function(pEvt){
				pEvt = pEvt || window.event;
				if (pEvt.keyCode === 8 || pEvt.keyCode === 46 || pEvt.keyCode === 17) { //backspace, delete, ctrl
					resizeForText(this.value, this);
				}
			}, false);
			resizeForText(vGap.value, vGap);
		}
	}catch(e){}
})();

