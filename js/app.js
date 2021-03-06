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
	
	// property to set random speed parameter between 100 and < 400
	this.speed = (Math.random() * (400 - 100) + 100);
	
	// property to set random x-axis start position between > -250 and -100
	this.startPos = (Math.random() * (-250 + 100) - 100);
	
   	//property to specify enemy figure image
    this.sprite = 'images/enemy-bug.png';
}

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
		this.speed = (Math.random() * (400 -100) + 100);
	}
	
	//Statements to check collision. Check:
	    //if the enemy and player are on the same line
	if (this.y + 5 === player.y &&
	    // and if the enemy (80 = his length) collides with player from the front
		this.x + 80 > player.x &&  
		// and if the enemy is not behind player (65 = player's width)
		this.x < player.x + 65) {
			// then it is collision and restart player's position, stage and character
			restart();
	}
};

/**
* Method to reset player's position
*/
Player.prototype.resetPos = function() {
			this.x = 202;
			this.y = 400;	
};
	
/**
* Method to draw the enemy on the screen
*/
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
	//property to specify player's stage
	this.stage = 0;
	//property to store all available characters
	this.playerChar = ["images/char-boy.png",
		               "images/char-cat-girl.png",
		               "images/char-horn-girl.png",
		               "images/char-pink-girl.png",
		               "images/char-princess-girl.png"];
	// property to specify player's character
	this.sprite = "images/char-boy.png";
}

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
		// Statement which check if water is reached
		// If true then reset player's position with time delay
		if (this.y < 0) {
			setTimeout(() => {
				showStage();
				player.stage++; //increment stage counter
				//Statement to check current stage and show proper popup
				if (player.stage > 4) {
					modalEnd();
				} else {
					modalWin();
				}
			}, 300);
		}
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
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
* Function shows popup when player reaches the water
*/
function modalWin() {
	const href = "#modal-win";
	window.open(href, "_self");
}

/**
* Function shows popup when player score all stages
*/
function modalEnd() {
	const href = "#modal-end";
	window.open(href, "_self");
}

/**
* Function closes win-popup and reset player's position to start/continue the game
*/
function contGame() {
	window.open("#close", "_self");// to close popup
	player.sprite = player.playerChar[player.stage];//to update player character
	player.resetPos();// to reset player position
}

/**
* Function closes start-popup
*/
function startGame() {
	window.open("#close", "_self");
}

/**
* Function to restart game after collision
* It resets a stage counter, player's character and position
*/
function restart() {
	player.stage = 0; // reset stage counter
	player.sprite = player.playerChar[player.stage];// reset player character
	player.resetPos(); //reset player position
	window.open("#close", "_self"); // close popup
}

/**
* Function to show current stage number in popup
*/
function showStage() {
	const showStage = document.getElementById("stage");
	showStage.innerText = player.stage + 1;
}

// Event listener for continue button, to call contGame()
const contButton = document.getElementById("continue");
contButton.addEventListener("click", contGame);

// Event listener for start-game button, to call startGame()
const startButton = document.getElementById("start-game");
startButton.addEventListener("click", startGame);

// Event listener for start-game button, to call startGame()
const againButton = document.getElementById("restart");
againButton.addEventListener("click", restart);