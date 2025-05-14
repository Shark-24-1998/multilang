import TextEditor from "../components/TextEditor";

export default function CreatePost() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Create Blog Post
      </h1>
      <div className="w-full max-w-3xl">
        <TextEditor />
      </div>
    </div>
  );
}
