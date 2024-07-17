import {LitElement, html, css, svg} from 'lit';

class ReflectionGraph extends LitElement {
    static properties = {
        graph: { type: Array },
        width: { type: Number },
        height: { type: Number }
    };

    constructor() {
        super();
        this.width = 500;
        this.height = 750;
        this.graph = [
            // {
            //     day: 'Monday',
            //     tag: 'Mon',
            //     score: '5'
            // }, {
            //     day: 'Tuesday',
            //     tag: 'Tue',
            //     score: '4'
            // }, {
            //     day: 'Wednesday',
            //     tag: 'Wed',
            //     score: '3'
            // }, 
            {
                day: 'Thursday',
                tag: 'Thu',
                score: '2'
            }, {
                day: 'Friday',
                tag: 'Fri',
                score: '3'
            }, {
                day: 'Saturday',
                tag: 'Sat',
                score: '4'
            }, {
                day: 'Sunday',
                tag: 'Sun',
                score: '5'
            }
        ]
    }

    static styles = css`
    svg {
      width: 100%;
      height: 100%;
      background-color: #f9f9f9;
    }
    .emoji {
      font-size: 24px;
    }
  `;

  render() {
    const maxScore = Math.max(...this.graph.map(item => parseInt(item.score, 10)));
    const svgHeight = this.height;
    const svgWidth = this.width - 50;
    const pointSpacing = svgWidth / (this.graph.length - 1);
    
    const points = this.graph.map((item, index) => {
      const x = index * pointSpacing;
      const y = svgHeight - (parseInt(item.score, 10) / maxScore) * (svgHeight - 20);
      return `${x},${y}`;
    }).join(' ');

    return html`
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}">
        <polyline 
          fill="none" 
          stroke="steelblue" 
          stroke-width="2" 
          points="${points}">
        </polyline>
        ${this.graph.map((item, index) => {
          const x = index * pointSpacing;
          const y = svgHeight - (parseInt(item.score, 10) / maxScore) * (svgHeight - 20);
          return svg`
            <g>
              <text 
                x="${x}" 
                y="${svgHeight - 10}" 
                text-anchor="middle">
                ${item.tag}
              </text>
              ${item.day === 'Sunday' && item.score === '5' ? svg`
                <text 
                  x="${x}" 
                  y="${y}" 
                  text-anchor="middle" 
                  class="emoji">
                  😊
                </text>
              ` : ''}
            </g>
          `;
        })}
      </svg>
    `;
  }
}

customElements.define('reflection-graph', ReflectionGraph);
