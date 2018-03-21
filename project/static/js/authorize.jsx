import React from 'react';
import './css/authorize.css';

function render() {
     return <div className="login-wrap">
	<div className="login-html">
		<input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked></input><label htmlFor="tab-1" className="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" className="sign-up"></input><label htmlFor="tab-2" className="tab">Sign Up</label>
		<div className="login-form">
			<div className="sign-in-htm">
				<div className="group">
					<label htmlFor="username" className="label">Username</label>
					<input id="user" name="username" type="text" className="input" autoComplete ="off"></input>
				</div>
				<div className="group">
					<label htmlFor="pass" className="label">Password</label>
					<input id="pass" name = "pass" type="password" className="input" data-type="password" autoComplete ="off"></input>
				</div>
				<div className="group">
					<input id="check" name="check" type="checkbox" className="check" value = "true" defaultChecked ></input>
					<label htmlFor="check"><i id = "icon" className="icon"></i> Keep me Signed in</label>
				</div>
				<script >
				function route(){global.d = 1}</script>
				<div className="group">
					<input name = "signInButton" type="submit" className="button" value="Sign In"  onclick="route()" ></input>
				</div>
				<div className="hr"></div>
				<div className="foot-lnk">
					<a href="#forgot">Forgot Password?</a>
				</div>
			</div>
			<div className="sign-up-htm">
				<div className="group">
					<label htmlFor="usernameReg" className="label">Username</label>
					<input id="userx"  name="usernameReg" type="text" className="input" autoComplete ="off"></input>
				</div>
				<div className="group">
					<label htmlFor="pass" className="label">Password</label>
					<input id="passx"  name="password" type="password" className="input" data-type="password" autoComplete ="off"></input>
				</div>
				<div className="group">
					<label htmlFor="pass" className="label">Repeat Password</label>
					<input id="passrep"  name="confirm_password" type="password" className="input" data-type="password" autoComplete ="off"></input>
				</div>
				<div className="group">
					<label htmlFor="pass" className="label">Email Address</label>
					<input id="email" name="email" type="text" className="input" autoComplete ="on"></input>
				</div>
				<div className="group">
					<input name = "signUpButton" type="submit" className="button" value="Sign Up"></input>
				</div>
				<div className="hr"></div>

				<div className="foot-lnk">
					<label htmlFor="tab-1"> Already Member?</label>
				</div>
				<div className="group">

					<div className="groupx">
					  <div className="select">
					    <select name="gender" id="slct">
					      <option value = 'null'>Gender</option>
					      <option value = 'true'>Male</option>
					      <option value = 'false'>Female</option>
					      <option value = 'null'>Not sure</option>
					    </select>
					  </div>
					</div>

					<div className="groupxx">
					  <div className="select">
					    <select name="age" id="slctx">
					      <option value='0'>Age</option>
					      <option value='1'> &gt; 15 </option>
					      <option value='2'> 15&gt; 35 </option>
					      <option value='3'> &lt; 35 </option>
					    </select>
					  </div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>;

}

export default function(props) {
    return render.apply({props: props});
}