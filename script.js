const playerFactory = (name) => {
    const getName = () => name;
    const playerSymbol = game.playerList.length>0 ? 'o' : 'x';
    game.playerList.push(name);
    const move = (x,y) => {
        Gameboard.playMove(x,y,playerSymbol);
    }
    return {
        move
    }
}

const Gameboard = (() => {
    const squares = [[,,],[,,],[,,]];
    const boardOuter = document.querySelector('.board');
    function createBoard(){
        boardOuter.innerHTML='';
        for (let i=0; i<3; i++){
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            for (let j=0; j<3; j++){
                let columnDiv = document.createElement('div');
                columnDiv.classList.add('cell');
                columnDiv.textContent = squares[i][j];
                columnDiv.setAttribute('row',i);
                columnDiv.setAttribute('column',j);
                rowDiv.appendChild(columnDiv);
            };
            boardOuter.appendChild(rowDiv);
        }
    }
    function checkWin(){
        for (let i=0; i<3; i++){
            if(squares[i][0]===squares[i][1] && squares[i][0]===squares[i][2]){
                return squares[i][0] || 'no winner yet';
            }
            else if(squares[0][i]===squares[1][i] && squares[0][i]===squares[2][i]){
                return squares[0][i] || 'no winner yet';
            }
            else if(squares[0][0]===squares[1][1] && squares[0][0]===squares[2][2]){
                return squares[0][0] || 'no winner yet';
            }
            else if(squares[0][2]===squares[1][1] && squares[0][2]===squares[2][0]){
                return squares[0][2] || 'no winner yet';
            }
            else {
                return 'no winner yet';
            }
        }
    }
    let moveCount = 0;
    function playMove(row, column, symbol){
        if(squares[row][column]===undefined){
            squares[row][column] = symbol;
            createBoard();
            moveCount++;
            console.log(checkWin());
        }
    };
    return {
        createBoard,
        playMove,
        boardOuter,
        moveCount
    }
})();

const game = ((round) => {
    start = () => {
        Gameboard.createBoard();
    }
    const player1 = player('player1');
    const player2 = player('player2');
    const getRound = () => round;
    const playerList = [];
    let currentPlayer= playerList[0]
    return {
        start,
        playerList,
        currentPlayer
    }
})();

const displayController = (() => {
    let startButton = document.querySelector('button#gameStart');
    startButton.addEventListener('click', function(event){
        event.preventDefault()
        let playerOne = document.querySelector('#player1');
        let playerTwo = document.querySelector('#player2');
        game.start(playerOne.value, playerTwo.value)
    });
    Gameboard.boardOuter.addEventListener('click',function(event){
        player1.move((event.target.getAttribute('row')),(event.target.getAttribute('column')));
    });
})();
