/**
* Constructor function of Enemy object
* @param {number} x - position on x-axis
* @param {number} y - position on y-axis
* @param {number} speed - random speed 
* @param {number} startPos - random start position on x-axis
*/
function Enemy(x, y, startPos, speed) {
    // properties to determine enemy x-y coordinates
	this.x = x;
	this.y = y;
	
	// property to set random speed parameter between 75 and < 250
	this.speed = (Math.random() * (250 - 75) + 75);
	
	// property to set random x-axis start position between > -350 and -100
	this.startPos = (Math.random() * (-350 + 100) - 100);
	
   	//property to specify enemy figure image
    this.sprite = 'images/enemy-bug.png';
};

/**
* Method to update enemy's position
* @param {number} dt - a time delta between ticks, to multiply
* every movement which will ensure the game runs at the same speed for
* all computers
*/
Enemy.prototype.update = function(dt) {
	// Statement to update enemy position
	if (this.x < 510) {
		this.x += this.speed * dt;
	// Statement for enemies beyond the game-field 
	//to set new random start position and new random speed
	} else {
		this.x = this.startPos;
		this.speed = (Math.random() * (250 - 75) + 75);
	}
	
	//Statements to check collision. Check :
	    //if the enemy and player are on the same line
	if (this.y + 5 === player.y &&
	    // and if the enemy (80 = his length) collides with player from the front
		this.x + 80 > player.x &&  
		// and if the enemy is not behind player (65 = player's width)
		this.x < player.x + 65) {
			// then it is collision and reset player's position
			player.x = 202;
			player.y = 400;
	}
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
const allEnemies = [ new Enemy(this.startPos, 63, this.speed),
				     new Enemy(this.startPos, 146, this.speed),
				     new Enemy(this.startPos, 229, this.speed),
				     new Enemy(this.startPos, 312, this.speed)];

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
