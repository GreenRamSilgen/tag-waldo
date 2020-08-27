import React from "react";
import "./MainContent.css";
import { DropOptions } from "./DropOptions";
import {LeftBar} from './LeftBar';
import {NewMapModal} from './NewMapModal';
import {GameOver} from './GameOver';

import firebase from "firebase/app";
import "firebase/firestore";
import { HighScoreModal } from "./HighScoreModal";

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


function FindPosition(theImg) {
  if (typeof theImg.offsetParent != "undefined") {
    for (var posX = 0, posY = 0; theImg; theImg = theImg.offsetParent) {
      posX += theImg.offsetLeft;
      posY += theImg.offsetTop;
    }
    return [posX, posY];
  } else {
    return [theImg.x, theImg.y];
  }
}

function GetCoordinates(e) {
  let PosX = 0;
  let PosY = 0;
  let ImgPos;
  
  ImgPos = FindPosition(document.querySelector(".actualImg"));

  if(e.clientX || e.clientY) {
    PosX =
      e.clientX +
      document.querySelector('.mainContent').scrollLeft;
    PosY =
      e.clientY + document.querySelector('html').scrollTop;
  }
  else{
    return;
  }

  let absX = PosX;
  let absY = document.getElementById("mainImg").height - PosY;
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];

  return {
    absX, //posisiton of mouse
    absY, //Height of IMG - POsition Y of mouse
    PosX, //!POSITIONS WITH 0,0 being top left of IMAGE SEND TO SERVER/CHECK FOR CORRECTNESS
    PosY,
  };
}

export class MainContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      winTime: 0,
      gameOver: false,
      newMapPopup:false,
      highScorePopup: false,


      //!TagBox
      tagBoxStyle: {
        left: "0px",
        top: "0px",
      },
      tagBoxOn: false,
      posX:'',
      posY:'',

      //!FETECHED MAP INFO
      mapObj:null,
      charToFind: ["NA"],
    };

    this.displayNone = {
      display: "none",
    };


    this.imgClicked = this.imgClicked.bind(this);
    this.handleNewMapClick = this.handleNewMapClick.bind(this);
    this.closeNewMapPopUp = this.closeNewMapPopUp.bind(this);
    this.handleHighScoreClick = this.handleHighScoreClick.bind(this);
    this.closeHighScorePopUp = this.closeHighScorePopUp.bind(this);
    this.closeGameOverPopUp = this.closeGameOverPopUp.bind(this);
    this.setMapObj = this.setMapObj.bind(this);
    this.handleCharFound = this.handleCharFound.bind(this);
  }

  imgClicked(e) {
    if (this.state.tagBoxOn) {
      this.setState({
        tagBoxOn: !this.state.tagBoxOn,
      });
    } else {
      let absPosObj = GetCoordinates(e);
      this.setState({
        tagBoxStyle: {
          left: `${Number(absPosObj.absX) - 25}px`,
          top: `-${Number(absPosObj.absY) + 80}px`,
        },
        tagBoxOn: true,
        posX: absPosObj.PosX,
        posY: absPosObj.PosY,
      });
    }
  }
  setMapObj(obj){
    this.setState({
      newMapPopup:false,
      mapObj: obj,
      charToFind: obj.data.charactersOnMap,
      seconds: 0,
    })
  }

  handleNewMapClick(e){
    this.setState({
      newMapPopup: true,
    })
  }
  closeNewMapPopUp(){
    this.setState({
      newMapPopup: false
    })
  }
  handleHighScoreClick(){
    this.setState({
      highScorePopup: true,
    })
  }
  closeHighScorePopUp(){
    this.setState({
      highScorePopup: false,
    })
  }
  closeGameOverPopUp(){
    this.setState({
      gameOver: false,
    })
  }

  handleCharFound(charName){ 
    let temp = [...this.state.charToFind];
    for(let i = 0; i < temp.length; i++){
      if(temp[i] === charName){
        temp.splice(i,1);
      }
    }

    if(temp.length === 0){
      this.setState({
        charToFind: temp,
        gameOver: true,
        winTime: this.state.seconds,
        tagBoxOn: false,
      })
    }else{
      this.setState({
        charToFind: temp
      })
    }
  }

  //!TIMER
  
  componentDidMount(){
    this.timerID = setInterval(
        ()=> this.tick(), 1000);
  }

  tick(){
    this.setState({
        seconds: this.state.seconds + 1,
    })
  }

  render() {
    return (
      <div>
      <LeftBar seconds={this.state.seconds} charToFind={this.state.charToFind} newMapClick={this.handleNewMapClick} highScoreClick={this.handleHighScoreClick} mapObj={this.state.mapObj}/>
        
      {(this.state.newMapPopup) ? <NewMapModal setMapObj={this.setMapObj} closeNewMapPopUp={this.closeNewMapPopUp}/> : null}
      {(this.state.highScorePopup)?<HighScoreModal scores={(this.state.mapObj) ? this.state.mapObj.data.highScores : null} scoresName={(this.state.mapObj) ? this.state.mapObj.data.highScoresName : null} closeHighScorePopUp={this.closeHighScorePopUp}/>:null}
      {(this.state.gameOver) ? <GameOver winTime={this.state.winTime} closeGameOverPopUp={this.closeGameOverPopUp}/>:null}
      <div className="mainContent">
        <div className="imgContainer">
          <img
            className="actualImg"
            id="mainImg"
            src={(this.state.mapObj) ? `${this.state.mapObj.data.imgUrl}` :"https://cdn0.iconfinder.com/data/icons/arrows-182/24/corner-arrow-left-top-512.png"}
            alt="waldo map"
            onMouseDown={this.imgClicked}
          />

          <div
            className="tagArea"
            style={
              this.state.tagBoxOn ? this.state.tagBoxStyle : this.displayNone
            }
          >
            <div className="tagBox"></div>
            <DropOptions posX={this.state.posX} posY={this.state.posY} mapObj={this.state.mapObj} charToFind={this.state.charToFind} handleCharFound={this.handleCharFound}/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
