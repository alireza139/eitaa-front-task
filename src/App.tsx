import Header from "./components/Header";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[75vh] max-w-[1300px] mx-2.5 xl:mx-auto">
        <div className="lg:col-span-3">
          <Users />
        </div>

        <div className="lg:col-span-1">
          <Posts />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
