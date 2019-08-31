import React, { Component } from "react";
import Age from "./Age.js";
import logo from "./images/logo.svg";

class App extends Component {
  render() {
    const birthday = new Date("1989-01-18T00:00:00");
    return (
      <div className="app">
        <div className="section section--main">
          <div className="header">
            <img
              className="avatar"
              src="http://www.gravatar.com/avatar/c37474003e2798e695e7cbbcff39b3d8?s=200"
              alt="Mike Carter"
            />
            <h1>Mike Carter</h1>
          </div>

          <h2>
            About Me
            <span className="emoji" role="img" aria-label="Hand waving">
              👋
            </span>
          </h2>

          <p>
            I'm a <Age birthday={birthday} /> year old Software Engineer from
            Canterbury, where I live with my fiancée Sylvie, and our dog
            Bramley.
          </p>

          <p>
            I like movies, music, and keeping healthy with regular gym sessions.
            I am also learning to sail.
          </p>

          <h2>
            My Work
            <span className="emoji" role="img" aria-label="Man at computer">
              👨‍💻
            </span>
          </h2>

          <p>
            I'm building{" "}
            <a
              href="https://www.weareleaf.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="image--text" src={logo} alt="Logo" />
            </a>{" "}
            together with{" "}
            <a
              href="https://weareleaf.com/company"
              target="_blank"
              rel="noopener noreferrer"
            >
              a few talented folks
            </a>
            , where we specialise in building digital products &amp; services
            that automate business.
          </p>

          <p>
            Before this, I was a Software Architect at{" "}
            <a
              href="https://www.holidayextras.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Holiday Extras
            </a>{" "}
            where I played a small role in growing a development team from 25 to
            over 100 people, while helping to deliver profitable travel software
            used by millions.
          </p>

          <h2>
            My Writing
            <span className="emoji" role="img" aria-label="Hand writing">
              ✍️
            </span>
          </h2>

          <p>
            I write about <b>software engineering</b> and{" "}
            <b>good work habits</b>. More recently focussing on the engineering
            challenges of driving software automation in within established
            businesses:
          </p>

          <ul>
            <li>
              <a
                href="https://weareleaf.com/blog/how-to-thrive-in-an-automated-business-world"
                target="_blank"
                rel="noopener noreferrer"
              >
                How to thrive in an automated business world
              </a>
            </li>
            <li>
              <a
                href="https://weareleaf.com/blog/automate-where-it-matters-with-process-maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                Automate where it matters with process maps
              </a>
            </li>
            <li>
              <a
                href="https://weareleaf.com/blog/goals-matter"
                target="_blank"
                rel="noopener noreferrer"
              >
                Goals matter
              </a>
            </li>
            <li>
              <a
                href="https://weareleaf.com/blog/the-power-of-small-development-phases"
                target="_blank"
                rel="noopener noreferrer"
              >
                The power of small development phases
              </a>
            </li>
            <li>
              <a
                href="https://weareleaf.com/blog/a-home-office-for-productivity"
                target="_blank"
                rel="noopener noreferrer"
              >
                A home office for productivity
              </a>
            </li>
            <li>
              <a
                href="https://weareleaf.com/blog/behavioural-traps-in-software-teams"
                target="_blank"
                rel="noopener noreferrer"
              >
                Behavioural traps in software teams
              </a>
            </li>
            <li>
              <a
                href="https://weareleaf.com/blog/working-too-much-please-stop"
                target="_blank"
                rel="noopener noreferrer"
              >
                Working too much? Please stop
              </a>
            </li>
            <li>
              <a
                href="https://weareleaf.com/blog/5-tips-for-actually-shipping-a-side-project"
                target="_blank"
                rel="noopener noreferrer"
              >
                5 tips for actually shipping a side project
              </a>
            </li>
            <li>
              <a
                href="https://weareleaf.com/blog/there-are-no-excuses-for-poor-engineering-in-2017"
                target="_blank"
                rel="noopener noreferrer"
              >
                There are no excuses for poor engineering in 2017
              </a>
            </li>
            <li>
              <a
                href="http://tech.holidayextras.co.uk/2015/03/18/5-tips-for-a-smoother-code-review-process/"
                target="_blank"
                rel="noopener noreferrer"
              >
                5 tips for a smoother code review process
              </a>
            </li>
            <li>
              <a
                href="http://tech.holidayextras.co.uk/misc/2014/03/09/taming-technical-debt/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Taming your Technical Debt
              </a>
            </li>
            <li>
              <a
                href="http://tech.holidayextras.co.uk/mobile/2014/01/20/getting-performance-cordova-based-application/"
                target="_blank"
                rel="noopener noreferrer"
              >
                5 tips for great performance from your Cordova app
              </a>
            </li>
          </ul>

          <h2>
            Contact
            <span className="emoji" role="img" aria-label="Keyboard">
              ⌨️
            </span>
          </h2>

          <p>
            You can email me at{" "}
            <a href="mailto:mike@mcarter.me">mike@mcarter.me</a>, follow me on{" "}
            <a
              href="https://twitter.com/mcarterj"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            , or see me living my best life on{" "}
            <a
              href="https://www.instagram.com/mike_j_carter/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            .{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
