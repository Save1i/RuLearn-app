import LogInLogOut from "../components/LogInLogOut";
import NavBarBottom from "../components/NavBarBottom";

const ProfileUser = () => {
  return (
    <div>
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogInLogOut />
        </div>
      <NavBarBottom />
    </div>
  );
};

export default ProfileUser;
