var glb = {}
glb.x = 1 // example


var canvas = document.getElementById("canvas");
window.addEventListener("resize", this.resize, false);
var w = canvas.width;
var h = canvas.height;
var ctx = canvas.getContext("2d");
var pause = false;
var restart = true;
canvas.addEventListener('click', function() {
  //pause = !pause;
  restart = true;
}, false);


function resize() {
  console.log("resize " + w + " " + h);        
  canvas.width  = window.innerWidth;
  w = canvas.width;
  canvas.height = window.innerHeight;
  h = window.innerHeight
}

this.gui = new dat.GUI();
this.gui.add(glb, "x", 1)





// udpate loop program
var fps = 0;
var fps_cntr = 0;
var last_fps_time = 0;
var last_drw_time = 0;
var total_draw_time_ms = 0;

let stand = 0

function draw(ctx, d_time_ms) {

  // draw background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, w, h);

  // draw walking test square
  ctx.fillStyle = '#00FF00';
  ctx.fillRect(stand, 0, 4, 4);
  stand += 1;
  if (stand > w) stand = 0;

  // heartbeat
  ctx.fillStyle = '#FFFFFF';

  let s_w = 0.5 * w 

  let size =  s_w * (0.25 + 0.15 * Math.sin(0.001*total_draw_time_ms)) 

  ctx.fillRect(w/2 - size/2, h/2 - size/2, size, size);

}



function drawAndUpdate(cur_time) {
  d_time_ms = cur_time - last_drw_time

  if (last_fps_time == 0) {
    last_fps_time = cur_time; // first round
    last_drw_time = cur_time;
  }
  if (restart) {
  	// if needed start code here
    restart = false;
    total_time = 0;
  }
  if (d_time_ms > 1000) {
    fps = fps_cntr;
    fps_cntr = 1;
    last_fps_time = cur_time;
  } else {
    fps_cntr += 1;
  }

  // draw FPS
  ctx.fillStyle = '#ffffff';
  ctx.font = "10px Arial";
  ctx.fillText("fps : " + fps, 10, 10);

  // update 
  if (pause) {
    d_time_ms = 0
  }
  total_draw_time_ms += d_time_ms
  draw(ctx, d_time_ms )
  
  last_drw_time = cur_time;
  requestAnimationFrame(drawAndUpdate);
}



resize();

// start the whole thing up
requestAnimationFrame(drawAndUpdate);


    
    