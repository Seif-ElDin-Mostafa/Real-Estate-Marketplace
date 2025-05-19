import bcrypt from "bcrypt";

const saltRounds = 10;
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
}

export default hashPassword;