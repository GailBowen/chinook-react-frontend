const generateLetters = (a) => {
  const theLetters = [];

  for (let i=0; i<a.length; i++) {
    if (a.length<1) {
      continue
    }

    const l = a[i][0];

    if (theLetters.indexOf(l)===-1) {
      theLetters.push(l);
    }
  }
  
  return theLetters;
}
export default generateLetters;
