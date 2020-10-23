// factory function to create players
const playerFactory = (name,symbol,AIstatus) => {
    const getName = () => {return name};
    const getSymbol = () => {return symbol};
    const getAIstatus =() => {return AIstatus};
    return {getName,getSymbol,getAIstatus}
};

//object storing game status
const game = (() => {
    let gameCount = 0;
    let moveCount, currentMove;
    let moves = [];
    let boardCopy;
    const paused = false;
    const setPlayers = (name1, AIstatus1, name2, AIstatus2) => {
        player1 = playerFactory(name1,'x',AIstatus1);
        player2 = playerFactory(name2,'o',AIstatus2);
    };
    const start = () => {
        gameCount+=1;
        moves=['','','','','','','','',''];
        interface.output.initiateBoard();
        moveCount=1;
        getNextTurn();
    };
    const getNextTurn = () => {
        currentMove = ((moveCount+gameCount)%2==0? player1 : player2);
        opponent = ((moveCount+gameCount)%2==0? player2 : player1);
        interface.output.statusUpdate(`${currentMove.getName()}'s ${currentMove.getAIstatus()? 'thinking':'turn'}`)
        if(currentMove.getAIstatus() && checkWin(currentMove.getName())!==true){
            game.paused=true;
            function bestMove(){
                let move;
                let bestScore = -Infinity;
                for(let i=0;i<9;i++){
                    if (moves[i] == ''){
                        moves[i]= currentMove.getSymbol();
                        let score = minimax(false, currentMove.getName());
                        moves[i]='';
                        if(score > bestScore){
                            bestScore = score;
                            move = i;
                        }
                    }
                }
                playMove(move);
            };
            bestMove();
            function minimax(isMaximizing, currentPlayer){
                let result = game.checkWin(currentPlayer);
                if (result){
                    // console.log(`result: ${result}, player: ${currentPlayer}`);
                    if (result===currentMove.getName()){
                        return 1;
                    }
                    else if (result === 'tie'){
                        return 0;
                    }
                    else{
                        return -1;
                    }
                }
                if (isMaximizing){
                    let bestScore = -Infinity;
                    for(let i=0;i<9;i++){
                        if (moves[i]===''){
                            moves[i]= currentMove.getSymbol();
                            let score = minimax(false, currentMove.getName());
                            moves[i]='';
                            bestScore = Math.max(score,bestScore)
                        }
                    }
                    return bestScore;
                }
                else{
                    let bestScore= Infinity;
                    for(let i=0;i<9;i++){
                        if (moves[i]===''){
                            moves[i]= opponent.getSymbol();
                            let score = minimax(true, opponent.getName());
                            moves[i]='';
                            bestScore = Math.min(score,bestScore)
                        }
                    }
                    return bestScore;
                }
            }

        }
    }
    const playMove = (index) => {
        moves[index] = currentMove.getSymbol();
        interface.output.updateSquare(index,currentMove.getSymbol());
        moveCount+=1;
        game.paused=false;
        if (checkWin(currentMove.getName())==='tie'){
            interface.output.statusUpdate(`It's a draw.`)
            interface.output.toggleControls();
        }
        else if (checkWin(currentMove.getName())){
            interface.output.statusUpdate(`${currentMove.getName()} wins!`)
            interface.output.toggleControls();
        }
        else {
            getNextTurn();
        }
    };
    const checkWin = (playerName) => {
        let winningLines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for (let i=0;i<winningLines.length;i++){
            let square1 = moves[winningLines[i][0]];
            let square2 = moves[winningLines[i][1]];
            let square3 = moves[winningLines[i][2]];
            if (square1!=='' && square1===square2 && square1===square3){
                return playerName;
            }
        };
        if(moveCount>9){
            return 'tie'
        }
    };
    return{setPlayers,start,playMove,paused,checkWin,currentMove};
})();

//input & display object
const interface = (() => {
    let board = document.querySelector('.board')
    const input = (() => {
        let form=document.querySelector('.gameSetup');
        form.addEventListener('submit', function(event){
            event.preventDefault();
            game.setPlayers(
                event.target.elements.player1.value, 
                event.target.elements.AI1.checked, 
                event.target.elements.player2.value, 
                event.target.elements.AI2.checked
                );
            game.start();
            form.classList.toggle('d-none');
        });
        board.addEventListener('click', function(event){
            if(event.target.textContent==='' && !game.checkWin() && game.paused!==true){
                game.playMove(event.target.getAttribute('index'));
            };
        });
        const controls = document.querySelector('.controls');
        controls.addEventListener('click',function(event){
            console.log(event);
            if (event.target.id==='replay'){
                board.innerHTML='';
                controls.classList.toggle('d-none');
                game.start();
            }
            if (event.target.id==='restart'){
                board.innerHTML='';
                output.statusUpdate(``);
                controls.classList.toggle('d-none');
                form.classList.toggle('d-none');
            }
        });
        return {controls};
    })();
    const output = (() => {
        const initiateBoard = () => {
            for(let i=0; i<9; i++){
                const square = document.createElement('div');
                square.classList.add('cell');
                square.setAttribute('index',i);
                board.appendChild(square)
            };
        };
        const status=document.querySelector('.status p');
        const statusUpdate = message => {
            status.textContent=message;
        };
        const updateSquare = (index,symbol) => {
            const squares = document.querySelectorAll(`.cell`);
            const targetSquare = squares[index];
            targetSquare.textContent=symbol;
        };
        const toggleControls = () => {
            input.controls.classList.toggle('d-none');
        }
        return {initiateBoard,statusUpdate,updateSquare,toggleControls}
    })();
    return {input,output}
})();