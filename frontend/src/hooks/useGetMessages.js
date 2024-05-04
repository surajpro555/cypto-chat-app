import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { RandomEncrypt, RandomDecrypt } from "../algo/RandomAlgoFinder"; 

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const newobj = [];
        let time = 0.0;

        for (let msg of data) {
          const temp = msg;
          let start = performance.now();
          temp.message =RandomDecrypt(temp.message,temp.algo);
          time =
            time < Number(performance.now()) - Number(start)
              ? Number(performance.now()) - Number(start)
              : time;
          newobj.push(temp);
        }

        console.log("Total time taken : " + Number(time) + " milliseconds");

        setMessages(newobj);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
