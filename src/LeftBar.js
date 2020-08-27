import React from "react";
import './LeftBar.css'

class LeftBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      barClicked: false,
    };

    this.barStyle = {
        display: "block",
    }
    this.removeBarStyle ={
        display: "none",
    }


    this.leftBarAnim = this.leftBarAnim.bind(this);
  }

  leftBarAnim(){
      this.setState({
          barClicked: !this.state.barClicked,
      });
      console.log("click");
  }

  render() {
    if(this.state.barClicked){
      document.querySelector("html").style.overflow = "hidden";
    }else{
      document.querySelector("html").style.overflow = "";
    }
    return (
      <div>
        <nav>
          <div  onClick={this.leftBarAnim} className="sideModalBtn"><i className="fas fa-bars fa-2x"></i></div>
        </nav>

        <div  onClick={this.leftBarAnim} className={(this.state.barClicked) ? "sideModalBack slideOutAnim" : "sideModalBack" } style={(this.state.barClicked)? this.barStyle : this.removeBarStyle}>
          <div className="sideModal">
            <div className="sideModal__content">
              <div className="sideModal__contentItem">
                <button className="leftBarBtns" onClick={this.props.newMapClick}>NEW MAP</button>
              </div>
              <div className="sideModal__contentItem">
                <button className="leftBarBtns" onClick={this.props.highScoreClick}>HIGH SCORE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {LeftBar}