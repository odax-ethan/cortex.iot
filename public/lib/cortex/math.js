

//calcuate A relative delta compares the difference between two numbers,
//Initial (i) and Final (f), as a percentage of one of the numbers.
//  [X(final) - X(initial)] / X(initial) * 100.
deltaChange = (init,final) => {
  output = math.evaluate(`( ${final} - ${init}) / ${init} *100`);
  return output;
};


//calculate the mean of an array
setMean = (array) => {
  output = math.mean(array);
  return output;
};




// // create and call function
// (myfunction = () => {
//   console.log('hi');
// })();
