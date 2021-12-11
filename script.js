/*
MIT License
Copyright (c) 2021 LessTheory Academy
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var app = new Vue({
    el: '#app',
    data: {
      player1 : '',
      player2 : '',
      step : 1,
      href : '#',
      gameGrid : [],
      currentPlayer : '1',
      isOver : false,
      winners : [],
      filteredWinners : ''
    },
    methods : {

        setGridBoxValue : function(gridBox) {

            if (gridBox.value == '') {

                gridBox.value = this.currentPlayer;
                
                if (this.currentPlayer == '1') {
            
                    this.currentPlayer = '2';
            
                } else {
            
                    this.currentPlayer = '1';
                } 

                this.checkWinner();
            }
        },   
        getGridBoxClasses : function(gridBox) {

            const classes = {
                'grid-box' : true, 
                'background-empty' : gridBox.value == '', 
                'background-player1' : gridBox.value == '1', 
                'background-player2' : gridBox.value == '2' 
            }

            return classes;
        },
        getGridBoxClassesArray : function(gridBox) {

            const classes = ['grid-box'];

            if (gridBox.value == '') {

                classes.push('background-empty');

            } else if (gridBox.value == '1') {

                classes.push('background-player1');

            } else {

                classes.push('background-player2');
            }

            return classes;
        },
        checkWinner : function() {

            let isOverTemp = true;
    
            this.gameGrid.forEach(gridBox => {
                
                if(gridBox.value == '') {
                    isOverTemp = false;
                }
            });
    
            let winner = 'Draw';
    
            if (this.gameGrid[0].value != '' && this.gameGrid[0].value == this.gameGrid[1].value && this.gameGrid[1].value == this.gameGrid[2].value) {
                
                winner = this.gameGrid[0].value;
                isOverTemp = true;
            }
    
            if (this.gameGrid[3].value != '' && this.gameGrid[3].value == this.gameGrid[4].value && this.gameGrid[4].value == this.gameGrid[5].value) {
                
                winner = this.gameGrid[3].value;
                isOverTemp = true;
            }
            
            if (this.gameGrid[6].value != '' && this.gameGrid[6].value == this.gameGrid[7].value && this.gameGrid[7].value == this.gameGrid[8].value) {
                
                winner = this.gameGrid[6].value;
                isOverTemp = true;
            }    
    
            // --------------
            
            if (this.gameGrid[0].value != '' && this.gameGrid[0].value == this.gameGrid[3].value && this.gameGrid[3].value == this.gameGrid[6].value) {
                
                winner = this.gameGrid[0].value;
                isOverTemp = true;
            }
    
            if (this.gameGrid[1].value != '' && this.gameGrid[1].value == this.gameGrid[4].value && this.gameGrid[4].value == this.gameGrid[7].value) {
                
                winner = this.gameGrid[1].value;
                isOverTemp = true;
            }
            
            if (this.gameGrid[2].value != '' && this.gameGrid[2].value == this.gameGrid[5].value && this.gameGrid[5].value == this.gameGrid[8].value) {
                
                winner = this.gameGrid[2].value;
                isOverTemp = true;
            }                 
    
            // --------------
            
            if (this.gameGrid[0].value != '' && this.gameGrid[0].value == this.gameGrid[4].value && this.gameGrid[4].value == this.gameGrid[8].value) {
                
                winner = this.gameGrid[0].value;
                isOverTemp = true;
            }
    
            if (this.gameGrid[2].value != '' && this.gameGrid[2].value == this.gameGrid[4].value && this.gameGrid[4].value == this.gameGrid[6].value) {
                
                winner = this.gameGrid[2].value;
                isOverTemp = true;
            }            
    
            if (isOverTemp == true) {
    
                this.isOver = true;
    
                if (winner == '1') {
    
                    this.winners.push(this.player1);
    
                } else if (winner == '2') {
    
                    this.winners.push(this.player2);
                }
            }
        }, 
        showWinners : function() {

            this.step = 3;
        },
        playAgain : function() {            

            this.gameGrid.forEach(gridBox=>{
    
                gridBox.value = '';
            });
    
            this.step = 1;
            this.currentPlayer = '1';
            this.player1 = '';
            this.player2 = '';
            this.filteredWinners = '';
            this.isOver = false;
        },
        getFilteredWinners : function() {

            return this.winners.filter(player=>{

                return player.includes(this.filteredWinners);
            });
        }            
    },
    computed : {

        filteredWinnersList : function() {

            return this.winners.filter(player=>{

                return player.includes(this.filteredWinners);
            });            
        }
    },
    mounted : function() {

        for(let i = 0; i < 9; i++) {

            this.gameGrid.push({ value : '' });
        }
    }
});