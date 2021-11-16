import React, { useState, useContext, useEffect } from "react";
import { LandingDiv, BuyBtn, CommonText } from "../components/withdraw/backDiv";
import { ToastContainer, toast } from "react-toastify";
import { travelABI } from "../contract/abi";
import getWeb3 from "../getWeb3";
import Web3 from "../context/web3";
const Withdraw = () => {
  const [balance, setBalance] = useState(0);
  const { web3, setWeb3 } = useContext(Web3);
  useEffect(() => {
    // get web3
    async function initWeb3() {
      const web3 = await getWeb3();
      setWeb3(web3);
    }
    initWeb3();
  }, []);
  // useEffect(() => {
  //   setInterval(() => {
  //     getBalance();
  //   }, 1000);
  // });
  const onWithdraw = async () => {
    if (web3) {
      const contract = new web3.eth.Contract(
        travelABI,
        "0x95dCc60cDf89F47f36e44277Ef0f807372b55f0c"
      );
      const data = await contract.methods.withdraw().call();
    }
  };
  const getBalance = async () => {
    if (web3) {
      const contract = new web3.eth.Contract(
        travelABI,
        "0x95dCc60cDf89F47f36e44277Ef0f807372b55f0c"
      );
      const data = await contract.methods
        .getCurrentBNBAmount()
        .call()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message.response);
        });
      console.log(data);
    }
  };
  return (
    <LandingDiv>
      <CommonText>Balance</CommonText>
      <CommonText>{balance} BNB</CommonText>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BuyBtn
          onClick={() => {
            onWithdraw();
          }}
        >
          Withdraw
        </BuyBtn>
      </div>
      <ToastContainer />
    </LandingDiv>
  );
};
export default Withdraw;
