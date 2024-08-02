"use client";
 
import SimpleSlider from "../components/MovieSlider";
import { UploadButton } from "../utils/uploadthing";
import Dashboard from "./_AdminComponents/Dashboard";
 
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">


        <div>
          <Dashboard />
          <SimpleSlider />
        </div>


      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}