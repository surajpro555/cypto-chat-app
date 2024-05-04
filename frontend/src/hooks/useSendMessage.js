import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import {RandomEncrypt,RandomDecrypt} from '../algo/RandomAlgoFinder' 

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      
      const algoList=['RSA','DES','AES','TDES']; 
      const algofind=algoList[Math.floor(4.0*Math.random())]

      let start = performance.now();
      const encryptedMessage = RandomEncrypt(message,algofind);
      console.log(
        "Total time taken : " + (performance.now() - start) + " milliseconds"
      );

      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: encryptedMessage ,algo:algofind}),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);
     
      data.message = RandomDecrypt(data.message,data.algo);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
