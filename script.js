/*
Split array into 3x subarrays to make it easier to clarify which cell we are targeting 
and should help with deciding winner. 
Only need to expose the Gameboard playmove function for players to use, don't want to 
allow access to squares array
*/
const Gameboard = (() => {
    const squares = [['x','o','x'],['o','x','o'],['x','o','x']];
    const boardOuter = document.querySelector('.board');
    function createBoard(){
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
    function playMove(row, column, symbol){
        // Need to flesh out this function with user input from the player function
        createBoard();
    };
    return {
        playMove
    }
})();

Gameboard.playMove();

// const Gameboard = (() => {
//     //create board using module as will only be called once;
//     const squares = ['x','o','x','o','x','o','x','o','x'];
//     const [[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]] = squares;
//     return {
//         gameboard
//     }
// })();

// const displayController = (() => {
//     const output = document.querySelector('.output');
//     const updateBoard = () => {
//         for (let position of Gameboard.gameboard){
//             let square = document.createElement('div');
//             square.classList.add(position);
//             square.textContent=Gameboard.gameboard[position];
//             output.appendChild(square)
//         }
//     };
//     return {
//         updateBoard
//     }
// })();

// const player(name) => {
//     //use factory function as will be called multiple times
//     const getName = () => name;
//     const move = (x,y) => {
//         // update the gameboard square[x,y] 
//     }
// }

// const game() => {
//     // factory for game as can be rerun

// }