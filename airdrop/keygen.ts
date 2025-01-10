import bs58 from "bs58";
import * as prompt from "prompt-sync";

const promptSync = prompt.default();

function base58ToWallet() {
    const base58Input = promptSync("Enter your base58 private key: ");
    const walletBytes = bs58.decode(base58Input);
    console.log("Wallet Bytes: ", Array.from(walletBytes));
}

function walletToBase58() {
    const bytesInput = promptSync("Enter your wallet: ");
    const wallet = Uint8Array.from(bytesInput.split(',').map(num => parseInt(num.trim())));
    const base58String = bs58.encode(wallet);
    console.log("Base58 encoded: ", base58String);
}

function main(){
    console.log("Choose an option: ");
    console.log("1. Base58 to Wallet");
    console.log("2. Wallet to Base58");
    const choice = promptSync("Enter your choice: ");
    if(choice === "1"){
        base58ToWallet();
    } else if (choice === "2"){
        walletToBase58();
    } else {
        console.log("Invalid choice");
    }
}

main();