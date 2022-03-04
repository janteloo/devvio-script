const crypto = require('crypto');
const fs = require('fs');

const userGenerator = () => {

    if(process.argv.length < 5) {
        console.log("Too few arguments")
        process.exit(0)
    } 

    const fromText = process.argv.find((item) => item.includes("from=")) 
    const toText = process.argv.find((item) => item.includes("to=")) 
    const batchText = process.argv.find((item) => item.includes("batch=")) 

    if(!fromText) {
      console.log("From parameter missing example: from=1")
      process.exit(0)
    }

    if(!toText) {
        console.log("To parameter missing example: to=100")
        process.exit(0)
    }

    if(!batchText) {
      console.log("Batch parameter missing example: batch=1")
      process.exit(0)
    }

    const from = fromText.split('=')[1]
    const to = toText.split('=')[1]
    const batch = batchText.split('=')[1]

    const password = "StressTest0!?"
    const baseUsername = "stresstest_#_batch_@"
    const baseFullName = "Stress Test"
    /// const passwordHash = ;

    try {
        fs.unlinkSync('output.csv');
    } catch(error) {
        console.log("No previous output.csv was found")
    }

    fs.appendFileSync('output.csv', 'username,password,password_hash\n');

    for(let i = from; i <= to; i++) {
       const username = baseUsername.replace("#", i).replace("@", batch)
       const passwordHash = crypto.createHash('sha256').update(password + username.toLowerCase()).digest('hex');
       fs.appendFileSync('output.csv', `${username},${password},${passwordHash}\n`);
    }   

    console.log("output.csv was succesfully generated!")
}


userGenerator()