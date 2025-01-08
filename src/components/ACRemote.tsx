import { useEffect, useState } from "react";

function ACRemote() {
  const [degree, setDegree] = useState<number>(32);
  const [message, setMessage] = useState<string>("Sekarang suhu normal");
  function increaseTemperature() {
    setDegree(degree + 1);
  }

  function decreaseTemperature() {
    setDegree(degree - 1);
  }

  useEffect(() => {
    if (degree > 35) {
      setMessage("Panas Banget");
    } else if (degree < 25) {
      setMessage("Dingin Sekali");
    } else {
      setMessage("Suhu Normal");
    }
  }, [degree]);

  return (
    <div className="my-10 mx-5">
      <p>Suhu saat ini : {degree} C</p>
      <p>{message}</p>
      <button className="btn bg-red-200" onClick={increaseTemperature}>
        +
      </button>
      <br />
      <br />
      <button className="btn btn-outline-primary" onClick={decreaseTemperature}>
        -
      </button>
    </div>
  );
}

export default ACRemote;
