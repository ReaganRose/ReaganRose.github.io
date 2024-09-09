// setup variables
const walkAcceleration = 2.5; // how much is added to the speed each frame
const gravity = 0.5; // how much is subtracted from speedY each frame
const friction = 1.5; // how much the player is slowed each frame
const maxSpeed = 8; // maximum horizontal speed, not vertical
const playerJumpStrength = 12; // this is subtracted from the speedY each jump
const projectileSpeed = 8; // the speed of projectiles

/////////////////////////////////////////////////
//////////ONLY CHANGE ABOVE THIS POINT///////////
/////////////////////////////////////////////////

// Base game variables
const frameRate = 60;
const playerScale = 0.8; //makes the player just a bit smaller. Doesn't affect the hitbox, just the image

// Player variables
const player = {
  x: 50,
  y: 100,
  speedX: 0,
  speedY: 0,
  width: undefined,
  height: undefined,
  onGround: false,
  facingRight: true,
  deadAndDeathAnimationDone: false,
};

let hitDx;
let hitDy;
let hitBoxWidth = 50 * playerScale;
let hitBoxHeight = 105 * playerScale;
let firstTimeSetup = true;

const keyPress = {
  any: false,
  up: false,
  left: false,
  down: false,
  right: false,
  space: false,
};

// Player animation variables
const animationTypes = {
  duck: "duck",
  flyingJump: "flying-jump",
  frontDeath: "front-death",
  frontIdle: "front-idle",
  jump: "jump",
  lazer: "lazer",
  run: "run",
  stop: "stop",
  walk: "walk",
};
let currentAnimationType = animationTypes.run;
let frameIndex = 0;
let jumpTimer = 0;
let duckTimer = 0;
let DUCK_COUNTER_IDLE_VALUE = 14;
let debugVar = false;

let spriteHeight = 0;
let spriteWidth = 0;
let spriteX = 0;
let spriteY = 0;
let offsetX = 0;
let offsetY = 0;

// Platform, cannon, projectile, and collectable variables
let platforms = [];
let cannons = [];
const cannonWidth = 118;
const cannonHeight = 80;
let projectiles = [];
const defaultProjectileWidth = 24;
const defaultProjectileHeight = defaultProjectileWidth;
const collectableWidth = 40;
const collectableHeight = 40;
let collectables = [];

// canvas and context variables; must be initialized later
let canvas;
let ctx;

// setup function variable
let setup;

let halleImage;
let animationDetails = {};

var collectableList = {
  database: { image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJ1JREFUWEftlssNgCAQRKFH7zZhGTbhnR41HEgMEphZMHAYC3Aeb4ePd5M/PznfCUAGrAbuvLzbcRX7HM69msECfIJ7QRiAZniCYWygAHB4DaI0DgSADmcglgcwrx610DIgABmIXTJbKB1I+VnQKuESACYIZPXxx4iBtKXhUfxxF8AQTDhr4H3zTnsPDH9EMx0YHt4zgmEwMiADMvAAJ3lEIWKgbcsAAAAASUVORK5CYII=" },
  diamond: { image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAPlJREFUWEftlr0RwjAMRpNx6BmAjgFgEArGoGAQGIAuA9AzTjgdJ85xLH+ScGI4kjanvKefWG6byk9bmd8sAr9XgdV630tz87hfzAmpA3LgWMgiAgUsYI9IVuATOMugaogCJeAaiaRASTiSmEXgvBn+ONvT9c0dCUyRfViF23HX/6dA2IZZKyCBuS2TzEA8dIfuhUmdCSMBGhIO0NwVYhjFSPFZAQLngmMZBltkoQANR+o3tGSZqxoUoOBQwpOldVUPZoDbwB+xlBfNi7SUvnMZcTYljmX3Oi4hgeDEgDcij4gGLJ6EaJiqXUqRmPe9ugVeAIpbBKpX4An7RoAh7ZceewAAAABJRU5ErkJggg==" },
  grace: { image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAP9JREFUWEftls0NwjAMhekoLNAROLMIQzABQ7AIZ0ZgAUahCpIl1/J/HCGk9NY2jT8/+zldDj++Fin+43L6tHfn+1NcU8FuAkCQUSBqdqACzrQaxJR3NAQLQOvPQVT1hwqA6y9B9IK4mxD3wXo9fm9ft/fOCJn+6AKogHC5QMoYnmOQqAohAC5jzzDSoNw2lFTwAGjDzA0QCaStpWqYAG0zzYIZMAxRBoAbEkNRq9K54QKwVJCCA4gG4QaAzWg5rOASBJRhAvy/Aq3GVh+UNqHkiOE2xN7uHUzhQcRNuyxEahRbv+7eccydimEXZNToOo692WXXlSiQDd6+mwBTgQ3JjpYhSL/KSAAAAABJRU5ErkJggg==" },
  kennedi: { image: "images/collectables/kennedi-head.png" },
  max: { image: "images/collectables/max-head.png" },
  steve: { image: "images/collectables/steve-head.png" },
};
