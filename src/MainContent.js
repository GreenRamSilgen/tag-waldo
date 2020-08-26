import React from "react";
import "./MainContent.css";
import { DropOptions } from "./DropOptions";
import firebase from 'firebase';

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
    };

    this.displayNone = {
      display: "none",
    };
    this.imgClicked = this.imgClicked.bind(this);
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
  render() {
    return (
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
      </div>
    );
  }
}
