import React, { Component } from 'react';
import Age from './Age.js'
import logo from './images/logo.svg';

class App extends Component {
  render() {
    const birthday = new Date('1989-01-18T00:00:00')

    return (
      <div className="app">
        <div className="section section--main">
          <div className="header">
            <img className="avatar" src="http://www.gravatar.com/avatar/c37474003e2798e695e7cbbcff39b3d8?s=200" alt="Mike Carter" />
            <h1>Mike Carter</h1>
          </div>

          <h2>
            About Me
            <span className="emojis">👨👩🏻🐕</span>
          </h2>

          <p>I'm a <Age birthday={birthday} /> year old product-focussed Software Engineer living in Canterbury with my fiancée Sylvie and my dog Bramley.</p>

          <p>I like movies, music, and keeping healthy with regular gym sessions. I am also learning to sail this year.</p>

          <h2>
            My Work
            <span className="emojis">👨‍🔧💻📱</span>
          </h2>

          <p>I'm building <a href="https://www.weareleaf.com" target="_blank" rel="noopener"><img className="image--text" src={logo} alt="Logo" /></a>, where we transform existing businesses with digital products that let them serve customers more effectively, and at massive scale.</p>

          <p>Before this, I was a Software Architect at <a href="https://www.holidayextras.co.uk" target="_blank" rel="noopener">Holiday Extras</a> where I played a small role in growing a development team from 25 to over 100 people, while helping to deliver profitable travel software used by millions.</p>

          <h2>
            My Writing
            <span className="emojis">👨‍💻✍️📖</span>
          </h2>

          <p>I write about <b>software engineering</b> and <b>good work habits</b>. More recently focussing on the engineering challenges of building software products in within established businesses:</p>

          <ul>
            <li>
              <a href="https://medium.com/leaf-software/the-power-of-development-phases-c65aa077e0ca" target="_blank" rel="noopener">The power of small development phases</a>
            </li>
            <li>
              <a href="https://medium.com/leaf-software/a-home-office-for-productivity-d23f0aee627b" target="_blank" rel="noopener">A home office for productivity</a>
            </li>
            <li>
              <a href="https://medium.com/leaf-software/behavioural-traps-in-software-teams-e27806f35884" target="_blank" rel="noopener">Behavioural traps in software teams</a>
            </li>
            <li>
              <a href="https://medium.com/leaf-software/working-too-much-please-stop-8dc0ac3ec179" target="_blank" rel="noopener">Working too much? Please stop</a>
            </li>
            <li>
              <a href="https://medium.com/leaf-software/5-tips-for-actually-shipping-a-side-project-72080f7b8d5e" target="_blank" rel="noopener">5 tips for actually shipping a side project</a>
            </li>
            <li>
              <a href="https://medium.com/leaf-software/there-are-no-excuses-for-poor-engineering-92573e51ece0" target="_blank" rel="noopener">There are no excuses for poor engineering in 2017</a>
            </li>
            <li>
              <a href="http://tech.holidayextras.co.uk/2015/03/18/5-tips-for-a-smoother-code-review-process/" target="_blank" rel="noopener">5 tips for a smoother code review process</a>
            </li>
            <li>
              <a href="http://tech.holidayextras.co.uk/misc/2014/03/09/taming-technical-debt/" target="_blank" rel="noopener">Taming your Technical Debt</a>
            </li>
            <li>
              <a href="http://tech.holidayextras.co.uk/mobile/2014/01/20/getting-performance-cordova-based-application/" target="_blank" rel="noopener">5 tips for great performance from your Cordova app</a>
            </li>
          </ul>

          <h2>
            Contact
            <span className="emojis">🌍💌⌨️</span>
          </h2>

          <p>You can email me at <a href="mailto:mike@mcarter.me">mike@mcarter.me</a>, follow me on <a href="https://twitter.com/mcarterj" target="_blank" rel="noopener">Twitter</a>, or see me living my best life on <a href="https://www.instagram.com/mike_j_carter/" target="_blank" rel="noopener">Instagram</a>. </p>
        </div>
      </div>
    )
  }
}

export default App
