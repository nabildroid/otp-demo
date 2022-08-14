import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";

interface Props {
  user: User;
}

const Dashboard = ({ user }: Props) => {
  const logout = () => {
    signOut(auth);
  };
  
  return (
    <div>
      <h3>Welcome {user.phoneNumber}</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
