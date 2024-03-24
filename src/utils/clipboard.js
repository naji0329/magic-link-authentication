import { toast } from "react-toastify";

const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    // textArea.focus();
    textArea.select();
    try {
        document.execCommand("copy");
        toast.info("your address is copied", {
            theme: "dark",
            autoClose: 500,
        });
    } catch (err) {
        console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
};
export default unsecuredCopyToClipboard;
