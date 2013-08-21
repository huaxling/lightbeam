(function(global){

var tooltipTimer;
var tooltip;

// for Clock view
function showTooltip(event){
    if (!tooltip){
        tooltip = document.getElementById('tooltip');
    }
    tooltip.style.left = '-1000px';
    tooltip.style.display = 'inline-block';
    // console.error(event, event.target, event.target.dataset);
    tooltip.innerHTML = event.target.getAttribute(["data-name"]);
    var rect = event.target.querySelector(":last-child").getClientRects()[0];
    var tooltipWidth = tooltip.offsetWidth;
    tooltip.style.top = (rect.top - 40) + 'px';
    tooltip.style.left = (rect.left + (rect.width / 2) - (tooltipWidth / 2)) + 'px';
    setTooltipTimeout();
    return false;
}

// for Graph view
function d3ShowTooltip(node, idx){
    if (!tooltip){
        tooltip = document.getElementById('tooltip');
    }
    tooltip.style.left = '-1000px';
    tooltip.style.display = 'inline-block';
    // console.error(event, event.target, event.target.dataset);
    tooltip.innerHTML = node.name;
    var shapeNode = this.querySelector(".site") || this.querySelector("[data-name]"); // look for "site"(circle) node or "tracker(triangle)" node
    var rect = shapeNode.getClientRects()[0];
    var tooltipWidth = tooltip.offsetWidth;
    tooltip.style.top = (rect.top - 40) + 'px';
    tooltip.style.left = (rect.left + (rect.width / 2) - (tooltipWidth / 2)) + 'px';
    return false;
}




function setTooltipTimeout(){
    if (tooltipTimer){
        clearTimeout(tooltipTimer);
    }
    tooltipTimer = setTimeout(timeoutTooltip, 2000);
}

function timeoutTooltip(){
    tooltip.style.display = 'none';
    tooltip.timer = null;
}

function hideTooltip(){
    timeoutTooltip();
    return false;
}

function add(node){
    node.addEventListener('mouseenter', showTooltip, false);
    node.addEventListener('mouseleave', hideTooltip, false);
}

function remove(node){
    node.removeEventListener('mouseenter', showTooltip);
    node.removeEventListener('mouseleave', hideTooltip);
}


global.tooltip = {
    add: add,
    remove: remove,
    show: d3ShowTooltip,
    hide: hideTooltip
};

})(this);

