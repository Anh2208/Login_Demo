import CryptoJS from "crypto-js";

export const getUser = () => {
    const encryptedUserData = localStorage.getItem("user");

    if (encryptedUserData && encryptedUserData != 'null') {
        try {
            const decryptedUserData = CryptoJS.AES.decrypt(encryptedUserData, 'srceret').toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedUserData);
        } catch (error) {
            console.error("Error parsing decrypted user data:", error);
            return null;
        }
    }
    return null;
};
