/**
* Constructor function of Enemy object
*/
function Enemy(x, y) {
    // properties to determine enemy x-y coordinates
	this.x = x;
	this.y = y;
   	//property to specify enemy figure image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
* Constructor function of Player object 
*/
function Player(x, y) {
	// properties to determine player's x-y coordinates  
	this.x = x;
	this.y = y;
	//property to specify player's figure image
	this.sprite = "images/char-boy.png";
};

/**
*
*/
Player.prototype.update = function update() {
	
};

/**
* Method to draw player's figure on the screen
*/
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** 
* Method to control player's figure by keyboard, within game field
* @param {string} pressedKey - name of pressed key, defined in allowedKeys array
*/
Player.prototype.handleInput = function(pressedKey) {
	//Statements to check pressed key and adequate
	// to player's moving direction, "game field" borders
	// In effect - to change proper x,y coordinates
	if (pressedKey === "left" && this.x > 0) {
		this.x -= 101;
	} else if (pressedKey === "up" && this.y > 0) {
		this.y -= 83;
	} else if (pressedKey === "right" && this.x < 400) {
		this.x += 101;
	} else if (pressedKey === "down" && this.y < 400) {
		this.y += 83;
	} else	{
		
	}
};

// Variable to place the enemy objects in starting positions
const allEnemies = [ new Enemy(-6, 63),
				     new Enemy(-6, 146),
				     new Enemy(-6, 229),
				     new Enemy(-6, 312)];

// Variable to place the player object in a starting position
const player = new Player(202, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
	console.log(typeof allowedKeys[e.keyCode]);

    player.handleInput(allowedKeys[e.keyCode]);
});
