//variables
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
                'U', 'V', 'W', 'X', 'Y', 'Z'];
var words = [{word: "snake", hint: "It's a reptile"},
             {word: "monkey", hint: "it's a mammal"},
             {word: "beetle", hint: "It's an insect"}];
var board = [];
var selectedWord = "";
var selectedHint = "";
var remainingGuesses = 6;



//listener
window.onload = startGame();

$('.letter').click(function(){
    checkLetter($(this).attr("id"));
    disableButton($(this));
});


$('.replayBtn').on("click", function(){
    location.reload();
});

$('.hint').click(function(){
    hint();
    updateMan();
});

function startGame(){
    pickWord();
    createLetters();
    initBoard();
    
    updateBoard();

    if (sessionStorage.length > 0){
        displayGuessedWords();

    }
}

function createLetters(){
    for (var letter of alphabet){
        $("#letters").append("<button class='btn btn-success letter' id='" + letter + "'>" + letter + "</button>");
    }
}

function initBoard(){
    for (var letter in selectedWord){
        board.push("_");
    }
    $('#hint').append("<button class='btn btn-info btn-lg hint'>Hint" + "</button>");

}

function pickWord(){
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

function updateBoard(){
    $('#word').empty();

    for (let i = 0; i < board.length; i++){
        $('#word').append(board[i] + " ");
    }

    $('#word').append("<br>" + "<br>");
}

function checkLetter(letter){
    var positions = new Array();

    for (var i = 0; i < selectedWord.length; i++){
        console.log(selectedWord);
        if (letter == selectedWord[i]){
            positions.push(i);
        }
    }

    if(positions.length > 0){
        updateWord(positions, letter);

        if (!board.includes('_')){
            endGame(true);
            if(typeof(Storage) !== 'undefined'){
                var num = sessionStorage.length-1;
                sessionStorage.setItem(num, selectedWord);
            }
            ;

        }
    }else {
        remainingGuesses -= 1;
        updateMan();
    }

    if (remainingGuesses <= 0){
        endGame(false);
    }
}

function updateWord(positions, letter){
    for (var pos of positions){
        board[pos] = letter;
    }

    updateBoard();
}

function updateMan(){
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function endGame(win){
    $('#letters').hide();

    if (win){
        $('#won').show();
    }else{
        $('#lost').show();
    }
}

function hint(){
    $('.hint').hide();
    $('#hint').append("<span id='word_hint'>Hint: " + selectedHint + "</span>");
    remainingGuesses -= 1;
}

function disableButton(btn){
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}

function displayGuessedWords(){
    $('#result').append("<span id='guessed_words'>Guessed Words: </span");
    for (let i = 0; i < sessionStorage.length; i++){
        $('#result').append(sessionStorage.getItem(sessionStorage.key(i)));
        $('#result').append(" ");

    }
}

