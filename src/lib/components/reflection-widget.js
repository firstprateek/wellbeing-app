import { LitElement, html, css } from 'lit';

class ReflectionWidget extends LitElement {
  static properties = {
    selectedMoodId: { type: String },
    moods: { type: Array }
  };

  constructor() {
    super();
    this.selectedMoodId = '';
    this.moods = [
      {
        id: 'very-happy',
        score: 5,
        emoji: '😀',
        title: 'Perfect! Kudos on taking the time to reflect on your feelings.',
        description: 'Consider reflecting on the reason behind the way you are feeling.',
        backgroundColor: '#C694FF'
      },
      {
        id: 'happy',
        score: 4,
        emoji: '😊',
        title: 'Great! Kudos on taking the time to reflect on your feelings.',
        description: 'Consider reflecting on the reason behind the way you are feeling.',
        backgroundColor: '#E0BBE4'
      },
      {
        id: 'neutral',
        score: 3,
        emoji: '😐',
        title: 'Great job on taking the time to reflect on your feelings.',
        description: 'Consider reflecting on the reason behind the way you are feeling.',
        backgroundColor: '#FCD2F1'
      },
      {
        id: 'sad',
        score: 2,
        emoji: '🙁',
        title: 'Good job on taking the time to relfect on your feeling.',
        description: 'Consider taking a break and then reflecting on the reason for the way you are feeling.',
        backgroundColor: '#F5B3C4'
      },
      {
        id: 'very-sad',
        score: 1,
        emoji: '😔',
        title: 'Good job on taking the time to relfect on your feeling.',
        description: 'Please consider taking a break and then reflecting on the reason for the way you are feeling.',
        backgroundColor: '#FC9A9A'
      }
    ];
    this.initialMessage = {
      title: 'How are you feeling about the day?',
      description: 'Taking a moment to reflect each day can help you see trends over time.'
    }
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      display: grid;
      background-color: var(--bg-color, #fff);
      transition: background-color 0.2s ease-in-out;
      grid-template-rows: repeat(5, 1fr);
      grid-template-columns: repeat(5, 1fr);
      place-items: center;
      box-sizing: border-box;
      padding: 20px;
    }
    .emoji-1 {
      grid-row: 4/5;
      grid-column: 1/2;
    }
    .emoji-2 {
      grid-row: 4/5;
      grid-column: 2/3;
    }
    .emoji-3 {
      grid-row: 4/5;
      grid-column: 3/4;
    }
    .emoji-4 {
      grid-row: 4/5;
      grid-column: 4/5;
    }
    .emoji-5 {
      grid-row: 4/5;
      grid-column: 5/6;
    }
    .emoji {
      display: inline-block;
      font-size: 3rem;
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
    }
    .emoji:hover {
      transform: scale(1.5);
    }
    .selected {
      grid-row: 1/2;
      grid-column: 1/2;
      transform: scale(1.5);
    }
    .hide {
      opacity: 0;
    }
    .initial-title {
      grid-row: 1/3;
      grid-column: 1/6;
    }
    .initial-description {
      grid-row: 2/4;
      grid-column: 1/6;
    }
    .title {
      grid-row: 2/4;
      grid-column: 1/6;
    }
    .description {
      grid-row: 3/5;
      grid-column: 1/6;
    }
    .message {
      justify-self: flex-start;
      font-size: 1.2rem;
      opacity: 0;
      animation: fadeIn 1s forwards 0.2s;
    }
    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }
  `;

  findMoodByEmoji (emoji) {
    return this.moods.find(mood => mood.emoji === emoji);
  }

  handleEmojiClick(event) {
    this.selectedMoodId = event.target.textContent.trim();
    const selectedMood = this.findMoodByEmoji(this.selectedMoodId);
    this.style.setProperty('--bg-color', selectedMood.backgroundColor);
    event.stopPropagation();
  }

  render() {
    return html`
      ${!this.selectedMoodId ? html`
        <div class="initial-title message">
          <h1>${this.initialMessage.title}</h1>
        </div>
        <div class="initial-description message">
          <p>${this.initialMessage.description}</p>
        </div>
      ` : ''}
      ${this.moods.map(({ emoji }, index) => html`
        <span
          class="emoji emoji-${`${index+1}`} ${this.selectedMoodId && this.selectedMoodId !== emoji ? 'hide' : ''} ${this.selectedMoodId === emoji ? 'selected' : ''}"
          @click="${this.handleEmojiClick}"
        >
          ${emoji}
        </span>
      `)}
      ${this.selectedMoodId ? html`
        <div class="title message">
          <h1>${this.findMoodByEmoji(this.selectedMoodId).title}</h1>
        </div>
        <div class="description message">
          <p>${this.findMoodByEmoji(this.selectedMoodId).description}</p>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('reflection-widget', ReflectionWidget);
