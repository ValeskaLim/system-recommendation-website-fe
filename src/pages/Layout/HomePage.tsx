import SectionCard from "../../components/SectionCard";
import WelcomeMessage from "../../components/WelcomeMessage";
import { useAuth } from "../../hooks/AuthProvider";
import { ROUTE_PATHS } from "../../router/routePaths";

const HomePage = () => {
  const { users } = useAuth();

  return (
    <div className="main-container mx-40">
      <div className="main-col-container items-center">
        <img src="logo.png" alt="Logo" className="w-[200px] h-[200px]" />
        <h1 className="text-5xl font-bold my-8">Welcome to Sunib HALL</h1>
        <WelcomeMessage user={users?.fullname} />
        <p className="text-3xl text-center mt-15 italic">
          "Your all-in-one platform to find and join competitions with ease!"
        </p>
        <div className="w-full flex flex-col gap-10 mt-40">
          <div className="w-full flex justify-start">
            <SectionCard
              title="Find & Join Competition Now"
              link={ROUTE_PATHS.COMPETITION}
              description="Find and join competitions that suit you best."
              imageSrc="undoukai_trophy.png"
              customColor="red"
              customSizeImage="w-[250px] h-[200px]"
            />
          </div>
          <div className="w-full flex justify-end">
            <SectionCard
              title="Find Team Members"
              link={ROUTE_PATHS.FIND}
              description="Find member criteria that suit you best and invite them to join your team."
              imageSrc="friends_man.png"
              extendedClassName="justify-items-end"
              imageAlign="right"
              customSizeImage="w-[300px] h-[200px]"
              customColor="orange"
            />
          </div>
          <div className="w-full flex justify-start">
            <SectionCard
              title="Teammates List"
              link={ROUTE_PATHS.TEAMMATES_LIST}
              description="View your team and teammates details."
              imageSrc="online_kaigi_man.png"
              customSizeImage="w-[300px] h-[300]"
              customColor="green"
            />
          </div>
          <div className="w-full flex justify-end">
            <SectionCard
              title="Your Profile"
              link={ROUTE_PATHS.PROFILE}
              description="View and edit your profile information."
              imageSrc="mirror_woman_smile.png"
              extendedClassName="justify-items-end"
              imageAlign="right"
              customSizeImage="w-[250px] h-[250px]"
              customColor="pink"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
