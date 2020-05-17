// Greeter.js
// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = "Hi there and greetings! I\'m using a config file!";
//   return greet;
// };

import React, { Component } from 'react'
import config from './config.json'
import styles from './Greeter.css';//导入

console.log(styles, styles.root)

class Greeter extends Component {
  render() {
    return (
      <div className={styles.root}>
        {config.greetText}
      </div>
    )
  }
}

export default Greeter