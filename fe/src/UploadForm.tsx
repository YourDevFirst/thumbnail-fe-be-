import React, { useState } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';

const UploadForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<{ score: number, comment: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('thumbnail', image);

      setLoading(true);

      try {
        const response = await axios.post('http://localhost:8000/analyze', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setFeedback(response.data);
      } catch (error) {
        console.error("Error uploading image", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundImage: 'url("/backbound.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full transition duration-500 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">YouTube Thumbnail Analyzer</h2>
        <p className="text-sm text-gray-500 mb-8 text-center leading-6">
          Upload your YouTube thumbnail and get instant feedback on how to improve its design!
        </p>

        <div className="relative mb-6">
          <label className="w-full h-64 flex flex-col items-center justify-center border-4 border-dashed border-blue-400 hover:bg-blue-50 hover:border-blue-500 cursor-pointer transition duration-300">
            <div className="flex flex-col items-center justify-center">
              <FaCloudUploadAlt className="text-blue-400 text-4xl mb-4" />
              <p className="text-gray-500 text-sm">
                {image ? `File: ${image.name}` : "Click to upload"}
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </label>
        </div>

        <button
          onClick={handleImageUpload}
          disabled={loading || !image}
          className={`w-full p-4 rounded-lg text-white font-semibold tracking-wide ${loading || !image ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-300 transform hover:scale-105'}`}
        >
          {loading ? "Analyzing..." : "Analyze Thumbnail"}
        </button>

        {feedback && (
          <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md transition-all duration-500">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Analysis Result</h3>
            <p className="text-gray-600 text-lg mt-2">
              <strong>Score:</strong> {feedback.score}/10
            </p>
            <p className="text-gray-600 text-lg mt-2">
              <strong>Feedback:</strong> {feedback.comment}
            </p>
          </div>
        )}

        {!feedback && !loading && (
          <p className="text-center text-gray-400 mt-6">Upload a thumbnail to receive feedback.</p>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
