// factory function to create players
const playerFactory = (name,symbol) => {
    const getName = () => {return name};
    const getSymbol = () => {return symbol};
    const score = 0;
    return {getName,getSymbol,score}
};

//object storing game status
const game = (() => {
    let gameCount = 1;
    const moves=[,,,,,,,,];
    const start = (player1, player2) => {
        interface.output.initiateBoard();
        let moveCount = 1;
        let currentMove = (gameCount%2===1? player1:player2);
        interface.output.statusUpdate(`${currentMove}'s turn!`)
    };
    return{moves,start};
})();

//input & display object
const interface = (() => {
    let board = document.querySelector('.board')
    const input = (() => {
        let form=document.querySelector('.gameSetup');
        let player1, player2;
        form.addEventListener('submit', function(event){
            event.preventDefault();
            player1 = playerFactory(event.target.elements.player1.value,'x');
            player2 = playerFactory(event.target.elements.player2.value,'o');
            // console.log(player1.getName(),player2.getName());
            game.start(player1.getName(),player2.getName());
        });
        return {}
    })();
    const output = (() => {
        const initiateBoard = () => {
            for(let i=1; i<10; i++){
                const square = document.createElement('div');
                square.classList.add('cell');
                square.setAttribute('index',i);
                board.appendChild(square)
            }
        };
        const status=document.querySelector('.status');
        const statusUpdate = message => {
            status.textContent=message;
        };
        return {initiateBoard,statusUpdate}
    })();
    return {input,output}
})();