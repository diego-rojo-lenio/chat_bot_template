import {BaileysProvider as Provider} from "@builderbot/provider-baileys"
import {createProvider} from "@builderbot/bot"
import {config } from "../config"

//Meta business suite
// export const provider = createProvider(Provider, {
//     jwToken: config.jwt.secret,
//     numberId: config.jwt.numberId,
//     verifyToken: config.jwt.verifyToken,
//     version: config.version
// })


//BaileysProvider
export const provider = createProvider(Provider, { usePairingCode: true, phoneNumber: config.phoneNumber})