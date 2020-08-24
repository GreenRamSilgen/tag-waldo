import React from "react";
import './LeftBar.css'

class LeftBar extends React.Component{
  constructor(props) {
    super(props);
    this.barStyle = {
        display: "block",
    }
    this.removeBarStyle ={
        display: "none",
    }
    this.state = {
      barClicked: false,
    };

    this.leftBarAnim = this.leftBarAnim.bind(this);
  }

  leftBarAnim(){
      this.setState({
          barClicked: !this.state.barClicked,
      });
      console.log("click");
  }

  render() {

    return (
      <div>
        <nav>
          <div  onClick={this.leftBarAnim} className="sideModalBtn"><i className="fas fa-bars fa-2x"></i></div>
        </nav>

        <div  onClick={this.leftBarAnim} className={(this.state.barClicked) ? "sideModalBack slideOutAnim" : "sideModalBack" } style={(this.state.barClicked)? this.barStyle : this.removeBarStyle}>
          <div className="sideModal">
            <div className="sideModal__content">
              <div className="sideModal__contentItem">
                <a href="#" target="__blank">
                  HOME
                </a>
              </div>
              <div className="sideModal__contentItem">
                <a href="#" target="__blank">
                  PRODUCT
                </a>
              </div>
              <div className="sideModal__contentItem">
                <a href="#" target="__blank">
                  PRICING
                </a>
              </div>
              <div className="sideModal__contentItem">
                <a href="#" target="__blank">
                  CONTACT US
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {LeftBar}