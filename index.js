const bcrypt = require('bcrypt');

// longer way of defining and how to hash passwords
// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(14);
//     console.log(salt);
//     const hash = await bcrypt.hash(pw, salt)
//     console.log(hash);
// }

// shorter way 
const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 14)
    console.log(hash);
    
}

// to compare if password is correct as hash is added
const login = async(pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log('log in successful')
    } else {
        console.log('incorrect password')
    }
}

// hashPassword('monkey');
login('monkEy', '$2b$14$xyXOXBLDlUTVTMsccKzEgOKZb4Ck9yozky/P4VjcaoTp3/YuLn9I.')