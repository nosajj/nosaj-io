import React, { PropTypes, Component } from 'react';
import Button from '../Button';
import withMessageHooks from '../../hocs/withMessageHooks';

import './message.scss';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Underscored to prevent possible conflicts, as this component is able to
      // update its own state from the form
      _notice: null,
      _sending: false,
      // Form fields state
      name: null,
      email: null,
      message: null,
    };
  }
  
  static propTypes = {
    onToggle: PropTypes.func,
    sendMessage: PropTypes.func,
  }
  
  render() {
    const { _notice, _sending } = this.state;
    const { onToggle } = this.props;
    
    return (
      <section
        className="message-wrapper" 
        onClick={() => onToggle(false)}
      >
        <header className="message-header">
          <h1 className="caps message-header__title">Send a message</h1>
          <span className="message-header__sub">I do my best to respond to new messages within 24h.</span>
        </header>
        <div onClick={e => e.stopPropagation()} className="message-box">
          <form onSubmit={this.handleFormSubmit} className="message-form">
            <input
              onChange={(e) => this.handleFormUpdate('name', e.target.value)}
              className="message-field message-field--input"
              type="text"
              name="name"
              placeholder="your name*" 
            />
            <input
              onChange={(e) => this.handleFormUpdate('email', e.target.value)}
              className="message-field message-field--input"
              type="email"
              name="email"
              placeholder="email address*" 
            />
            <textarea
              onChange={(e) => this.handleFormUpdate('message', e.target.value)}
              className="message-field message-field--textarea" 
              name="message"
              placeholder="message..."></textarea>
            <Button className="message-field--button" type="submit">{_sending ? 'Sending...' : 'Send it'}</Button>
          </form>
        </div>
        {_notice && <div className="message-notice">{_notice}</div>}
      </section>
    )
  }
  
  notice = (noticeStr) => this.setState({ _notice: noticeStr });
  
  handleFormUpdate = (field, val) => {
    if (! (field in this.state)) return;
    this.setState({
      [field]: val
    });
  }
  
  handleFormSubmit = async (e) => {
    e.preventDefault();
    if (this.state._sending) return;
    if (! this.state.name || ! this.state.email || ! this.state.message) {
      return this.notice(`Please make sure you've filled out all the fields`)
    }
    this.setState({ _sending: true });
    const { sendMessage, onToggle } = this.props;
    const message = this.composeMessageString();
    const success = await sendMessage(message);
    if (success) {
      onToggle(false);
    } else {
      this.setState({ _sending: false });
      this.notice(`Damn it! your message could'nt be sent. While I work on fixing this, email me direct on jason@nosaj.io instead.`);
    }
  }
  
  composeMessageString() {
    const { name, email, message } = this.state;
    if (! name || ! email || ! message) return console.warn('All fields required');
    return `*Message from nosaj.io*
--------------
*${name}* <${email}>

${message}`;
  }
}

export default withMessageHooks(Message);
