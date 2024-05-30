const Register = () => {
    return (
        <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center content-center">
          <form>
            <div>
                <div>
                  <div>
                    <label htmlFor="email" className="font-bold">
                    E-mail
                    </label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="on"
                      className="border-b-2 border-gray-400 focus:border-black focus:outline-none p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="font-bold">
                      Heslo
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="border-b-2 border-gray-400 focus:border-black focus:outline-none p-2"
                    />
                  </div>
                  <div className="flex justify-end">
                    <input
                      type="submit"
                      value="Přihlásit se"
                      className="bg-blue-500 px-2 py-1 rounded-xl mt-5 hover:text-white"
                    />
                  </div>
                </div>
            </div>
          </form>
        </div>
      );
    };
    
    export default Register