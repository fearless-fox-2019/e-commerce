module.exports={
    generateCode() {
        let code=''
        let letters = 'abcdefghijklmnopqrstuvwxyz'
        
        for(let i=0; i<5; i++){
            if(i%2 == 0){
                code += letters[Math.floor(Math.random()*letters.length)]
            }else{
                code+= String(Math.floor(Math.random() * 100))
            }
        }
        return code
    }
}