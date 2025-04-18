
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="MainContainer">
      <Header />

     
      <section
        className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-cover bg-center bg-[#E6ECF8]"
        style={{
          backgroundImage: `url('./Images/TutoringBackground.jpg')`,
        }}
      >
        <div className="w-full md:w-2/5 bg-white bg-opacity-90 p-8 rounded-md shadow-lg h-[400px] flex flex-col justify-between">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Online tutoring <br /> that releases potential
          </h2>
          <div className="mt-6 flex items-center">
  
        </div>
          <p className="text-gray-600 mt-4 text-base">
            We can't stop you worrying about your child. But our expert tutors
            can help their grades and confidence soar - and help you worry a
            little less.
          </p>
          <div className="mt-6 flex items-center">
            <button
              className="bg-blue-500 text-white px-6 py-2 text-base rounded hover:bg-blue-600 transition-all"
              onClick={() => navigate("/SearchTutor")}
            >
              Find a tutor
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 w-full md:w-3/5">
          <img
            src="/Tutoring.jpg"
            alt="Tutoring example"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Homepage;
