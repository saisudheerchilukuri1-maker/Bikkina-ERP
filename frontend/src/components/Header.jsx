function Header() {

  const today = new Date();

  return (
    <div className="bg-gray-900 p-5 rounded-xl flex justify-between items-center mb-8">

      <div>
        <h1 className="text-2xl font-bold">
          Welcome to Bikkina Trades 
        </h1>

        <p className="text-gray-400">
          Business Management Dashboard 

        </p>
      </div>

      <div className="text-right">
        <p>{today.toLocaleDateString()}</p>
        
      </div>

    </div>
  );
}

export default Header;