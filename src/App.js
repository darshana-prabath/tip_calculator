import "./App.css";
import {useEffect ,  useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState('0');
  const [split, setSplit] = useState(1);
  const [splitTotal, setSplitTotal] = useState(0);

  function handleBillChange(e) {
    setBill(e.target.value);
  }

  function handleTipChange(e) {
    let value = e.target.value.replace("%", "");
    if (value.indexOf("%") === -1) {
      value = value + "%";
    }
    setTip(value);
  }

  function splitMinus() {
    setSplit((oldvalue) => Math.max(oldvalue - 1, 1));
  }

  function splitPlus() {
    setSplit((oldvalue) => oldvalue + 1);
  }

  useEffect(() => {
    calculate()
  }, [bill,tip,split]);

  function calculate(){
    let strTip = tip;
    let intTip = parseInt(strTip.replace("%",""));
    let result = (bill * (1 + intTip/100) / split).toFixed(2);
    //console.log(result);
    setSplitTotal(result);
  }
  return (
    <div>
      <label>Bill Total</label>
      <input
        type="text"
        placeholder={"0.00"}
        value={bill}
        onChange={handleBillChange}
      />
      <label>Tip</label>
      <input
        type="text"
        placeholder={"0.00"}
        value={tip}
        onChange={handleTipChange}
      />
      <div className="summary">
        <div className="split">
          <label>Split</label>
          <div className="split-control">
            <button onClick={splitMinus}>-</button>
            <span>{split}</span>
            <button onClick={splitPlus}>+</button>
          </div>
        </div>
        <div className="result">
          <label>SPLIT TOTAL</label>
          <span>{splitTotal}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
