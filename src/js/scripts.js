/*!
 * fireshell
 * Fiercely quick and opinionated front-ends
 * http://getfireshell.com
 * @author Todd Motto
 * @version 1.0.0
 * Copyright 2013. MIT licensed.
 */
(function ($, window, document, undefined) {

'use strict';



  canvasBackground();

  function canvasBackground() {
  //Initializing the canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  //Canvas dimensions
  var W = window.innerWidth; var H = window.innerHeight;



  //Array of 9 particles
  var particles = [];
  for(var i = 0; i < 200; i++)
  {
    particles.push(new create_particle());
  }

  function create_particle()
  {
    //Random position on the canvas
    this.x = Math.random()*W;
    this.y = Math.random()*H;

    //Lets add random velocity to each particle
    this.vx = Math.random() * (2 - .1) + .1;;
    this.vy = Math.random() * (2 - .1) + .1;;

    this.color = "rgb(255,255,255)";

    //Random size
    this.radius = Math.random()*1+1;
  }
  var x = 40; var y = 40;

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      setInterval(draw, 80);
  }
  resizeCanvas();

  function draw()
  {

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, W, H);
    DrawAndAnimateParticles();
  }

  function DrawAndAnimateParticles() {

    for(var t = 0; t < particles.length; t++)
    {
      var p = particles[t];

      ctx.beginPath();

      //some colors?
      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, "rgba(255,255,255,0.2)");
      gradient.addColorStop(0.9, "rgba(255,255,255,0.1)");
      gradient.addColorStop(1, "rgba(0,0,0,0.5)");

      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
      ctx.fill();

      //velocity
      p.x += p.vx;
      p.y += p.vy;

      //To prevent the balls from moving out of the canvas
      if(p.x < -50) p.x = W+50;
      if(p.y < -50) p.y = H+50;
      if(p.x > W+50) p.x = -50;
      if(p.y > H+50) p.y = -50;
    }
  }
  }


})(jQuery, window, document);
