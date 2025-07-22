import { Suspense } from "react";
import LoginPage from "./components/login-page";
import Loading from "@/shared/components/commons/loading/loading";


const Page = () => {
  return(
    <Suspense fallback={<Loading />}>
      <LoginPage />
    </Suspense>
  );
};

export default Page;