import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLInkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '24b940540c0e4e19b53d7b182f2019cf'
});

const particlesOptions = {
  particles : {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked:{
      enable_auto: false,
    },
  },
  
}
class App extends Component {

  state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('recognizedImg');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log("Oops", err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const { isSignedIn, route, imageUrl, box } = this.state
    return (
      <div className="App">
      <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' 
        ?  <div>
            <Logo/>
            <Rank/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imageUrl={imageUrl} box={box}/>
          </div>
        : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }

}

export default App;
