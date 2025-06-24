import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-5 ">
          <img
            src="/images\privecy.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-1"></div>
        <div className="col-md-4">

          <center> <h1 className="privecy" > Our  Privacy Policy</h1>  </center>

          <br />
          <p>
          
            Your privacy is important to us.
            This policy explains what personal data we collect, how we use it, and your rights regarding that data.

            <br />
            <br />
          
            Name, email address, and other contact details (when you sign up or contact us)

            Usage data (e.g., page visits, time on site)

            How We Use Information

            To provide and improve our services

            To communicate with you (e.g., newsletters, updates)

            For analytics and performance monitoring

            Your Rights

            You can request to access, correct, or delete your data at any time.

            Contact Us
            If you have any questions about this Privacy Policy, email us at [your email address].


          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
