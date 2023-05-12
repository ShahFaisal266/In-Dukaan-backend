const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
require("dotenv").config();
const Mailgen= require("mailgen")
const sendEmail = async (email, subject, text) => {
    
        
        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            
            auth: {
                user: 'shaah.fesal@gmail.com',
                pass: 'bljndojgiyiyqnvq',
            }
        }));
        let MailGenerator = new Mailgen({
            theme: "Default",
            product : {
                name: "Mailgen",
                link : 'https://mailgen.js/'
            }
        })
    
        let response = {
            body: {
                name : "Welcome Back!",
                intro: "Your Reset Password Token has been arrived!So copy this token and Paste it there",
                table : {
                    data : [
                        {
                            item : "Nodemailer Stack Book",
                            subject:subject,
                            text:`Token ${text}`
                        }
                    ]
                },
                outro: "Looking forward to do more business"
            }
        }
    
        let mail = MailGenerator.generate(response)
    
        
        const message= {
            from:'shaah.fesal@gmail.com',
            to: email,
            subject: subject,
            text: text,
            html:mail
        }
       
    
           /// html:`<p> HII Please Copy the link and <a href="http://:5000/api/reset-password?token=`+token+`"> reset your password </a> `
           transporter.sendMail(message).then(()=>{
            console.log("email sent sucessfully")
           }).catch(error=>{
            console.log(error, "email not sent");
           }) 
        
    };


module.exports = sendEmail;
/*


/** send mail from real gmail account
 
const getbill = (req, res) => {

    const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Daily Tuition",
            intro: "Your bill has arrived!",
            table : {
                data : [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}
*/