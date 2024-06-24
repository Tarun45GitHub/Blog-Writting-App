import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../config/config.js";

export class DBService{
    client =new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
                   .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
           return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status,userId});
        } catch (error) {
            console.log("Appwrite service::createPost::error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status});
        } catch (error) {
            console.log("Appwrite service::updatePost::error",error);   
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)  ; 
             return true; 
        } catch (error) {
            console.log("Appwrite service::deletePost::error",error);   
        }
    }

    async getPost(slug){
        try {
           return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log("Appwrite service::getPost::error",error);
            return false;   
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId.conf.appwriteCollectionId,queries)
        } catch (error) {
            console.log("Appwrite service::getPosts::error",error);
            return false;   
        }
    }
    //upload file
    async uploadfile(file){
        try {
            await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
            return true;
        } catch (error) {
            console.log("Appwrite service::uploadfile::error",error); 
            return false;
        }
    }
    async deletefile(fileid){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId,fileid);
            return true;
        } catch (error) {
            console.log("Appwrite service::deletefile::error",error); 
            return false; 
        }
    }
    getFilePreview(fileid){
       return  this.bucket.getFilePreview(conf.appwriteBucketId,fileid);
    }
}
const dbservice=new DBService();
export default dbservice;