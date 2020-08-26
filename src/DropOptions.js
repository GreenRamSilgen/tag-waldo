import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL-J9TxH7sdarmOhZQbUgwta_pEjU1nu8",
  authDomain: "tagwaldo-693e6.firebaseapp.com",
  databaseURL: "https://tagwaldo-693e6.firebaseio.com",
  projectId: "tagwaldo-693e6",
  storageBucket: "tagwaldo-693e6.appspot.com",
  messagingSenderId: "879524435547",
  appId: "1:879524435547:web:ddd654dbc7161467b2517e",
  measurementId: "G-DTWMBZL9Q2",
};

firebase.initializeApp(firebaseConfig);

export class DropOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacter: "",
      charToFind: ["NA","Waldo","Welma","Derp"], //TODO: ASSIGN THIS FROM PROS WHEN USER PICKS THE MAP
    };

    this.characterSelected = this.characterSelected.bind(this);
    this.didUserFindChar = this.didUserFindChar.bind(this);
    this.removeChar = this.removeChar.bind(this);
  }

  characterSelected(e) {
    e.preventDefault();
    let charName = e.target.value;

    firebase
      .firestore()
      .collection("easyMap")
      .doc("0")
      .get()
      .then((doc) => {
        
        let data = doc.data();
        

        //!CHECK IF CORRECT CHARACTE SELECTED
        if(charName === 'Waldo'){
        if(this.didUserFindChar({
          char: charName,
          margins: data.Waldo,
        })){
          this.removeChar(charName);
        }
      }

        if(charName === 'Welma'){
          if(this.didUserFindChar({
            char: charName,
            margins: data.Welma,
          })){
          this.removeChar(charName);
          }
        }

      });
    

  }
  didUserFindChar({char, margins}) {
    if(margins[0] < Number(this.props.posY) && Number(this.props.posY) < margins[2]){
      if(margins[3] < Number(this.props.posX) && Number(this.props.posX) < margins[1]){
        return true;
      }
    }
      else{
        return false;
      }
  }
  removeChar(charName){
    let temp = [...this.state.charToFind];
    for(let i = 0; i < temp.length; i++){
      if(temp[i] === charName){
        temp.splice(i,1);
      }
    }
    this.setState({
      charToFind: temp
    })
  }


  render() {
    return (
      <div>
        <form>
          <select onClick={this.characterSelected} id="charSelect" name="charSelect" ref="selectCharacter">
            
            {
              this.state.charToFind.map((char)=>{
              if(char === "NA"){
                return(
              <option value="NA" selected disabled hidden> Pick </option>);}
              return <option key={char} value={char}>{char}</option>
            })}
          </select>
        </form>
      </div>
    );
  }
}
