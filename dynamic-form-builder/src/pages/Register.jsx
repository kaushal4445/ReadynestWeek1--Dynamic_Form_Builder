function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-800 p-8 rounded-xl w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        <button className="w-full bg-cyan-500 p-3 rounded font-bold">
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;