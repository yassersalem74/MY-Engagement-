import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch(
        "http://yasser-engagement.runasp.net/api/massage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({ name: "", content: "" }); // Reset form
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center flex-col md:flex-row mt-4 md:mt-48">
        <div className="flex justify-center">
          {/* left image */}
          <div className="w-4/5 flex justify-center max-w-72  md:w-[calc(var(--spacing)*80)] md:h-[calc(var(--spacing)*100) h-[calc(var(--spacing)*85)]">
            <img
              src="our.jpeg"
              alt="our-image"
              className="w-full h-full  rounded-2xl custom-img custom-shadow2 "
            />
          </div>
        </div>

        {/* right form */}
        <div className="flex justify-center">
          <div className="w-full m-4 md:w-[545px] bg-white  rounded-2xl md:custom-shadow pt-4 pb-6 img-back">
            <p className="text-center text-6xl mb-2 md:mb-6 font-medium italian primary-color-font">
              Yasser & Merna
            </p>
            <form onSubmit={handleSubmit} className="mx-10 md:mx-28">
              <div className="flex justify-center items-center">
                <p className="text-center text-4xl mb-2 font-medium italian primary-color-font">
                  Forever starts with you{" "}
                </p>
                <p className="heart">
                  <img src="/public/heart.png" alt="" />
                </p>
              </div>
              <p className="text-center text-5xl mb-2 font-medium italian primary-color-font">
                26/7/2025
              </p>

              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full p-2 border-2 rounded text-center placeholder-[#a3a283] border-[#a3a283]"
                  style={{ borderColor: "#a3a283" }}
                />
              </div>

              <div className="mb-4">
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Leave us a little note to remember"
                  className="w-full p-2 border-2 rounded  text-center placeholder-[#a3a283] border-[#a3a283]"
                  style={{ borderColor: "#a3a283" }}
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white py-2 px-4 rounded primary-color-border cursor-pointer  w-full primary-color-back custom-button"
                >
                  {isLoading ? "Sending..." : " Congratulations"}
                </button>
              </div>

              {submissionStatus === "success" && (
                <p className="mt-2 text-green-600 text-center">
                  Message sent successfully!
                </p>
              )}
              {submissionStatus === "error" && (
                <p className="mt-2 text-red-600 text-center">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
