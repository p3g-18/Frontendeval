import React, { useState, useRef } from "react";

function ToastContainer() {
  const [toast, setToast] = useState([]);
  const timerRef = useRef({});
  console.log("Timeout", timerRef);

  const handleButton = (message, type) => {
    console.log("btn clicked", message);
    const id = new Date().getTime();
    const newToasts = [...toast, { id, message, type }];
    setToast(newToasts);

    timerRef.current[id] = setTimeout(() => {
      handleClose(id);
    }, 5000);
  };

  const handleClose = (id) => {
    clearTimeout(timerRef.current[id]);
    delete timerRef.current[id];

    setToast((previousToast) => {
      const filteredToast = previousToast.filter((toast) => {
        return toast.id !== id;
      });
      return filteredToast;
    });
  };

  const toastColors = {
    success: "bg-green-500",
    info: "bg-orange-500",
    CSP: "bg-purple-400",
    Error: "bg-red-600",
  };

  return (
    <div className="container absolute ">
      <div className="fixed right-4 top-4">
        {toast.map(({ id, message, type }) => {
          return (
            <div
              key={id}
              className={`Toast-Container w-auto m-2  p-2 rounded-2xl animate-slide-in-left cursor-pointer flex justify-between items-center 
                ${toastColors[type]}`}
            >
              {message}
              <span
                className="pl-10  pr-4 text-2xl cursor-pointer"
                onClick={() => handleClose(id)}
              >
                X
              </span>{" "}
            </div>
          );
        })}
      </div>

      <div className="Btn-Container m-2">
        <button
          className="bg-blue-500 m-2 p-2 w-52 rounded-full text-white hover:bg-blue-700 transition-all"
          onClick={() => handleButton("Success", "success")}
        >
          Show Toast
        </button>
        <button
          className="bg-blue-500 m-2 p-2 w-52 rounded-full text-white hover:bg-blue-700 transition-all"
          onClick={() => handleButton("Info!!!!", "info")}
        >
          Info
        </button>
        <button
          className="bg-blue-500 m-2 p-2 w-52 rounded-full text-white hover:bg-blue-700 transition-all"
          onClick={() => handleButton("market crash hogaya!!!", "CSP")}
        >
          Check Stock Price
        </button>
        <button
          className="bg-blue-500 m-2 p-2 w-52 rounded-full text-white hover:bg-blue-700 transition-all"
          onClick={() => handleButton("ERROR 404🤖", "Error")}
        >
          Error
        </button>
      </div>
    </div>
  );
}

export default ToastContainer;
