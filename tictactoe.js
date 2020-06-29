

document.addEventListener('DOMContentLoaded', () => {
    // creating TITLE
    let heading = document.createElement('div');
    heading.className = "heading";
    heading.id = "heading";
    let h2 = document.createElement('h2');
    h2.id = "h2";
    document.body.appendChild(heading);
    document.getElementById("heading").appendChild(h2);
    document.getElementById("h2").append("TIC TAC TOE");


  


    //creating a board
    let container = document.createElement('div');
    container.className = "container";
    container.id = "container";
    document.body.appendChild(container);

    //creating boxes
   for(let i = 0; i<25; i++){
       var box = document.createElement('div');
       box.className = 'box';
       box.createAttribute = "pp";
       document.getElementById("container").appendChild(box);
   }
   document.getElementsByClassName("box")[0].className = "box";
   document.getElementsByClassName("box")[1].className = "box";


     //creating a pre-text input

     let pre = document.createElement('div');
     pre.className = "pre";
     pre.id = "pre";
     let intro = document.createElement('div');
     intro.className = "intro";
     intro.id = "intro";
     let submit = document.createElement('button');
     submit.id = "submit";

     let ip1 = document.createElement('input');
     ip1.id = 'p1_name'
     ip1.type = "text";
     let ip2 = document.createElement('input');
     ip2.id = 'p2_name';
     ip2.type = "text";
     let br = document.createElement('br');
     br.id = "br"
     let hint = document.createElement('div');
     hint.id = "hint";

     document.body.appendChild(pre);
     pre.appendChild(hint)
     hint.append("First person to make a Trio wins!")
     document.getElementById("pre").appendChild(intro);
     document.getElementById("pre").appendChild(submit);
     submit.append("Enter");
     

     document.getElementById('intro').append("Enter Player-1 Name")
     
     document.getElementById('intro').appendChild(ip1)
     intro.appendChild(br)
     document.getElementById('intro').append("Enter Player-2 Name")
     document.getElementById('intro').appendChild(ip2)

   //creating the conclusion

   let conclusion = document.createElement('div');
   conclusion.className = "conclusion";
   conclusion.id = "conclusion";

   let finalText = document.createElement('div');
   finalText.className = "finalText";
   finalText.append("hello");
   

  let restart = document.createElement('button');
   restart.id = "restart";
   
   document.body.appendChild(conclusion);
   document.getElementById("conclusion").appendChild(finalText);
   document.getElementById("conclusion").appendChild(restart);
   document.getElementById("restart").append("Restart")

   let author = document.createElement('div');
   author.className = "author";
   let a = document.createElement('a');
   a.className = 'link';
   a.href = "https://www.linkedin.com/in/krishna-kompalli/";
   a.target = "_blank";
   document.body.appendChild(author);
   author.appendChild(a);
   a.append("Krishna Kompalli");
   
   

// ---------------CODE BEGINS---------------------------

   const Player_1 = 'x'
   const Player_2 = 'o'
   const board = document.getElementById('container');
   const boxEl = document.querySelectorAll('.box');
   const final_verd = document.querySelector('.finalText');
   const conc = document.getElementById('conclusion');
   const restartbtn = document.getElementById('restart');
   const enterbtn = document.getElementById('submit');
   var p1,p2;

   //winning combinations
   const win_comb = [
        [0,1,2],[1,2,3],[2,3,4],[5,6,7],[6,7,8],[7,8,9],[10,11,12],[12,13,14],[11,12,13],[15,16,17],[16,17,18],[17,18,19],
        [20,21,22],[21,22,23],[22,23,24],[0,5,10],[1,6,11],[2,7,12],[3,8,13],[4,9,14],[5,10,15],[6,11,16],[7,12,17],[8,13,18],
        [9,14,19],[10,15,20],[11,16,21],[12,17,22],[13,18,23],[14,19,24],[0,6,12],[6,12,18],[12,18,24],[4,8,12],[8,12,16],
        [12,16,20],[5,11,17],[11,17,23],[10,16,22],[1,7,13],[7,13,19],[2,8,14],[3,7,11],[7,11,15],[2,6,10],[9,13,17],[13,17,21],[14,18,22]
       
    ]

   //considering the player turn 
   let playerTurn

    //initializing the enter button
   enterbtn.addEventListener('click', register);
   gamePlayInit()
   restartbtn.addEventListener('click', gamePlayInit);

   //Initialize the first move(Player1)
   function gamePlayInit(){
    playerTurn = false
    boxEl.forEach(box =>{
        box.classList.remove(Player_1)
        box.classList.remove(Player_2)
        box.removeEventListener('click', clickMethod)
        box.addEventListener('click', clickMethod, {once: true})
   })
    predict_sign()
    conclusion.classList.remove('show');
   }

// Name Creation
   function register(){
    p1 = document.getElementById('p1_name').value;
    console.log("Player-1: "+ p1)
    p2 = document.getElementById('p2_name').value;
    console.log("Player-2: "+ p2)
    if(p1 !== p2){
    pre.classList.add('hide');
    }
    else if ( p1==p2 || p1 =="" || p2 ==""){
        alert("Please choose a different name")
        pre.classList.remove('hide');
    }
    else{
        alert("please enter a name");
        pre.classList.remove('hide');
    }
   }



   //Click Behaviour of every box
   function clickMethod(event){
        const box = event.target;
        const currcls = playerTurn ? Player_2 : Player_1
        placeMark(box, currcls);
        if (check_win(currcls)){
            verdict(false);
        }
        else if(check_tie()){
            verdict(true)
        }
        else{
            change_player();
            predict_sign();
        }
       
   }




   //To display who has won the game
   function verdict(tie){
        if (tie){
            final_verd.innerText = "Its a Tie! Try Again"
        }
        else{
            final_verd.innerText = `${playerTurn ? p2 : p1} has Won`
        }

        conc.classList.add('show');
   }


   //to check if it's a tie
   function check_tie(){

        //to check if each and every box is filled either by player 1 or player 2
        return [...boxEl].every(n => {
            return n.classList.contains(Player_1) || n.classList.contains(Player_2)
        })
   }


   //to make a sign
   function placeMark(box, currcls){
       box.classList.add(currcls)
   }


   //to change the player's turn simultaneously
   function change_player(){
       playerTurn = !playerTurn
   }


   //to show the player's sign when hover
   function predict_sign(){
        container.classList.remove(Player_1)
        container.classList.remove(Player_2)

        if (playerTurn){
            container.classList.add(Player_2);
        }
        else{
            container.classList.add(Player_1);
        }
   }


   //to check the win from given win combinations
   function check_win(currcls){

    return win_comb.some(n => {
        return n.every(index => {
            return boxEl[index].classList.contains(currcls)
        })
    })
   }



})


