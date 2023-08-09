import { KitsasConnection } from '../services/kitsasconnection'
import { KitsasService } from '../services/kitsasservice'
import { KitsasConnectionOptions } from '../types/kitsasconnectionoptions'
import { MockKitsasConnection } from './MockKitsasConnection'
import * as Exceptions from '../types/kitsasexeptions';


export class MockKitsasService extends KitsasService {
   static async connect(options: KitsasConnectionOptions): Promise<KitsasConnection> {
      if( options.username === "test@kitsas.fi" && options.password === "Test+12345") {
         return new MockKitsasConnection("test","agent",{
            access_token : "",
            name : "Test User"
         })
      } else if( options.username === "need2fa@kitsas.fi" && options.password === "Test+12345") {
         if( options.code === "1234") {
            return new MockKitsasConnection("test", "agent", {
               access_token : "",
               name: "Double Dolphin"
            })
         } else {
            throw new Exceptions.TFARequiredError()
         }
      } else {
         throw new Exceptions.InvalidCreditentialsError()
      } 
   } 
}