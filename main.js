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
    let moves = [];
    const setPlayers = (name1, name2) => {
        player1 = playerFactory(name1,'x');
        player2 = playerFactory(name2,'0');
    }
    const start = () => {
        gameCount+=1;
        moves=[,,,,,,,,]
        interface.output.initiateBoard();
        let moveCount = 1;
        let currentMove = (gameCount%2===1? player1.getName():player2.getName());
        interface.output.statusUpdate(`${currentMove}'s turn!`)
    };
    return{moves,setPlayers,start};
})();

//input & display object
const interface = (() => {
    let board = document.querySelector('.board')
    const input = (() => {
        let form=document.querySelector('.gameSetup');
        let player1, player2;
        form.addEventListener('submit', function(event){
            event.preventDefault();
            game.setPlayers(event.target.elements.player1.value,event.target.elements.player2.value);
            game.start();
            form.classList.toggle('d-none');
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
        const status=document.querySelector('.status p');
        const statusUpdate = message => {
            status.textContent=message;
        };
        return {initiateBoard,statusUpdate}
    })();
    return {input,output}
})();