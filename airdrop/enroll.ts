import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json";

const keypair = Keypair.fromSecretKey(Uint8Array.from(wallet));

const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("cb7chaitanya", "utf8");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

const program: Program<Turbin3Prereq> = new Program(IDL, provider);

const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];

const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

(async () => {
  try {
    const txHash = await program.methods.complete(github).accounts({
        signer: keypair.publicKey,
    }).signers([keypair]).rpc();
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
  } catch (error) {
    console.error(`Oops, something went wrong: ${error}`);
  }
})();
