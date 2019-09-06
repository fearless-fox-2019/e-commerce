export function convertIdr(price){
    let str = String(price)
    let convert = []
    let dlm = ''
    for (let i = str.length - 1; i >= 0; i--) {
      dlm = str[i] + dlm
    
      if (dlm.length == 3 || i == 0) {
        console.log('masuk')
        convert.push(dlm)
        dlm = ''
      }
    }
    return `Rp ${convert.reverse().join('.')},-`
}