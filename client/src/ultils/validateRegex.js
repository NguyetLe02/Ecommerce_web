const validateRegex = {
    emailValidate: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
    },
    phoneValidate: {
        value: /^\+?[0-9]\d{1,20}$/,
        message: "Invalid phone number"
    }
}

export default validateRegex