module.exports = (arr, id) => {
  let result = {
    dupes : false,
    index: 0
  }
  for(let i = 0 ; i < arr.length; i++ ) {
    if(arr[i].product == id) {
      result.dupes = true
      result.index = i
    }
  }

  return result
}