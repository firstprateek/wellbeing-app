import './styles.css';
import './lib/components/my-element.js';

const element = document.createElement('div');
element.innerHTML = 'Hello!';
document.body.appendChild(element);
