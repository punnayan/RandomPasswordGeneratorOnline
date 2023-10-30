import { useState, useCallback,useEffect,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()<>{}|[]";
    for (let i = 1; i <= length; i++) {
      let pos = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(pos);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);
  const copypassword = useCallback(()=>{
    passwordref.current?.select()
   window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{passwordGenerator()},[length, numAllow, charAllow, setPassword,passwordGenerator])

 // const tochange = document.getElementById("copybutton");
 // tochange.addEventListener("mouseover",(e)=>{
 //   e.target.style.color = "blue"
 // })
  const passwordref = useRef(null)
  return (
    <>
      <h1 className="text-black text-center text-6xl te">Pasword Generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-60 text-black bg-orange-400">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button onClick={copypassword}  
          className="outline-none bg-sky-400 text-zinc-100 px-3 py-0.5 shrink-0 ">
            COPY
          </button>
        </div>
      </div>
      <div className="fixed flex flex-wrap justify-center inset-x-36 px-2 bottom-56">
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <label className="text-xl">Password length : {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>
          <div className="flex text-sm gap-x-2">
            {" "}
            <label htmlFor="numberInput" className="text-xl">
              Numbers
            </label>
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id="numberInput"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
          </div>
          <div className="flex text-sm gap-x-2">
            {" "}
            <label htmlFor="charInput" className="text-xl">
              Characters
            </label>
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
