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
    let AIpause = false;
    const setPlayers = (name1, AIstatus1, name2, AIstatus2) => {
        player1 = playerFactory(name1,'x',AIstatus1);
        player2 = playerFactory(name2,'o',AIstatus2);
    };
    const start = () => {
        gameCount+=1;
        moves=[,,,,,,,,]
        interface.output.initiateBoard();
        moveCount=1;
        getNextTurn();
    };
    const getNextTurn = () => {
        currentMove = ((moveCount+gameCount)%2==0? player1 : player2);
        interface.output.statusUpdate(`${currentMove.getName()}'s ${currentMove.getAIstatus()? 'thinking':'turn'}`)
        if(currentMove.getAIstatus()){
            AIpause=true;
            let possibleMoves = [];
            for(let i=0;i<moves.length;i++){
                if (!moves[i]){
                    possibleMoves.push(i);
                }
            }
            let choice;
            choice = parseInt(Math.random()*possibleMoves.length);
            setTimeout(() => playMove(possibleMoves[choice]), 2000);
        }
    }
    const playMove = (index) => {
        moves[index] = currentMove.getSymbol();
        interface.output.updateSquare(index,currentMove.getSymbol());
        moveCount+=1;
        AIpause=false;
        if (checkWin()===true){
            interface.output.statusUpdate(`${currentMove.getName()} wins!`)
            interface.output.toggleControls();
        }
        else if (moveCount>9){
            interface.output.statusUpdate(`It's a draw.`)
            interface.output.toggleControls();
        }
        else {
            getNextTurn();
        }
    };
    const checkWin = () => {
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
            if (square1 && square1===square2 && square1===square3){
                return true;
            }
        };
    };
    return{setPlayers,start,playMove,AIpause,checkWin};
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
            console.log(game.AIpause)
            if(event.target.textContent==='' && game.checkWin()!==true && game.AIpause!==true){
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