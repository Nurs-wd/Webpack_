import Post from '@models/post';
import '@/styles/styles.css';
// import json from './assets/json'
import WebpackLogo from './assets/webpack.png';
// import xml from './assets/data.xml'
// import './babel'

const post = new Post("Webpack post title", WebpackLogo)
document.getElementById('text').innerHTML = post.toString()
// console.log("Webpack: " + post.toString())
// console.log('json :', json)
// console.log('Xml is ',xml) 