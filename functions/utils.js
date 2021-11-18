export function brightenColor (value, type, howMuch) {
  switch (type){
    case 'hex': 
      const arr = value.split('').slice(1,value.length).map(x => {
        let newHex = parseInt(x,16) + howMuch;
        if (newHex > 15) return 'f';
        else return newHex.toString(16);
      });
      return `#${arr.join('')}`;
    case 'rgb':
      break;
    default:
      break;
  }
}