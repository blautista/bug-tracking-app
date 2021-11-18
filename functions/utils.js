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

export function priorityToColor (priority) {
  switch (priority) {
    case 'LOW': return {backgroundColor: "#6969ff", color: 'white'};
    case 'MEDIUM': return {backgroundColor: '#faff5d', color: 'black'};
    case 'HIGH': return {backgroundColor: '#ff5d5d', color: 'white'};
    default: return {backgroundColor: 'blue', color: 'white'};
  }
}