import sgMail from "@sendgrid/mail";

export const EmailSend = async (EmailTo, EmailSubject, EmailText)=>{

<<<<<<< HEAD
    // we have to use sg api key here
=======
    // api key will be added here
>>>>>>> ec1ff71d977a4c495862dee20ff7f9e614e63e1a

    const msg = {
        to: EmailTo,
        from: "jahirulislamjantu@gmail.com", // Use a verified sender address
        subject: EmailSubject,
        text: EmailText,
    };

    sgMail
        .send(msg)
        .then(() => console.log("Email sent"))
        .catch((error) => console.error("Error sending email:", error.message));

}
