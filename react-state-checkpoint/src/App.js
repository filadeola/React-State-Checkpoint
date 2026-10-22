import { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    person: {
      fullName: 'Alex Morgan',
      bio: 'Curious about people, places, and the stories that connect them.',
      imgSrc:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&q=85',
      profession: 'Travel Photographer',
    },
    shows: false,
    elapsedSeconds: 0,
  };

  componentDidMount() {
    const mountedAt = Date.now();
    this.timerId = window.setInterval(() => {
      this.setState({
        elapsedSeconds: Math.floor((Date.now() - mountedAt) / 1000),
      });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  toggleProfile = () => {
    this.setState(({ shows }) => ({ shows: !shows }));
  };

  render() {
    const { person, shows, elapsedSeconds } = this.state;

    return (
      <main className="page">
        <section className="checkpoint" aria-labelledby="page-title">
          <p className="eyebrow">React state checkpoint</p>
          <h1 id="page-title">A little about me</h1>
          <p className="intro">
            A class component, its state, and a timer powered by the component
            lifecycle.
          </p>

          <button
            className="profile-toggle"
            type="button"
            onClick={this.toggleProfile}
            aria-expanded={shows}
            aria-controls="person-profile"
          >
            {shows ? 'Hide profile' : 'Show profile'}
          </button>

          {shows && (
            <article className="profile" id="person-profile">
              <img className="profile-image" src={person.imgSrc} alt={person.fullName} />
              <div className="profile-copy">
                <p className="profession">{person.profession}</p>
                <h2>{person.fullName}</h2>
                <p>{person.bio}</p>
              </div>
            </article>
          )}

          <p className="timer" role="status" aria-live="polite">
            Time since this component mounted:{' '}
            <strong>
              {elapsedSeconds} {elapsedSeconds === 1 ? 'second' : 'seconds'}
            </strong>
          </p>
        </section>
      </main>
    );
  }
}

export default App;
