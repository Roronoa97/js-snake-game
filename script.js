var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');

document.addEventListener('keydown', keypush);

setInterval(game, 1000/10);

var xv = 0, yv = 0; //x-velocity && y-velocity
var px = 10, py = 10; //player position
var gs = 20, tc = 20; //gs - grid size , tc - tile count
var ax = 15, ay = 15; //food position

trail = [];
tails = 5;

function game(){
    px += xv;
    py += yv;

    if(px < 0){
        px = tc -1;
    }
    if(px > tc -1){
        px = 0;
    }
    if(py < 0){
        py = tc -1;
    }
    if(py > tc -1){
        py = 0;
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, cvs.clientWidth, cvs.height);

    ctx.fillStyle = 'white';
    for(var i = 0; i < trail.length; i++){
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs-2, gs-2);

        //collide
        if(trail[i].x == px && trail[i].y == py){
            tails = 5;
        }
    }
    trail.push({x:px, y:py});
    while(trail.length > tails){
        trail.shift();
    }

    if(ax == px && ay == py){
        tails++;
        ax = Math.floor(Math.random()*tc);
        ay = Math.floor(Math.random()*tc);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);
}
function keypush(e){
    switch(e.keyCode){
        //left
        case 37:
            xv = -1;
            yv = 0;
            break;
        //up
        case 38:
            xv = 0;
            yv = -1;
            break;
        //right
        case 39:
            xv = 1;
            yv = 0;
            break;
        //down
        case 40:
            xv = 0;
            yv = 1;
            break;
    }
}
