import sgMail from "@sendgrid/mail";

export const EmailSend = async (EmailTo, EmailSubject, EmailText)=>{

    sgMail.setApiKey(
        "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"
    );

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