import sgMail from "@sendgrid/mail";

export const EmailSend = async (EmailTo, EmailSubject, EmailText)=>{

// api key will be added here

    sgMail.setApiKey(
        "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"
    );

    // this api key will not work, to get new api key we have to go on sendgrid again

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
