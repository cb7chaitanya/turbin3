use solana_idlgen::idlgen;

idlgen!({
    "version": "0.1.0",
    "name": "turbine_prereq",
    "instructions": [
        {
            "name": "complete",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true,
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "prereq",
                    "isMut": true,
                    "isSigner": false,
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [112, 114, 101, 114, 101, 113]
                            },
                            {
                                "kind": "account",
                                "path": "signer"
                            }
                        ]
                    }
                },
                {
                    "name": "system_program",
                    "isMut": false,
                    "isSigner": false,
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "github",
                    "type": "bytes"
                }
            ]
        },
        {
            "name": "update",
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true,
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "prereq",
                    "isMut": true,
                    "isSigner": false,
                    "writable": true
                },
                {
                    "name": "system_program",
                    "isMut": false,
                    "isSigner": false,
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "github",
                    "type": "bytes"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "SolanaCohort5Account",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "github",
                        "type": "bytes"
                    },
                    {
                        "name": "key",
                        "type": "publicKey"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InvalidGithubAccount",
            "msg": "Invalid Github account"
        }
    ],
    "metadata": {
        "address": "ADcaide4vBtKuyZQqdU689YqEGZMCmS4tL35bdTv9wJa"
    }
});