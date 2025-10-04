import WelcomeMessage from "../../components/WelcomeMessage";
import { useAuth } from "../../hooks/AuthProvider";

const HomePage = () => {
  const { users } = useAuth();

  return (
    <div className="main-container">
      <div className="main-col-container">
        <img src="logo.png" alt="Logo" className="w-[200px] h-[200px]"/>
        <h1 className="text-5xl font-bold my-4">Welcome to Sunib HALL</h1>
        <WelcomeMessage user={users?.fullname} />
        <p className="text-lg text-center mt-2">
          Your all-in-one platform for organizing teammates and managing
          competition teams
        </p>
      </div>
    </div>
  );
};

export default HomePage;
