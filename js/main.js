$(document).ready(function() {
	let numSquaresH = 31;
	let numSquaresW = 39;
	let squareWidth = 14;
	let guesses = 0;
	let correctGuesses = 0;
	let draw = SVG('drawing').size(squareWidth * numSquaresW, squareWidth * numSquaresH);
	
	for (let h = 0; h < numSquaresH; h++) {
		for (let w = 0; w < numSquaresW; w++) {
			draw.rect(squareWidth-1, squareWidth-1).attr({x: squareWidth*w, y: squareWidth*h, fill: '#CCedFF', id: ('r_w' + w + 'h' + h + '_'), class: 'rects'});
		}
	}
    
    let randID1, randID2, randID3;
    do {
        randID1 = 'r_w' + String(Math.floor(Math.random()*(numSquaresW))) + 'h' + String(Math.floor(Math.random()*(numSquaresH))) + '_';
        randID2 = 'r_w' + String(Math.floor(Math.random()*(numSquaresW))) + 'h' + String(Math.floor(Math.random()*(numSquaresH))) + '_';
        randID3 = 'r_w' + String(Math.floor(Math.random()*(numSquaresW))) + 'h' + String(Math.floor(Math.random()*(numSquaresH))) + '_';
    } while ((randID1 == randID2) || (randID2 == randID3) || (randID1 == randID3));

    $('#'+ randID1).attr('class', 'rects correct');
    $('#'+ randID2).attr('class', 'rects correct');
    $('#'+ randID3).attr('class', 'rects correct');

	$('.rects').on({
	  click: function() {
        let id = $(this).attr('id');

		if (guesses == 0) {
			$('#drawing svg rect').attr('class','rects');
            $('#results').html('');

            $('#'+ randID1).attr('class', 'rects correct');
            $('#'+ randID2).attr('class', 'rects correct');
            $('#'+ randID3).attr('class', 'rects correct');
		}
		if ($(this).attr('class').indexOf('active') > -1) {
            $(this).attr('class', 'rects');

            if (id == randID1 || id == randID2 || id == randID3) {
                $(this).attr('class', 'rects correct');
            }
            guesses--;
		} else {
            $(this).attr('class', 'active');
            guesses++;
		}
		
		if (guesses > 2) {
			guesses = 0;
            correctGuesses = 0;
            
            if ($('#'+ randID1).attr('class').indexOf('active') > -1) {
                correctGuesses++;
                $('#'+ randID1).attr('class', 'active random');	
            } else {
                $('#'+ randID1).attr('class', 'random');
            }

            if ($('#'+ randID2).attr('class').indexOf('active') > -1) {
                correctGuesses++;
                $('#'+ randID2).attr('class', 'active random');	
            } else {
                $('#'+ randID2).attr('class', 'random');	
            }

            if ($('#'+ randID3).attr('class').indexOf('active') > -1) {
                correctGuesses++;
                $('#'+ randID3).attr('class', 'active random');	
            } else {
                $('#'+ randID3).attr('class', 'random');	
            }
			
			switch(correctGuesses) {
				case 0:
					$('#results').html('Not a single match, keep trying');
					break;
				case 1:
					$('#results').html('You matched one, not bad');
					break;
				case 2:
					$('#results').html('You matched two squares, awesome!');
					break;
				case 3:
					$('#results').html('You won the PowerBall jackpot!!! You should have bought a real ticket!');
					break;
            }

            do {
                randID1 = 'r_w' + String(Math.floor(Math.random()*(numSquaresW))) + 'h' + String(Math.floor(Math.random()*(numSquaresH))) + '_';
                randID2 = 'r_w' + String(Math.floor(Math.random()*(numSquaresW))) + 'h' + String(Math.floor(Math.random()*(numSquaresH))) + '_';
                randID3 = 'r_w' + String(Math.floor(Math.random()*(numSquaresW))) + 'h' + String(Math.floor(Math.random()*(numSquaresH))) + '_';
            } while ((randID1 == randID2) || (randID2 == randID3) || (randID1 == randID3));
		}
	}});
}); 

