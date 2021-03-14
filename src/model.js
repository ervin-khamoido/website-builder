import image from './assets/image.png';
import {TitleBlock, TextBlock, ColumnsBlock, ImageBlock} from './classes/blocks';

const text = 'JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.';

export const model = [
   new TitleBlock('Website buider', {
      tag: 'h1',
      styles: {
         background: 'linear-gradient(to right, #ff0099, #493240)',
         color: '#fff',
         'text-align': 'center'
      }
   }),
   new ImageBlock(image, {
      styles: {
         padding: '2 rem 0',
         display: 'flex',
         'justify-content': 'center'
      },
      imageStyles: {
         width: '500px',
         height: 'auto'
      },
      alt: 'It is a image'
   }),
   new TextBlock(text, {
      styles: {
         background: 'linear-gradient(to left, #f2994a, #f2c94c)',
         padding: '1rem',
         'font-weight': 'bold'
      }
   }),
   new ColumnsBlock([
      'JavaScript app without libraries and frameworks!',
      'JavaScript is fun!',
      'React + NodeJS = Forever!'
   ], {
      styles: {
         background: 'linear-gradient(to bottom, #8e2de2, #4a00e0)',
         padding: '2rem',
         color: '#fff',
         'font-weight': 'bold',
         'text-align': 'center'
      }
   })
];