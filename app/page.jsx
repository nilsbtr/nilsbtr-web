import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Welcome to nilsbtr.com
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">My personal Space</span>
      </h1>
      <p className="desc text-center"></p>
      <Feed />
    </section>
  );
};

export default Home;
