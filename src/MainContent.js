import React from 'react';
import './MainContent.css';

function FindPosition(theImg)
{
  if(typeof( theImg.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; theImg; theImg = theImg.offsetParent)
    {
      posX += theImg.offsetLeft;
      posY += theImg.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ theImg.x, theImg.y ];
    }
}

function GetCoordinates(e)
{
  let PosX = 0;
  let PosY = 0;
  let ImgPos;
  ImgPos = FindPosition(document.querySelector(".actualImg"));
  if (e.pageX || e.pageY)
  {
    PosX = e.pageX;
    PosY = e.pageY;
  }
  else if (e.clientX || e.clientY)
    {
      PosX = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];
  console.log("X:"+PosX);
  console.log(("Y:"+PosY));
}

export class MainContent extends React.Component{
  constructor(props){
    super(props);

    this.imgClicked = this.imgClicked.bind(this);
  }

  imgClicked(e){
    GetCoordinates(e);
  }
    render(){
        return(
            <div className="imgContainer">
                <img className="actualImg" src="https://i.pinimg.com/originals/e7/15/f7/e715f7d4c3947a1547c468dc9fac37b5.jpg" alt="waldo map" onMouseDown={this.imgClicked}/>
            </div>
        );
    }
}