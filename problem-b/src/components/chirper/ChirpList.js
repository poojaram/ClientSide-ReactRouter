import React, { Component } from 'react'; //import React Component
import Moment from 'react-moment';
import './Chirper.css'; //load module-specific CSS

import firebase from 'firebase/app';
//A list of chirps that have been posted
export default class ChirpList extends Component {
  constructor(props){
    super(props);
    this.state = {chirps:[]};
  }

  componentDidMount() {
    this.chirpRef  = firebase.database().ref('chirps');
    this.chirpRef.on('value', (snapshot) => {
      let obj = snapshot.val();

      this.setState({chirps:obj});
    });
  }

  componentWillUnmount() {
    this.chirpRef.off();
  }

  render() {
    if(!this.state.chirps) return null; //if no chirps, don't display
  
    let chirpKeys = Object.keys(this.state.chirps);
    let chirpArray = chirpKeys.map((key) => {
      let chirpObj = this.state.chirps[key];
      chirpObj.id = key;
      return chirpObj;
    });

    chirpArray.sort(function(a, b){return b.time - a.time});
    
    let chirpItems = chirpArray.map((chirp)=> {
      return <ChirpItem chirp={chirp} key={chirp.id} currentUser={this.props.currentUser} />
    });
    

    return (
      <div className="container">
          {chirpItems}
      </div>);
  }
}

//A single Chirp
class ChirpItem extends Component {

  likeChirp = () => {
    let likeRef = firebase.database().ref('chirps/' + this.props.chirp.id + '/likes');

    let likes = {};
  
    likeRef.once("value", snapshot => {
      const v = snapshot.val();
    
      if (v) {
        console.log(v);
        likes = v;
      }
    });

    if (likes[this.props.currentUser.uid]) {
      likes[this.props.currentUser.uid] = null;
    }
    else {
      likes[this.props.currentUser.uid] = true;
    }

   
    firebase.database().ref('chirps/' + this.props.chirp.id + '/likes').set(likes).catch((error) => {
      console.log(error.errorMessage);
    });
  }
 
  render() {
    let chirp = this.props.chirp; //current chirp (convenience)

    //counting likes
    let likeCount = 0; //count likes
    let userLikes = false; //current user has liked
    if(chirp.likes){
      likeCount = Object.keys(chirp.likes).length;
      if(chirp.likes[this.props.currentUser.uid]) //if user id is listed
        userLikes = true; //user liked!
    }

    return (
      <div className="row py-4 bg-white border">
        <div className="col-1">
          <img className="avatar" src={chirp.userPhoto} alt={chirp.userName+' avatar'} />
        </div>
        <div className="col pl-4 pl-lg-1">

          <span className="handle">{chirp.userName} {/*space*/}</span>

          <span className="time"><Moment date={chirp.time} fromNow/></span>

          <div className="chirp">{chirp.text}</div>

          {/* A section for showing chirp likes */}
          <div className="likes">          
            <i className={'fa fa-heart '+(userLikes ? 'user-liked': '')} aria-label="like" onClick={this.likeChirp} ></i>
            <span>{/*space*/} {likeCount}</span>
          </div>
        </div>
      </div>      
    );
  }
}
