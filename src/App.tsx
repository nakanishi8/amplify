import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import Amplify, { API, Auth} from "aws-amplify";
import awsExports from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, withAuthenticator } from '@aws-amplify/ui-react';
// import { withAuthenticator } from '@aws-amplify/ui-react'
Amplify.configure(awsExports);

// Auth.configure({
//   // other configurations
//   // ...
//   authenticationFlowType: 'ADMIN_USER_PASSWORD_AUTH'
// });

const signUpConfig = {
  hiddenDefaults: ['username'],
  signUpFields: [
    {
      label: 'Email',
      key: 'email', // !!!
      required: true,
      displayOrder: 1,
      type: 'email',
      custom: false
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
      custom: false
    },
    // {
    //   label: 'Phone Number',
    //   key: 'phone_number',
    //   required: true,
    //   displayOrder: 3,
    //   type: 'tel',
    //   custom: false
    // }
  ]
};

// Amplify.configure({
//   Auth: {
//     region: 'ap-northeast-1',
//     userPoolId: 'ap-northeast-1_6R1QWY2bc',
//     userPoolWebClientId: '4jmhhv2nt60fai8vuu4m6nluqq',
//   },
//   API: {
//     endpoints: [
//       {
//         name: 'dev',
//         endpoint:
//           'https://4shhsintc8.execute-api.ap-northeast-1.amazonaws.com/dev',
//       },
//     ],
//   },
// });

function App() {

  const handleClick = async function () {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    // const myInit = {
    //   headers: {
    //     Authorization: token,
    //   },
    // };

    const res = await API.get('apib750dada', '/items', {});
    console.log(res);
  };

  return (
    <>
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Custom Email Label",
            placeholder: "Custom email placeholder",
            inputProps: { required: true, autocomplete: "email" },
          },
          {
            type: "password",
            label: "Custom Password Label",
            placeholder: "Custom password placeholder",
            inputProps: { required: true, autocomplete: "new-password" },
          },
        ]}
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>

    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Click me</button>
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
    </>
  );
}

export default App

