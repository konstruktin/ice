var z1, v1, z2, v2;
var unicoord;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
	createCanvas(windowWidth, windowHeight);

	z1 = new Array(width);
	v1 = new Array(width);
	z2 = new Array(width);
	v2 = new Array(width);

	for (var i = 0; i < width; i++) {
		z1[i] = new Array(height).fill(0);
		v1[i] = new Array(height).fill(0);
		z2[i] = new Array(height).fill(0);
		v2[i] = new Array(height).fill(0);
	}

	unicoord = new Array(width);

	for (var i = 0; i < width; i++) {
		unicoord[i] = new Array(height);
	}

	var p = 0;
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			unicoord[x][y] = p;
			p += 4;
		}
	}

	loadPixels();
	pixels.fill(255);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
	for (var x = 1; x < width-1; x++) {
		for (var y = 1; y < height-1; y++) {
			v1[x][y] += (z1[x-1][y] + z1[x+1][y] + z1[x][y-1] + z1[x][y+1]) * 0.25 - z1[x][y];
			v2[x][y] += (z2[x-1][y] + z2[x+1][y] + z2[x][y-1] + z2[x][y+1] + z1[x][y]) * 0.25 - z2[x][y];
		}
	}

	for (var x = 1; x < width-1; x++) {
		for (var y = 1; y < height-1; y++) {
			z1[x][y] += v1[x][y];
			z2[x][y] += v2[x][y];
			z1[x][y] = constrain(z1[x][y], -1, 1);
			z2[x][y] = constrain(z2[x][y], -1, 1);
			
			var v = (v2[x][y] + 1) * 128;
			pixels[unicoord[x][y]] = v;
			pixels[unicoord[x][y]+1] = v;
		}
	}

	updatePixels();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function mouseClicked() {
	for (var x = 1; x < width-1; x++) {
		for (var y = 1; y < height-1; y++) {
			v1[x][y] = randomGaussian();
			z1[x][y] = 0;
			v2[x][y] = 0;
			z2[x][y] = 0;
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function mouseMoved() {
	v1[mouseX][mouseY] = randomGaussian();
}
