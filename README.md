
# General Assembly SEI-49 | Project 1: Space Invader 
---
## Technical brief

* ** 7 Days to render the game in the browser**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* **Use Javascript for DOM manipulation**
* HTML Canvas is **not** to be used during this project.
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)

---
## Technologies:

<br/>
| Vanilla Javascript (ES6)
| CSS
| HTML5
<br/>

---
## Overview

* The game is hosted [here](https://julienxemard.github.io/gameProject-1/)
* Else, kindly clone or fork the repository.

The list of games options were:
<br/>
* Battleship
* Connect 4
* Frogger
* Mastermind
* Pac-man
* Snake
* Tetris
* Space Invaders
<br/>

I chose Space Invaders as I really wanted to create an different 2D immersive experience.<br/>
My researches led me to find a .js script background that perfectly fitted both the brief & my idea (source below).<br/>
.<br/>
![Starfielf](./assets/Screenshot-game.png "Immersive-2DIMG")
<br/>
With a month of coding experience, Space Invaders game logic was a tough yet interesting challenge.<br/>
The project allowed me to re-use all methods taught during our first month which also led me to realise the following statement:<br/>
<br/>

* It is one thing to understand it when an experienced programmer demonstrate & another to do it on your own.<br/>
<br/>
I realised that the frustration moments are the constant & that the solutions to them are intellectually rewarding.<br/>

---
## Game Instructions

**Player Controls**
* Use **A** to move **⬅** & **D** to move **➡**<br/>
* Use **W** to move **⬆** & **S** to move **⬇**<br/>
* Use **Space Bar** to kill them all 👽!<br/>
<br/>

![gameOver](./assets/Screenshot-gameOver.png "ganeOverIMG")

**Game Over Cases**
* If the enemy spaceships collide with yours<br/>
* If some enemy spaceships reach the surface<br/>
* If enemy lasers hit you 3 times<br/>
<br/>

**Game Win Case**
* If you eliminate all enemies within the given period<br/>
<br/>

Each scenarios will offer a restart option.

![win](./assets/Screenshot-win.png "winIMG")

---
## Challenges

* The first difficulty was to figure out a way to initiate a movement pattern for each enemy.<br/>
* Some difficulties applying the loop to have all enemies shooting randomly as a lot of intervals are involved.
* The restart option, per scenario, which could have been simplified if I would have planned this project better.

## Comments

**Any suggestions to improve my code will be studied meticulously**

---
## Used Resources

* **A special thank you to Charlotte Morgan for her helped me compiled it all & transform difficult moments in fun times**
* **Starfield background created in 2004 by Kurt Grigg.** |
[Stack Overflow](https://stackoverflow.com/questions/31680639/non-canvas-javascript-starfield-animation-in-latest-explorer-not-smooth)



---
