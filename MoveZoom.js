/**
  * @projectDescription	MoveZoom javascript object
  * @author Raphael Semeteys raphael@semeteys.org
  * @version 0.1 
  *
  * This program is free software; you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation; either version 2 of the License, or
  * (at your option) any later version.
  *
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  *
  * You should have received a copy of the GNU General Public License
  * along with this program; if not, write to the Free Software
  * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
  *
  * Todo: 
  *  - support second image in high resolution
  */
 
 /**
  * MoveZoom object
  * @classDescription MoveZoom javascript object
  * @author Raphael Semeteys raphael@semeteys.org
  */
var MoveZoom = {};

/**
 * Selection frame width in px (default value: 100)
 * @memberOf MoveZoom
 */
MoveZoom.width = 100;
/**
 * Selection frame height in px (default value: 100)
 * @memberOf MoveZoom
 */
MoveZoom.height = 100;

/**
 * Initialize two DIV elements for zooming
 * @memberOf MoveZoom
 * @param {String} imageId Id of IMG element to become zoomable
 * @param {Integer} zoom Zoom ratio
 */
MoveZoom.init = function(imageId, zoom){
	MoveZoom.imageId = imageId;
    MoveZoom.zoom = zoom;
    MoveZoom.mousex = 0;
    MoveZoom.mousey = 0;
    
    MoveZoom.image = document.getElementById(imageId);
    
    //Frame to be moved on the image by the user
    MoveZoom.zoomFrame = document.createElement("div");
    MoveZoom.zoomFrame.style.width = MoveZoom.width.toString(10) + "px";
    MoveZoom.zoomFrame.style.height = MoveZoom.height.toString(10) + "px";
    MoveZoom.zoomFrame.style.zIndex = 100;
    MoveZoom.zoomFrame.style.borderStyle = "inset";
    MoveZoom.zoomFrame.style.borderWidth = "2px";
    MoveZoom.zoomFrame.style.position = "absolute";
    MoveZoom.zoomFrame.style.float = "none";
    MoveZoom.zoomFrame.style.visibility = "hidden";
    MoveZoom.image.parentNode.insertBefore(MoveZoom.zoomFrame, MoveZoom.image);
	
    //Frame to show zoomed image
    MoveZoom.detailFrame = document.createElement("div");
	MoveZoom.detailFrame.id = "_MoveZoom_detailFrame";
    MoveZoom.detailFrame.style.width = (MoveZoom.width * MoveZoom.zoom) + "px";
    MoveZoom.detailFrame.style.height = (MoveZoom.height * MoveZoom.zoom).toFixed() + "px";
    MoveZoom.detailFrame.style.left = (MoveZoom.image.offsetLeft + MoveZoom.image.width + 5).toFixed() + "px";
    MoveZoom.detailFrame.style.top = MoveZoom.image.offsetTop + "px";
    MoveZoom.detailFrame.style.zIndex = 100;
    MoveZoom.detailFrame.style.borderStyle = "double";
    MoveZoom.detailFrame.style.borderWidth = "3px";
    MoveZoom.detailFrame.style.position = "absolute";
    MoveZoom.detailFrame.style.overflow = "hidden";
    MoveZoom.detailFrame.style.float = "none";
    MoveZoom.detailFrame.style.visibility = "hidden";
    MoveZoom.detailFrame.image = MoveZoom.image.cloneNode(false);
    MoveZoom.detailFrame.image.style.position = "relative";
    MoveZoom.detailFrame.image.style.width = (parseInt(MoveZoom.image.width) * MoveZoom.zoom).toFixed() + "px";
    MoveZoom.detailFrame.image.style.height = (parseInt(MoveZoom.image.height) * MoveZoom.zoom).toFixed() + "px";
    MoveZoom.detailFrame.insertBefore(MoveZoom.detailFrame.image, MoveZoom.detailFrame.lastChild);
    MoveZoom.zoomFrame.parentNode.insertBefore(MoveZoom.detailFrame, MoveZoom.zoomFrame);
	
	document.onmouseover = MoveZoom.showFrames;
    document.onmousemove = MoveZoom.moveFrame;
    document.onclick = MoveZoom.hideFrames;
}

/**
 * Get mouse's coordinates
 * @memberOf MoveZoom
 * @param {Event} e Mouse event
 * @return {String} Id of the event's target
 */
MoveZoom.getMouseXY = function(e){
    if (!e) e = window.event;
    
    if (e) {
        if (e.pageX || e.pageY) {
            MoveZoom.mousex = e.pageX;
            MoveZoom.mousey = e.pageY;
        }
        else 
            if (e.clientX || e.clientY) {
                MoveZoom.mousex = e.clientX + document.body.scrollLeft;
                MoveZoom.mousey = e.clientY + document.body.scrollTop;
            }
    }
	
	if (e.target) target = e.target;
    else if (e.srcElement) target = e.srcElement;
	
	return target.id;
}

/**
 * Show zoom frames (DIV elements)
 * @memberOf MoveZoom
 * @param {Event} e Mouse event
 */
MoveZoom.showFrames = function(e){
	if (MoveZoom.getMouseXY(e) == MoveZoom.imageId) {
		MoveZoom.zoomFrame.style.visibility = "visible";
    	MoveZoom.detailFrame.style.visibility = "visible";
	}
}

/**
 * Hide zoom frames (DIV elements)
 * @memberOf MoveZoom
 * @param {Event} e Mouse event
 */
MoveZoom.hideFrames = function(e){
	if (MoveZoom.getMouseXY(e) == MoveZoom.imageId || MoveZoom.getMouseXY(e) == "_MoveZoom_detailFrame") {
		MoveZoom.zoomFrame.style.visibility = "hidden";
		MoveZoom.detailFrame.style.visibility = "hidden";
	}
}

/**
 * Move selection frame
 * @memberOf MoveZoom
 * @param {Event} e Mouse event
 */
MoveZoom.moveFrame = function(e){
    if (MoveZoom.getMouseXY(e) == MoveZoom.imageId) {
		var newx;
		var newy;
		
		if ((MoveZoom.mousex - MoveZoom.image.offsetLeft) < MoveZoom.width) 
			newx = MoveZoom.image.offsetLeft;
		else 
			if ((MoveZoom.image.offsetLeft + MoveZoom.image.width - MoveZoom.mousex) < (MoveZoom.width / 2)) 
				newx = MoveZoom.image.offsetLeft + MoveZoom.image.width - MoveZoom.width;
			else 
				newx = MoveZoom.mousex - (MoveZoom.width / 2);
		
		if ((MoveZoom.mousey - MoveZoom.image.offsetTop) < MoveZoom.height) 
			newy = MoveZoom.image.offsetTop;
		else 
			if ((MoveZoom.image.offsetTop + MoveZoom.image.height - MoveZoom.mousey) < (MoveZoom.height / 2)) 
				newy = MoveZoom.image.offsetTop + MoveZoom.image.height - MoveZoom.height;
			else 
				newy = MoveZoom.mousey - (MoveZoom.height / 2);
		
		MoveZoom.zoomFrame.style.left = newx.toString(10) + "px";
		MoveZoom.zoomFrame.style.top = newy.toString(10) + "px";
		
		MoveZoom.detailFrame.image.style.left = ((newx - MoveZoom.image.offsetLeft) * MoveZoom.zoom * -1).toFixed() + "px";
		MoveZoom.detailFrame.image.style.top = ((newy - MoveZoom.image.offsetTop) * MoveZoom.zoom * -1).toFixed() + "px";
	}
}

