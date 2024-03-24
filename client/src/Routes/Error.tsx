const Error = () => {
  return (
    <section className="py-5">
      <div
        className="d-flex justify-content-center 
                    align-items-center flex-column 
                    text-center w-100"
      >
        <div className="bg_img w-50"></div>
        <div>
          <p className="display-4">404</p>
          <p>Stránka nebyla nalezena</p>
          <a
            href="/"
            className="text-white text-decoration-none px-4 py-3 
                          bg-dark d-inline-block mt-2 rounded"
          >
            Domovská stránka
          </a>
        </div>
      </div>
    </section>
  );
};

export default Error;
