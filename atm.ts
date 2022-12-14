import inquirer from "inquirer"
async function askQuestion(){
    const questions = await inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: "string",
            name: "user",
            message: "Enter your User ID!",
        },
        {
            type: "string",
            name: "password",
            message: "Enter your password!",
            when (answers){
                return answers.user;
            }
        },
        {
            type: "list",
            name: "acctype",
            message: "Which type of account do you have?",
            choices: ['Current Account','Saving Account'],
            when (answers){
                return answers.password;
            }
        },
        {
            type: "list",
            name: "options",
            message: "What do you want to do?",
            choices: ['Cash Withdrawl','Balance Inquiry','Fast Cash'],
            when (answers){
                return answers.acctype;
            }
        },
        {
            type: "list",
            name: "fastcash",
            message: "Select Cash Amount?",
            choices: ['500','1,000','3,000','5,000','10,000','20,000'],
            when (answers){
                return answers.options == "Fast Cash";
            }
        },
        {
            type: "number",
            name: "cashwithdrawl",
            message: "Please Enter the amount you want to waithdraw?",
            when (answers){
                return answers.options == "Cash Withdrawl";
            }
        }
        ])
    .then((answers) => {
    var precision = 100; // 2 decimals
    var randomnum = Math.floor(Math.random() * (100000 * precision - 1 * precision) + 1 * precision) / (1*precision);
    if (answers.user && answers.password && answers.fastcash){
        if (randomnum>answers.fastcash){
            console.log(`Transection of ${answers.fastcash} is successful!\nPlease collect the cash`);
            console.log(`You Balance amount is ${randomnum - answers.fastcash}`);
        }else{
            console.log("Insuficient funds!")
        }
    }
    else if (answers.user && answers.password && answers.cashwithdrawl){
        if (randomnum>answers.fastcash){
            console.log(`Transection of ${answers.cashwithdrawl} is successful!\nPlease collect the cash`);
            console.log(`You Balance amount is ${randomnum - answers.cashwithdrawl}`);
        }else{
            console.log("Insuficient funds!")
        }
    }
    else if (answers.user && answers.password && answers.options == "Balance Inquiry"){
        console.log(`You Balance amount is ${randomnum}`);
    }
    })
}

async function startagain(){
    let again: any;
    do{
        await askQuestion();
        again = await inquirer
        .prompt({
        type: "input",
        name: "restart",
        message: "Do you want to continue calculating?",
        default: "(Y or N)"
    })
    }while(again.restart == 'y' || again.restart == 'Y');
}
startagain();