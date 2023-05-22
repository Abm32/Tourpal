import { Appwrite } from "appwrite";

var appwrite = new Appwrite();

appwrite
    .setEndpoint('https://cloud.appwrite.io/v1') // Set your endpoint
    .setProject('6468d06d84e5d84e9668') // Your Appwrite Project UID
    ;



export const api = {


    loginWithGoogle: async () => {
        try {
            await appwrite.account.createOAuth2Session('google', 'http://localhost:3000/dashboard/', 'http://localhost:3000/');

        } catch (error) {
            throw error;
        }
    },

    getCurrentUser: async () => {
        let promise = appwrite.account.get();

        return promise.then(function (response) {
            return response.$id
        }, function (error) {
            console.log(error); // Failure
        });
    },

    postData: async (date, location, content, userId) => {
        let promise = appwrite.database.createDocument('CollectionId', { "date": date, "location": location, "experience": content }, [`user:${userId}`], [`user:${userId}`]);

        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });
    },

    getData: async () => {
        let promise = appwrite.database.listDocuments('CollectionId');
        return promise.then(function (response) {
            //response.documents is a array
            return response.documents
        }, function (error) {
            console.log(error); // Failure
        });

    },


    userLogout: async () => {
        let promise = appwrite.account.deleteSession('current');

        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });

    },
}
