function HomePage() {
  return (
    <div className="flex flex-col items-center py-5 h-screen">
      <div className="flex flex-col items-center max-w-xl">
        <img src="logo.png" alt="Logo"/>
        <h1 className="text-5xl font-bold my-4">Welcome to Sunib HALL</h1>
        <p className="text-lg text-center mt-2">Your all-in-one platform for organizing teammates and managing competition teams</p>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 mt-10">
            <div>deez</div>
            <div>deez</div>
            <div>deez</div>
            <div>deez</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
