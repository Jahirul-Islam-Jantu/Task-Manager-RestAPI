import sgMail from "@sendgrid/mail";

export const EmailSend = ()=>{

    sgMail.setApiKey(
        "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"
    );

    const msg = {
        to: "jahirulislamjantu@gmail.com",
        from: "jahirulislamjantu@gmail.com", // Use a verified sender address
        subject: "Test Email Subject",
        text: "This email system is for API purpose. in this server i have used this from sendgrid mail.",
    };

    sgMail
        .send(msg)
        .then(() => console.log("Email sent"))
        .catch((error) => console.error("Error sending email:", error.message));

}