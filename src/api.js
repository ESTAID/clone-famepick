export default function() {
  return fetch('http://localhost:3000/data.json').then(res => res.json());
}
