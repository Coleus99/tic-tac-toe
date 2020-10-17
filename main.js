// factory function to create players
const playerFactory = (name,symbol) => {
    const getName = () => {return name};
    const getSymbol = () => {return symbol};
    const score = 0;
    return {getName,getSymbol,score}
};

//object storing game status
const game = (() => {
    let gameCount = 0;
    let moveCount, currentMove;
    let moves = [];
    const setPlayers = (name1, name2) => {
        player1 = playerFactory(name1,'x');
        player2 = playerFactory(name2,'o');
    };
    const start = () => {
        gameCount+=1;
        moves=[,,,,,,,,]
        interface.output.initiateBoard();
        moveCount=1;
        getNextTurn();
    };
    const getNextTurn = () => {
        currentMove = (moveCount%2===1? player1 : player2);
        interface.output.statusUpdate(`${currentMove.getName()}'s turn!`)
    }
    const playMove = (index) => {
        moves[index] = currentMove.getSymbol();
        interface.output.updateSquare(index,currentMove.getSymbol());
        moveCount+=1;
        getNextTurn();
    };
    return{setPlayers,start,playMove};
})();

//input & display object
const interface = (() => {
    let board = document.querySelector('.board')
    const input = (() => {
        let form=document.querySelector('.gameSetup');
        // let player1, player2;
        form.addEventListener('submit', function(event){
            event.preventDefault();
            game.setPlayers(event.target.elements.player1.value,event.target.elements.player2.value);
            game.start();
            form.classList.toggle('d-none');
        });
        board.addEventListener('click', function(event){
            if(event.target.textContent===''){
                game.playMove(event.target.getAttribute('index'));
            }
        });
        return {}
    })();
    const output = (() => {
        const initiateBoard = () => {
            board.innerHTML='';
            for(let i=0; i<9; i++){
                const square = document.createElement('div');
                square.classList.add('cell');
                square.setAttribute('index',i);
                board.appendChild(square)
            }
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
        return {initiateBoard,statusUpdate,updateSquare}
    })();
    return {input,output}
})();