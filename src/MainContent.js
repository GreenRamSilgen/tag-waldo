import React from "react";
import "./MainContent.css";
import { DropOptions } from "./DropOptions";
import {LeftBar} from './LeftBar';
import {NewMapModal} from './NewMapModal';


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
      tagBoxStyle: {
        left: "0px",
        top: "0px",
      },
      tagBoxOn: false,
      posX:'',
      posY:'',
      newMapPopup:false,
      highScorePopup: false,

      mapObj:null,
    };

    this.displayNone = {
      display: "none",
    };


    this.imgClicked = this.imgClicked.bind(this);
    this.handleNewMapClick = this.handleNewMapClick.bind(this);
    this.closeNewMapPopUp = this.closeNewMapPopUp.bind(this);
    this.setMapObj = this.setMapObj.bind(this);
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

  setMapObj(obj){
    this.setState({
      newMapPopup:false,
      mapObj: obj,
    })
  }
  render() {
    console.log(this.state.mapObj);
    return (
      <div>
      <LeftBar newMapClick={this.handleNewMapClick}/>
        
      {(this.state.newMapPopup) ? <NewMapModal setMapObj={this.setMapObj} closeNewMapPopUp={this.closeNewMapPopUp}/> : null}

      <div className="mainContent">
        <div className="imgContainer">
          <img
            className="actualImg"
            id="mainImg"
            src="https://i.pinimg.com/originals/e7/15/f7/e715f7d4c3947a1547c468dc9fac37b5.jpg"
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
            <DropOptions posX={this.state.posX} posY={this.state.posY} />
          </div>
        </div>
        <div>{(this.state.mapObj) ?this.state.mapObj.data.imgUrl : null}</div>
      </div>
      </div>
    );
  }
}
