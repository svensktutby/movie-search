function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../../assets/icons/', true, /.*\.svg$/i));

// fetch('http://localhost:9000/assets/img/sprite.svg').then((res) => res.text()).then((data) => {
//   document.getElementById('svg-sprite').innerHTML = data;
// });
