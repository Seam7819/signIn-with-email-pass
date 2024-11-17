import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../Firebase/Firebase.init";
import { useState } from "react";

const LogIn = () => {

    const [registerError ,setError] = useState('')
    // const [passError, setPassError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const auth = getAuth(app)
    

    const handleSubmit = e => {
        e.preventDefault()
        console.log("Form Submitted");
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email,password,terms);
        setError('')
        setSuccess('')
        if(password.length < 6){
            setError('Password should be 6 character or longer')
            return;
        }
        if(!terms){
            setError('Please click terms and conditions')
            return;
        }

        // setError('')
        // setPassError('')
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            const user = result.user
            console.log(user);
            setSuccess('user created successfully')
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message)
        })
    }


    return (
        <div >
            <div>
            <h1 className="text-2xl mb-3">Register</h1>
            <form onSubmit={handleSubmit}>
            <input className="mb-2 p-2 rounded-lg" type="email" name="email" required id="" />
            <br />
            <input className="mb-2 p-2 rounded-lg" type={showPassword ? 'text' : 'password'} name="password" required id="" /><span  onClick={()=> setShowPassword(!showPassword)} className="cursor-pointer absolute -ml-12 mt-2">Show</span>
            <br />
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">accept our terms and <a href="">conditions</a></label>
            <br />
            <input className="btn" type="submit" value="LogIn" />
            </form>
            {
              registerError &&  <p className="text-red-600 mt-4">{registerError }</p>
            }
            {
                success && <p className="text-green-500">{success}</p>
            }
            </div>
            
        </div>
    );
};

export default LogIn;