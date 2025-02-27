// App.js is the top most class component that pulls in and
// renders our front-end layout. It pulls in our canvas and
// composer components defined in separate files. 
import React, { Component } from 'react';
import Canvas from './Canvas';
import Composer from './Composer';
import autoBind from 'auto-bind'; 
import './App.css';


class App extends Component {
  //-----------------------------------------------------------------------------------------------
  // constructor 
  //-----------------------------------------------------------------------------------------------
  // set up the App class component. the autobind(this) component is brought in here to
  // make sure call back functions have access to "this." Google led me to this solution.
  // Each time we create a sticky, is is placed 50px below and 50px to the right of the
  // previous sticky. this.x and this.y are used to track the placement of the previous 
  // sticky. 
  constructor(props) {
    super(props);
    autoBind(this);
    this.x = 50;
    this.y = 50;

    // go into localStorage, get stickies as a string, if the string exists use 
    // JSON.parse to convert it into a array of objects called stickies. Otherwise
    // initialize stickies to an empty array. 
    let stickies = localStorage.getItem('stickies')
    if (stickies) {
      stickies = JSON.parse(stickies); 
    } else {
      stickies = [];
    }

    // state is a set of variables that are used in the render function. 
    // the only thing we have in our state is the array of stickies.
    this.state = {
      email: null,
      stickies: stickies,
    };
  }

  //-----------------------------------------------------------------------------------------------
  //  createStickyCallBack
  //-----------------------------------------------------------------------------------------------
  // CallBack function that tells the app when a new sticky is being 
  // created. Function takes newSticky as an argument and pushes a
  // newSticky onto our "stickies" array. The new sticky's 
  // initial size and position are set. The new sticky
  // is stored in localStorage by converting the array of objects 
  // to a string using JSON.stringify. The function is called from the Composer.
  createStickyCallBack(newSticky) {
    newSticky.x = this.x;
    this.x += 50;
    if (this.x > 300) {
      this.x = 50;
    }
    newSticky.y = this.y;
    this.y += 50;
    if (this.y > 300) {
      this.y = 50;
    }
    console.log("composerCallBack");
    const state = this.state;
    const stickies = state.stickies;

    stickies.push(newSticky);
    localStorage.setItem("stickies", JSON.stringify(stickies));
    this.setState({
      stickies, 
    });
  }

  //-----------------------------------------------------------------------------------------------
  //  modifyStickyCallBack
  //-----------------------------------------------------------------------------------------------
  // CallBack function that recognizes changes made to a sticky in the 
  // stickies array and saves those changes in localStorage by converting 
  // the array of objects to a string using JSON.stringify. This function is called
  // from the Sticky component.
  modifyStickyCallBack() {
    const state = this.state;
    const stickies = state.stickies;
    console.log(JSON.stringify(stickies));
    localStorage.setItem("stickies", JSON.stringify(stickies));
  }

  //-----------------------------------------------------------------------------------------------
  // submit
  //-----------------------------------------------------------------------------------------------
  submit(event) {
    event.preventDefault();
    this.setState({ email: 'lara' });
  }
  //-----------------------------------------------------------------------------------------------
  // render
  //-----------------------------------------------------------------------------------------------
  // A function called by react. It returns markup to be rendered by react. In this case
  // it returns two components: the Composer and the Canvas. The props on the compoenent 
  // tags are passed to the constructor of the corresponding class instance.

  render() {
    const state = this.state;
    const stickies = state.stickies;
    const email = state.email;

    const renderMain = () => {
      return (
        <div className="App">
          <Composer createStickyCallBack={this.createStickyCallBack}/>
          <Canvas stickies={stickies} modifyStickyCallBack={this.modifyStickyCallBack}/>
        </div>
      );
    };

    const renderTable = () => {
      return (
        <table>          
          <tbody>
            <tr>
              <td>Email Address:</td>
              <td>  
                <label className="email-label">
                  <input type="email" placeholder="Email Address" className="email-input" />
                </label>  
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>               
                <label className="password-label">
                  <input type="password" placeholder="Password" className="password-input" />
                </label>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit" className="submit">Sign In</button>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }


    const renderLoginForm = () => {
      return (
        <div className="App">
          <div className="login">
            <div className="table-wrapper"> 
              <h1 className="stick-ease-h1">Stick Ease</h1>     
              <form onSubmit={this.submit}>
                { renderTable()}    
              </form>
              <div className="signature-line-wrapper">
                <div className="signature-line">
                  <span>made with ♥ by</span>   
                </div>
                <div className="signature-line">
                  <span>&copy; 2022 Lara DeStein</span>   
                </div>
              </div>  
            </div>
          </div>  
        </div>    
      );
    };

    const renderContent = () => {
      if (email === null) {
        return renderLoginForm();
      } else {
        return renderMain();
      }
    };
 
    return (
      <div>
        { renderContent() }
      </div>
    );
  };
}

export default App;



