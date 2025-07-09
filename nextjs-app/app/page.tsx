'use client';
import {DotGothic16} from "next/font/google";
import React from "react";
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEjNiWKE0MmRU1eVhL3Gsfb2z_rePkukc",
    authDomain: "p-sleepdex-shiny.firebaseapp.com",
    projectId: "p-sleepdex-shiny",
    storageBucket: "p-sleepdex-shiny.firebasestorage.app",
    messagingSenderId: "192986624770",
    appId: "1:192986624770:web:aaeb138066a1b70c69081b",
    measurementId: "G-N0XJYZMRXV"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const uploadImage = async (file: File) => {
    const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const docRef = await addDoc(collection(db, 'images'), {
        url: downloadURL,
        uploadedAt: Timestamp.now()
    });
    return { url: downloadURL, docId: docRef.id };
};



const ImageUploader = () => {
    const [file, setFile] = React.useState<File | null>(null);
    const [uploading, setUploading] = React.useState(false);
    const [uploadedURL, setUploadedURL] = React.useState<string | null>(null);


    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        try {
            const result = await uploadImage(file);
            setUploadedURL(result.url);
            alert('Upload successful!');
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-4 border rounded-md shadow-md">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadedURL && (
                <div className="mt-4">
                    <p>Uploaded Image:</p>
                    <img src={uploadedURL} alt="Uploaded" className="w-48 mt-2" />
                </div>
            )}
        </div>
    );
};






const DotGothic16Font = DotGothic16({
    weight: "400",
    subsets: ["latin"],
});

export default function Home() {
    return (
        <div className="main">
            <header>
                <div className="head_ball"></div>
                <h1 className={DotGothic16Font.className}> ポケスリいろちがいずかん </h1>
            </header>
            <div className="pdex">
                <div className="pdex_container">
                    <ImageUploader />
                </div>
            </div>
            <footer></footer>
        </div>
    );
}
