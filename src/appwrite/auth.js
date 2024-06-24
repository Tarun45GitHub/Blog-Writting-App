import { Client, Account, ID } from "appwrite";
import conf from "../config/config.js";

export class AuthService{
    client= new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
                   .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
          const userAccount=await this.account.create(ID.unique(),email,password,name); 
          if(userAccount) return userAccount;
          else console.log("Error on creating account");
        } catch (error) {
            console.log("Appwrite service::createAccount::error",error);
        }
    }
    async login({email,password}){
        try {
           const userLogin= await this.account.createEmailSession(email,password);
           if(userLogin) return userLogin;
           else console.log("Error while login");
        } catch (error) {
            console.log("Appwrite service::login::error",error);
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get(); 
        } catch (error) {
            console.log("Appwrite service::getCurrebtUser::error",error);
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.log("Appwrite service::logout::error",error);
        }
    }
}
const authservice=new AuthService();
export default authservice;
