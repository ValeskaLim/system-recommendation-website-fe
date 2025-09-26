import axios from "axios";
import GreenButton from "../../components/GreenButton";
import CommonConstant from "../../constant/CommonConstant";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const { successToast, errorToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(CommonConstant.ResetPassword, {
      email: email,
    });
    if (response.data.success) {
      successToast(response.data.message);
      setEmail("");
      setIsSubmit(true);
    } else {
      errorToast(response.data.message);
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen flex justify-center items-center flex-col">
        <div className="bg-neutral-100 shadow-lg p-10 rounded-3xl w-200">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-lg mt-13">
            Please enter your email address to receive a password reset link.
          </p>
          {isSubmit && (
            <p className="bg-green-100 p-2 text-green-700 font-semibold mt-3 rounded-lg text-wrap w-fit">
              A password reset link has been sent to your email. <br/>Please check
              your inbox and follow the instructions to reset your password.
            </p>
          )}
          <form onSubmit={handleSubmit} method="POST">
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-5 py-2 px-3 w-full rounded-xl border border-neutral-200 bg-white focus:outline-blue-400 text-xl"
            />
            <GreenButton label="Submit" extendedClassName="mt-5" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
