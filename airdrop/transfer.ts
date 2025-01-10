import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(Uint8Array.from(wallet));
const to = new PublicKey("H2ZFj5AwnN18iCqMgXsuohgU5GWTmEEJ6ahtE1es5F8C")

const connection = new Connection("https://api.devnet.solana.com");

(async() => {
    try {
        const tx = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: LAMPORTS_PER_SOL/100
            })
        )
        tx.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        tx.feePayer = from.publicKey;

        const signature = await sendAndConfirmTransaction(connection, tx, [from]);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);

    }catch(error){
        console.error(`Oops, something went wrong: ${error}`);
    }
})();

(async() => {
    try {
        const balance = await connection.getBalance(from.publicKey);
        const tx = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance
            })
        )
        tx.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        tx.feePayer = from.publicKey;
        const fee = (await connection.getFeeForMessage(tx.compileMessage(), 'confirmed')).value || 0;
        tx.instructions.pop()
        tx.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee
            })
        )
        const signature = await sendAndConfirmTransaction(connection, tx, [from]);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch(error){
        console.error(`Oops, something went wrong: ${error}`);
    }
})();

